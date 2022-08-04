(local Article (require :forem-nvim.article))
(local {: fold : set-locals : set-local} (require :forem-nvim.util))
(local M {})

(λ set-basic-options []
  (set-locals [[:filetype :markdown] [:modified false]]))

(λ set-basic-options-and [opt-vals]
  (set-basic-options)
  (set-locals opt-vals))

(λ set-feed-basic-options []
  (set-basic-options-and [[:modifiable false]
                          [:spell false]
                          [:buftype :nowrite]
                          [:swapfile false]]))

(λ M.write [bufnr text ?init]
  (set-local :modifiable true)
  (vim.api.nvim_buf_set_lines bufnr (or ?init 0) -1 false text))

(λ M.get-content []
  (let [bufnr (vim.api.nvim_get_current_buf)]
    (values (-> (vim.api.nvim_buf_get_lines bufnr 0 -1 1)
                (vim.fn.join "\n")) bufnr)))

(λ M.open-my-article [article]
  (vim.cmd (string.format ":edit forem://my-article/%s" article.id))
  (let [bufnr (vim.api.nvim_get_current_buf)
        article-body (Article.get-body-lines article)]
    (M.write bufnr article-body))
  (set-basic-options-and [[:buftype :acwrite] [:swapfile false]]))

(λ M.open-feed [articles]
  (vim.cmd ":edit forem://articles/feed")
  (let [bufnr (vim.api.nvim_get_current_buf)
        max-columns (fold (fn [article total]
                            (vim.fn.max [(length article.title)
                                         (length article.description)
                                         total])) 0
                          articles)
        feed (->> articles
                  (vim.tbl_map (fn [article]
                                 (Article.format-to-feed article max-columns)))
                  (vim.tbl_flatten))]
    (set _G.forem-feed-articles {})
    (each [_ article (pairs articles)]
      (tset _G.forem-feed-articles article.title
            {:id article.id :url article.url}))
    (M.write bufnr ["# Your Feed"
                    ""
                    "Press <Enter> in a card to open the article in a new buffer"
                    "and <C-b> to open it in the browser."
                    ""])
    (M.write bufnr feed 5)
    (set-feed-basic-options)))

(λ M.open-article [article]
  (vim.cmd (string.format ":edit forem://article/%s" article.title))
  (let [bufnr (vim.api.nvim_get_current_buf)
        article-body (Article.get-body-lines article)]
    (set-local :linebreak true)
    (set-local :textwidth 80)
    (M.write bufnr article-body))
  (set-feed-basic-options))

M
