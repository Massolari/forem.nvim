(local plenary-dir (or (os.getenv :PLENARY_DIR) :/tmp/plenary.nvim))
(local telescope-dir (or (os.getenv :TELESCOPE_DIR) :/tmp/telescope.nvim))

(fn is-not-a-directory [directory]
  (= (vim.fn.isdirectory directory) 0))

(when (is-not-a-directory plenary-dir)
  (vim.fn.system [:git
                  :clone
                  "https://github.com/nvim-lua/plenary.nvim"
                  plenary-dir]))

(when (is-not-a-directory telescope-dir)
  (vim.fn.system [:git
                  :clone
                  "https://github.com/nvim-telescope/telescope.nvim"]))

(vim.opt.rtp:append ".")
(vim.opt.rtp:append plenary-dir)
(vim.opt.rtp:append telescope-dir)
(vim.cmd "runtime plugin/plenary.vim")
(vim.cmd "runtime plugin/telescope.lua")
(require :plenary.busted)
