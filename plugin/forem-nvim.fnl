(local forem (require :forem-nvim))
(vim.api.nvim_create_user_command
    :Forem
    (fn [params]
        (vim.pretty_print params.args)
        (match params.args
            :my_articles (forem.my_articles)
            :new_article (forem.new_article)
            _ (print "Unknown command")))
    {:nargs 1
     :complete (fn [] ["my_articles" "new_article"])})
