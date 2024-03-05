(λ load-module [module source ?directory]
  (local module-dir (or ?directory (.. :/tmp/ module)))
  (local is-not-a-directory (= (vim.fn.isdirectory module-dir) 0))
  (when is-not-a-directory
    (vim.fn.system [:git :clone source module-dir]))
  module-dir)

(local plenary-dir (or (os.getenv :PLENARY_DIR) :/tmp/plenary.nvim))
(load-module :plenary.nvim "https://github.com/nvim-lua/plenary.nvim"
             plenary-dir)

(local telescope-dir
       (load-module :telescope.nvim
                    "https://github.com/nvim-telescope/telescope.nvim"))

(vim.opt.rtp:append ".")
(vim.opt.rtp:append plenary-dir)
(vim.opt.rtp:append telescope-dir)
(vim.cmd "runtime plugin/plenary.vim")
(require :plenary.busted)
