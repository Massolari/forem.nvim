(local M {})

(λ notify [message level]
  (vim.notify message level {:title :Forem.nvim}))

(set M.error (λ [message]
               (notify message vim.log.levels.ERROR)))

(set M.info (λ [message]
              (notify message vim.log.levels.INFO)))

M
