(local api (require :forem-nvim.api))
(local Article (require :forem-nvim.article))
(local notify (require :forem-nvim.notify))
(local util (require :forem-nvim.util))
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
  (let [modifiable (vim.opt_local.modifiable:get)]
    (set-local :modifiable true)
    (vim.api.nvim_buf_set_lines bufnr (or ?init 0) -1 false text)
    (set-local :modifiable modifiable)))

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

(λ seek-feed-title [line-number get-next-line-number count]
  (let [line-content (vim.fn.getline line-number)
        ?title (string.match line-content " ## (.+)" 1)]
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

(λ open-feed-article [location]
  (let [title (get-card-title (vim.fn.line "."))
        ?article-data (. _G.forem-feed-articles title)]
    (when title
      (if ?article-data
          (if (= location :browser)
              (util.open-browser-url ?article-data.url)
              (api.get-article ?article-data.id M.open-article))
          (notify.error "Could not find article data. Please reopen the feed.")))))

(λ M.load-feed []
  (set-feed-basic-options)
  (local bufnr (vim.api.nvim_get_current_buf))
  (M.write bufnr ["Loading feed..."])
  (api.feed (fn [articles]
              (vim.keymap.set :n :<CR> #(open-feed-article :buffer)
                              {:buffer true :silent true})
              (vim.keymap.set :n :<C-b> #(open-feed-article :browser)
                              {:buffer true :silent true})
              (let [max-columns (fold (fn [article total]
                                        (vim.fn.max [(length article.title)
                                                     (length article.description)
                                                     total]))
                                      0 articles)
                    feed (->> articles
                              (vim.tbl_map (fn [article]
                                             (Article.format-to-feed article
                                                                     max-columns)))
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
                (M.write bufnr feed 5)))))

(λ M.open-article [article]
  (vim.cmd (string.format ":edit forem://article/%s" article.title))
  (let [bufnr (vim.api.nvim_get_current_buf)
        article-body (Article.get-body-lines article)]
    (set-local :linebreak true)
    (set-local :textwidth 80)
    (M.write bufnr article-body))
  (set-feed-basic-options))

M
