(local api (require :forem-nvim.api))
(local buffer (require :forem-nvim.buffer))
(local notify (require :forem-nvim.notify))
(local picker (require :forem-nvim.picker))

(local M {})

;; Utils

(λ check-api-key [callback]
  (if (not (api.key))
      (notify.error "forem.nvim: FOREM_API_KEY environment variable is missing")
      (callback)))

(λ my-articles []
  (api.my-articles picker.my-articles))

(λ save-article []
  (let [(content bufnr) (buffer.get-content)
        id (vim.fn.expand "%:t")
        response (api.save-article id content)]
    (api.handle-api-error response
                          (fn []
                            (notify.info "Article saved!")
                            (vim.api.nvim_buf_set_option bufnr :modified false)))))

(λ new-article []
  (let [(status title) (pcall vim.fn.input "New article's title: ")]
    (when (and status (not= title ""))
      (let [response (api.new-article title)]
        (api.handle-api-error response buffer.open-my-article)))))

(λ feed []
  (vim.cmd.edit "forem://articles/feed"))

(λ open-by-url []
  (let [(status url) (pcall vim.fn.input "Article's URL: ")]
    (when (and status (not= url ""))
      (let [path (string.match url "(%w+/[%w|-]+)$")]
        (if path
            (api.get-article-by-path path buffer.open-article)
            (notify.error (.. "This URL is not valid: " url)))))))

;; Autocmd

(local forem_group (vim.api.nvim_create_augroup :forem_autocmds {:clear true}))

(λ set-autocmds []
  (vim.api.nvim_create_autocmd [:BufWriteCmd]
                               {:group forem_group
                                :pattern "forem://my-article/*"
                                :callback #(save-article)})
  (vim.api.nvim_create_autocmd [:BufEnter]
                               {:group forem_group
                                :pattern "forem://articles/feed"
                                :callback #(buffer.load-feed)})
  (vim.api.nvim_create_autocmd [:CursorMoved]
                               {:group forem_group
                                :pattern "forem://*/floatmenu"
                                :callback (fn []
                                            (let [[buffer line column off] (vim.fn.getpos ".")]
                                              (when (> column 1)
                                                (vim.fn.setpos "."
                                                               [buffer
                                                                line
                                                                1
                                                                off]))))})
  (vim.api.nvim_create_autocmd [:BufEnter]
                               {:group forem_group
                                :pattern "forem://*/floatmenu"
                                :callback (fn []
                                            (vim.keymap.set :n :<Esc>
                                                            #(vim.api.nvim_win_close 0
                                                                                     false)))}))

;; Setup

(λ setup []
  (set-autocmds)
  (set M.my_articles #(check-api-key my-articles))
  (set M.new_article #(check-api-key new-article))
  (set M.feed #(check-api-key feed))
  (set M.open_by_url #(check-api-key open-by-url)))

(λ M.setup []
  (when (not (api.key))
    (notify.error "forem.nvim: FOREM_API_KEY environment variable is missing"))
  (setup))

M
