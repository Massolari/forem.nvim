--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
loadModule = function(module, source, directory)
    local moduleDir = directory or "/tmp/" .. module
    local directoryExists = vim.fn.isdirectory(moduleDir)
    if directoryExists == 0 then
        vim.fn.system({"git", "clone", source, moduleDir})
    end
    return moduleDir
end
plenaryDir = os.getenv("PLENARY_DIR") or "/tmp/plenary.nvim"
loadModule("plenary.nvim", "https://github.com/nvim-lua/plenary.nvim", plenaryDir)
telescopeDir = loadModule("telescope.nvim", "https://github.com/nvim-telescope/telescope.nvim")
append = function(option, value)
    option.append(option, value)
end
append(vim.opt.rtp, ".")
append(vim.opt.rtp, plenaryDir)
append(vim.opt.rtp, telescopeDir)
vim.cmd("runtime plugin/plenary.vim")
require("plenary.busted")
