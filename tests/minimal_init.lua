local function load_module(module, source, _3fdirectory)
  _G.assert((nil ~= source), "Missing argument source on tests/minimal_init.fnl:1")
  _G.assert((nil ~= module), "Missing argument module on tests/minimal_init.fnl:1")
  local module_dir = (_3fdirectory or ("/tmp/" .. module))
  local is_not_a_directory = (vim.fn.isdirectory(module_dir) == 0)
  if is_not_a_directory then
    vim.fn.system({"git", "clone", source, module_dir})
  else
  end
  return module_dir
end
local plenary_dir = (os.getenv("PLENARY_DIR") or "/tmp/plenary.nvim")
load_module("plenary.nvim", "https://github.com/nvim-lua/plenary.nvim", plenary_dir)
local telescope_dir = load_module("telescope.nvim", "https://github.com/nvim-telescope/telescope.nvim")
do end (vim.opt.rtp):append(".")
do end (vim.opt.rtp):append(plenary_dir)
do end (vim.opt.rtp):append(telescope_dir)
vim.cmd("runtime plugin/plenary.vim")
return require("plenary.busted")
