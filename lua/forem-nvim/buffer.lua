--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local Article = require("forem-nvim.article")
local ____util = require("forem-nvim.util")
local setLocals = ____util.setLocals
local getOption = ____util.getOption
____exports.setBasicOptions = function()
    setLocals({{"filetype", "markdown"}, {"modified", false}})
end
____exports.write = function(buffer, lines, offset)
    local modifiable = getOption(vim.opt_local.modifiable)
    vim.opt_local.modifiable = true
    vim.api.nvim_buf_set_lines(
        buffer,
        offset or 0,
        -1,
        false,
        lines
    )
    vim.opt_local.modifiable = modifiable
end
____exports.getContent = function()
    local buffer = vim.api.nvim_get_current_buf()
    local lines = vim.api.nvim_buf_get_lines(buffer, 0, -1, true)
    return {
        content = table.concat(lines, "\n"),
        bufnr = buffer
    }
end
____exports.openMyArticle = function(article)
    vim.cmd(":edit forem://my-article/" .. tostring(article.id))
    local buffer = vim.api.nvim_get_current_buf()
    ____exports.write(
        buffer,
        Article.getBodyLines(article)
    )
    ____exports.setBasicOptions()
    setLocals({{"buftype", "acwrite"}, {"swapfile", false}})
end
____exports.loadArticle = function(article)
    vim.cmd(":edit forem://article/" .. article.title)
    setLocals({{"linebreak", true}, {"textwidth", 80}})
    local buffer = vim.api.nvim_get_current_buf()
    local body = Article.getBodyLines(article)
    ____exports.write(buffer, body)
    ____exports.setBasicOptions()
    setLocals({{"modifiable", false}, {"spell", false}, {"buftype", "nowrite"}, {"swapfile", false}})
end
return ____exports
