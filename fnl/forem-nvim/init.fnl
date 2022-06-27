(local api (require :forem-nvim.api))
(local buffer (require :forem-nvim.buffer))
(local notify (require :forem-nvim.notify))
(local picker (require :forem-nvim.picker))
(local util (require :forem-nvim.util))

(local M {})

;; Utils

(λ handle-api-error [response on-success]
  (let [start-status (-> response.status (tostring) (string.sub 1 2))]
    (if (not= start-status :20)
        (notify.error (.. "An error occurred: " response.body.error))
        (on-success response))))

(λ my-articles [api-key]
  (fn []
    (let [response (api.my-articles api-key)]
      (handle-api-error response
                        (fn [res]
                          (picker.my-articles res.body))))))

(λ save-article [api-key]
  (let [(content bufnr) (buffer.get-content)
        id (vim.fn.expand "%:t")
        response (api.save-article api-key id content)]
    (handle-api-error response
                      (fn []
                        (notify.info "Article saved!")
                        (vim.api.nvim_buf_set_option bufnr :modified false)))))

(λ new-article [api-key]
  (fn []
    (let [(status title) (pcall vim.fn.input "New article's title: ")]
      (when (and status (not= title ""))
        (let [response (api.new-article api-key title)]
          (handle-api-error response
                            (fn [res]
                              (buffer.open-my-article res.body))))))))

(λ feed [api-key]
  (fn []
    (let [response (api.feed api-key)]
      (handle-api-error response
                        (fn [res]
                          (buffer.open-feed res.body))))))

(λ seek-feed-title [line-number get-next-line-number count]
  (let [line-content (vim.fn.getline line-number)
        ?title (string.match line-content " ## (.+)" 1)]
    (vim.pretty_print {: line-content : line-number : ?title})
    (if ?title
        ?title
        (> count 1000)
        (notify.error "Could not find title")
        (seek-feed-title (get-next-line-number line-number)
                         get-next-line-number (+ count 1)))))

(λ get-card-title [line-number]
  (let [line-content (vim.fn.getline line-number)
        is-card-upper-border? (string.match line-content "🭽" 1)
        is-out-of-card? (not (string.match line-content "^[ |🭽|▏|🭼]" 1))]
    (if is-out-of-card?
        nil
        (seek-feed-title line-number
                         (if is-card-upper-border?
                             (fn [n]
                               (+ n 1))
                             (fn [n]
                               (- n 1))) 0))))

(λ open-feed-article [api-key location]
  (let [title (get-card-title (vim.fn.line "."))
        ?article-data (. _G.forem-feed-articles title)]
    (when title
      (if ?article-data
          (if (= location :browser)
              (util.open-browser-url ?article-data.url)
              (let [response (api.get-article api-key ?article-data.id)]
                (handle-api-error response
                                  (fn [res]
                                    (buffer.open-article res.body)))))
          (notify.error "Could not find article data. Please reopen the feed.")))))

;; Autocmd

(local forem_group (vim.api.nvim_create_augroup :forem_autocmds {:clear true}))

(λ autocmds [api-key]
  (vim.api.nvim_create_autocmd [:BufWriteCmd]
                               {:group forem_group
                                :pattern "forem://my-article/*"
                                :callback #(save-article api-key)})
  (vim.api.nvim_create_autocmd [:BufEnter]
                               {:group forem_group
                                :pattern "forem://*/feed"
                                :callback #(vim.keymap.set :n :<CR>
                                                           #(open-feed-article api-key
                                                                               :buffer)
                                                           {:buffer true
                                                            :silent true})})
  (vim.api.nvim_create_autocmd [:BufEnter]
                               {:group forem_group
                                :pattern "forem://*/feed"
                                :callback #(vim.keymap.set :n :<C-b>
                                                           #(open-feed-article api-key
                                                                               :browser)
                                                           {:buffer true
                                                            :silent true})}))

;; Setup

(λ setup [options]
  (autocmds options.api_key)
  (set M.my_articles (my-articles options.api_key))
  (set M.new_article (new-article options.api_key))
  (set M.feed (feed options.api_key)))

(set M.setup (λ [options]
               (if (not options.api_key)
                   (notify.error "forem.nvim: api_key is required on setup")
                   (setup options))))

M
