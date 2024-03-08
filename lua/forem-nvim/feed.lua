local ____lualib = require("lualib_bundle")
local __TS__ArrayReduce = ____lualib.__TS__ArrayReduce
local __TS__ArrayFlatMap = ____lualib.__TS__ArrayFlatMap
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local ____exports = {}
local getCardTitle, setKeyMaps, populateGlobalFeedArticles, articleToFeed
local api = require("forem-nvim.api")
local buffer = require("forem-nvim.buffer")
local notify = require("forem-nvim.notify")
local util = require("forem-nvim.util")
local ____util = require("forem-nvim.util")
local setLocals = ____util.setLocals
____exports.open = function() return vim.cmd("edit forem://articles/feed") end
local function setBasicOptions()
    buffer.setBasicOptions()
    setLocals({{"modifiable", false}, {"spell", false}, {"buftype", "nowrite"}, {"swapfile", false}})
end
local seekTitle
seekTitle = function(line, getNextLine, count)
    local lineContent = vim.fn.getline(line)
    local title = string.match(lineContent, " ## (.+)", 1)
    if title ~= nil then
        return title
    end
    if count > 1000 then
        notify.error("Could not find the title of the article")
        return nil
    end
    return seekTitle(
        getNextLine(line),
        getNextLine,
        count + 1
    )
end
____exports.openArticle = function(location)
    local title = getCardTitle(vim.fn.line("."))
    if not title then
        notify.error("Could not find article data. Please reopen the feed.")
        return
    end
    local articleData = foremFeedArticles and foremFeedArticles:get(title)
    if not articleData then
        notify.error("Could not find article data. Please reload the feed.")
        return
    end
    if location == "browser" then
        util.openUrlOnBrowser(articleData.url)
    else
        api.getArticle(articleData.id, buffer.loadArticle)
    end
end
getCardTitle = function(line)
    local content = vim.fn.getline(line)
    local isInsideOfCard = string.match(content, "^[ |🭽|▏|🭼]", 1)
    if not isInsideOfCard then
        return nil
    end
    local isUpperBorder = string.match(content, "🭽", 1)
    local getNextLine = isUpperBorder ~= nil and (function(line) return line + 1 end) or (function(line) return line - 1 end)
    return seekTitle(line, getNextLine, 0)
end
____exports.load = function()
    setBasicOptions()
    local bufnr = vim.api.nvim_get_current_buf()
    buffer.write(bufnr, {"Loading feed..."})
    api.feed(function(articles)
        setKeyMaps()
        populateGlobalFeedArticles(articles)
        local maxColumn = __TS__ArrayReduce(
            articles,
            function(____, max, article) return math.max(#article.title, #article.description, max) end,
            0
        )
        local feed = __TS__ArrayFlatMap(
            articles,
            function(____, article) return articleToFeed(article, maxColumn) end
        )
        buffer.write(
            bufnr,
            {
                "# Your Feed",
                "",
                "Press <Enter> in a card to open the article in a new buffer",
                "and <C-b> to open it in the browser.",
                "",
                unpack(feed)
            }
        )
    end)
end
setKeyMaps = function()
    vim.keymap.set(
        "n",
        "<CR>",
        function() return ____exports.openArticle("buffer") end,
        {buffer = true, silent = true}
    )
    vim.keymap.set(
        "n",
        "<C-b>",
        function() return ____exports.openArticle("browser") end,
        {buffer = true, silent = true}
    )
end
populateGlobalFeedArticles = function(articles)
    foremFeedArticles = __TS__New(
        Map,
        __TS__ArrayMap(
            articles,
            function(____, article) return {article.title, {id = article.id, url = article.url}} end
        )
    )
end
____exports.tagsToString = function(tags) return table.concat(
    __TS__ArrayMap(
        tags,
        function(____, tag) return "#" .. tag end
    ),
    ", "
) end
articleToFeed = function(article, maxColumns) return {
    ("🭽" .. string.rep("▔", maxColumns)) .. "🭾",
    " ## " .. article.title,
    " " .. article.description,
    (((" 👤" .. article.user.name) .. "  (") .. article.user.username) .. ")",
    "▏",
    (((" 🕒 " .. tostring(article.reading_time_minutes)) .. " ") .. util.pluralize(article.reading_time_minutes, "minute")) .. " of reading time",
    " Tags: " .. ____exports.tagsToString(article.tag_list),
    ((" 💕" .. tostring(article.positive_reactions_count)) .. " 💬") .. tostring(article.comments_count),
    " 📆" .. article.readable_publish_date,
    "▏",
    ("🭼" .. string.rep("▁", maxColumns)) .. "🭿",
    ""
} end
return ____exports
