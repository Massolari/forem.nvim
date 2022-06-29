(local forem (require :forem-nvim))

(local commands
    [:feed
     :my_articles
     :new_article
     :open_by_url])

(vim.api.nvim_create_user_command :Forem
                                  (fn [params]
                                    (if (vim.tbl_contains commands params.args)
                                        ((. forem params.args))
                                        (print "Unknown command")))
                                  {:nargs 1
                                   :complete (fn [] commands)})
