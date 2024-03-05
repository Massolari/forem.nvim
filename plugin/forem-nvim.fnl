(local forem (require :forem-nvim))
(local notify (require :forem-nvim.notify))

(local commands [:feed :my_articles :new_article :open_by_url])

(vim.api.nvim_create_user_command :Forem
                                  (fn [{: args}]
                                    (if (vim.tbl_contains commands args)
                                        ((. forem args))
                                        (notify.error (.. "Unknown command: "
                                                          args))))
                                  {:nargs 1 :complete (fn [] commands)})
