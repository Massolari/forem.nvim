(local M {})

(λ notify [message level]
  (vim.notify message level {:title :Forem.nvim}))

(λ M.error [message]
  (notify message vim.log.levels.ERROR))

(λ M.info [message]
  (notify message vim.log.levels.INFO))

M
