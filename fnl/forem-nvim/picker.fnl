(local pickers (require :telescope.pickers))
(local finders (require :telescope.finders))
(local previewers (require :telescope.previewers))
(local actions (require :telescope.actions))
(local action_state (require :telescope.actions.state))
(local conf (. (require :telescope.config) :values))
(local M {})

(local new-line "\n")

(λ get-article-body-lines [article]
  (vim.split article.body_markdown new-line))

(λ write-to-buffer [bufnr text]
  (vim.api.nvim_buf_set_lines bufnr 0 -1 false text))

(λ my-articles-picker [articles]
  (pickers.new {}
               {:prompt_title "My Articles"
                :finder (finders.new_table {:results articles
                                            :entry_maker (fn [article]
                                                           {:value article
                                                            :display article.title
                                                            :type_of article.type_of
                                                            :ordinal (.. (tostring article.published_at)
                                                                         article.title)})})
                :previewer (previewers.new_buffer_previewer {:title "Article Preview"
                                                             :dyn_title (fn [_
                                                                             entry]
                                                                          entry.display)
                                                             :define_preview (fn [self
                                                                                  entry]
                                                                               (when (not self.state.bufname)
                                                                                 (let [article entry.value
                                                                                       article-body (get-article-body-lines article)
                                                                                       bufnr self.state.bufnr]
                                                                                   (vim.api.nvim_buf_set_option bufnr
                                                                                                                :filetype
                                                                                                                :markdown)
                                                                                   (write-to-buffer bufnr
                                                                                                    article-body))))
                                                             :get_buffer_by_name (fn [_
                                                                                      entry]
                                                                                   entry.value.slug)})
                :sorter (conf.prefilter_sorter {:tag :type_of
                                                :sorter (conf.generic_sorter {})})
                :attach_mappings (fn [prompt_bufnr _]
                                   (actions.select_default:replace (fn []
                                                                     (let [selection (action_state.get_selected_entry prompt_bufnr)]
                                                                       (actions.close prompt_bufnr)
                                                                       (vim.cmd (string.format ":edit forem://my-article/%s"
                                                                                               selection.value.id))
                                                                       (let [bufnr (vim.api.nvim_get_current_buf)
                                                                             article-body (get-article-body-lines selection.value)]
                                                                         (write-to-buffer bufnr
                                                                                          article-body))
                                                                       (vim.cmd "
                                                                       set nomodified
                                                                       set filetype=markdown
                                                                       set buftype=acwrite
                                                                       ")))))}))

(set M.my-articles
     (λ [articles]
       (: (my-articles-picker articles) :find)))

M
