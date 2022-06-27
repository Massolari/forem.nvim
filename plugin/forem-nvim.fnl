(local forem (require :forem-nvim))
(vim.api.nvim_create_user_command :Forem
                                  (fn [params]
                                    (vim.pretty_print params.args)
                                    (match params.args
                                      :my_articles (forem.my_articles)
                                      :new_article (forem.new_article)
                                      :feed (forem.feed)
                                      _ (print "Unknown command")))
                                  {:nargs 1
                                   :complete (fn []
                                               [:feed
                                                :my_articles
                                                :new_article])})
