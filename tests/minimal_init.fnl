(local plenary-dir (or (os.getenv :PLENARY_DIR) :/tmp/plenary.nvim))
(local is-not-a-directory (= (vim.fn.isdirectory plenary-dir) 0))
(when is-not-a-directory
  (vim.fn.system [:git
                  :clone
                  "https://github.com/nvim-lua/plenary.nvim"
                  plenary-dir]))

(vim.opt.rtp:append ".")
(vim.opt.rtp:append plenary-dir)
(vim.cmd "runtime plugin/plenary.vim")
(require :plenary.busted)
