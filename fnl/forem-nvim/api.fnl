(local curl (require :plenary.curl))
(local M {})
(local base-url "https://dev.to/api")

(set M.get-articles (λ [api-key]
                      (fn []
                        (let [response (curl.get {:url (.. base-url
                                                           :/articles/me)
                                                  :headers {: api-key}})]
                          (print (vim.inspect response))))))

M
