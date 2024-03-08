--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local function notify(message, level)
    vim.notify(message, vim.log.levels[level], {title = "Forem.nvim"})
end
____exports.error = function(message) return notify(message, "ERROR") end
____exports.info = function(message) return notify(message, "INFO") end
return ____exports
