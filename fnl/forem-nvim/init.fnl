(local M {})
(local api (require :forem-nvim.api))

(λ setup [options]
  (set M.get_articles (api.get-articles options.api_key)))

(set M.setup (λ [options]
               (if (not options.api_key)
                   (error "forem.nvim: api_key is required on setup")
                   (setup options))))

M
