(local api (require :forem-nvim.api))
(local notify (require :forem-nvim.notify))
(local picker (require :forem-nvim.picker))

(local M {})

;; Utils

(λ handle-api-error [response on-success]
  (let [start-status (-> response.status (tostring) (string.sub 1 2))]
    (if (not= start-status :20)
        (notify.error (.. "An error occurred: " response.body.error))
        (on-success response))))

(λ save-article [api-key]
  (let [bufnr (vim.api.nvim_get_current_buf)
        content (-> (vim.api.nvim_buf_get_lines bufnr 0 -1 1)
                    (vim.fn.join "\n"))
        id (vim.fn.expand "%:t")
        response (api.save-article api-key id content)]
    (handle-api-error response
                      (fn []
                        (notify.info "Article saved!")
                        (vim.api.nvim_buf_set_option bufnr :modified false)))))

;; Autocmd

(local forem_group (vim.api.nvim_create_augroup :forem_autocmds {:clear true}))

(λ autocmds [api-key]
  (vim.api.nvim_create_autocmd [:BufWriteCmd] {:group forem_group
                       :pattern ["forem://my-article/*"]
                       :callback #(save-article api-key)}))

;; Setup

(λ my-articles [api-key]
  (fn []
    (let [response (api.my-articles api-key)]
      (handle-api-error response
                        (fn [response]
                          (picker.my-articles response.body))))))

(λ new-article [api-key]
  (fn []
    (let [(status title) (pcall vim.fn.input "New article's title: ")]
      (when (and status (not= title ""))
        (let [response (api.new-article api-key title)]
          (handle-api-error response
                            (fn [response]
                              (picker.open-my-article response.body))))))))

(λ setup [options]
  (set M.my_articles (my-articles options.api_key))
  (autocmds options.api_key)
  (set M.new_article (new-article options.api_key)))

(set M.setup (λ [options]
               (if (not options.api_key)
                   (notify.error "forem.nvim: api_key is required on setup")
                   (setup options))))

M
