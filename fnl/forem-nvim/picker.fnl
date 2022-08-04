(local pickers (require :telescope.pickers))
(local finders (require :telescope.finders))
(local previewers (require :telescope.previewers))
(local actions (require :telescope.actions))
(local action_state (require :telescope.actions.state))
(local conf (. (require :telescope.config) :values))
(local Article (require :forem-nvim.article))
(local buffer (require :forem-nvim.buffer))
(local M {})

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
                                                                                       article-body (Article.get-body-lines article)
                                                                                       bufnr self.state.bufnr]
                                                                                   (vim.api.nvim_buf_set_option bufnr
                                                                                                                :filetype
                                                                                                                :markdown)
                                                                                   (buffer.write bufnr
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
                                                                       (buffer.open-my-article selection.value)))))}))

(λ M.my-articles [articles]
  (: (my-articles-picker articles) :find))

M
