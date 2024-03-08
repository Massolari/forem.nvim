local ____lualib = require("lualib_bundle")
local __TS__Number = ____lualib.__TS__Number
local ____exports = {}
local api = require("forem-nvim.api")
local buffer = require("forem-nvim.buffer")
local Feed = require("forem-nvim.feed")
local notify = require("forem-nvim.notify")
local picker = require("forem-nvim.picker")
local NO_API_KEY_ERROR = "forem.nvim: FOREM_API_KEY environment variable is missing"
local function checkApiKey(callback)
    if api.key() then
        callback()
        return
    end
    notify.error(NO_API_KEY_ERROR)
end
local function myArticles()
    return api.myArticles(picker.myArticles)
end
local function saveArticle()
    local ____buffer_getContent_result_0 = buffer.getContent()
    local bufnr = ____buffer_getContent_result_0.bufnr
    local content = ____buffer_getContent_result_0.content
    local id = __TS__Number(vim.fn.expand("%:t"))
    if not id then
        notify.error("forem.nvim: Could not find article id")
        return
    end
    local response = api.saveArticle(id, content)
    api.handleError(
        response,
        function()
            notify.info("Article saved")
            vim.api.nvim_set_option_value("modified", false, {buf = bufnr})
        end
    )
end
local function newArticle()
    local status, title = pcall(
        function(prompt) return vim.fn.input(prompt) end,
        "Article's Title: "
    )
    if not status or title == "" then
        return
    end
    local response = api.newArticle(title)
    api.handleError(
        response,
        function(article)
            buffer.openMyArticle(article)
        end
    )
end
local function openByUrl()
    local status, url = pcall(
        function(prompt) return vim.fn.input(prompt) end,
        "Article's URL: "
    )
    if not status or url == "" then
        return
    end
    local path = string.match(url, "(%w+/[%w|-]+)$")
    if path == nil then
        notify.error("This URL is not valid: " .. url)
        return
    end
    api.getArticleByPath(path, buffer.loadArticle)
end
local foremAuGroup = vim.api.nvim_create_augroup("forem_autocmds", {})
local function setAutoCmds()
    vim.api.nvim_create_autocmd("BufWriteCmd", {group = foremAuGroup, pattern = "forem://my-article/*", callback = saveArticle})
    vim.api.nvim_create_autocmd("BufEnter", {group = foremAuGroup, pattern = "forem://articles/feed", callback = Feed.load})
    vim.api.nvim_create_autocmd(
        "CursorMoved",
        {
            group = foremAuGroup,
            pattern = "forem://*/floatmenu",
            callback = function()
                local buffer, line, column, off = unpack(vim.fn.getpos("."))
                if column <= 1 then
                    return
                end
                vim.fn.setpos(".", {buffer, line, 1, off})
            end
        }
    )
    vim.api.nvim_create_autocmd(
        "BufEnter",
        {
            group = foremAuGroup,
            pattern = "forem://*/floatmenu",
            callback = function()
                vim.keymap.set(
                    "n",
                    "<Esc>",
                    function() return vim.api.nvim_win_close(0, false) end
                )
            end
        }
    )
end
setAutoCmds()
if not api.key() then
    notify.error(NO_API_KEY_ERROR)
end
____exports.my_articles = function() return checkApiKey(myArticles) end
____exports.new_article = function() return checkApiKey(newArticle) end
____exports.feed = function() return checkApiKey(Feed.open) end
____exports.open_url = function() return checkApiKey(openByUrl) end
return ____exports
