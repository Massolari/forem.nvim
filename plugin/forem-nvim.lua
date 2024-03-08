local ____lualib = require("lualib_bundle")
local __TS__ObjectValues = ____lualib.__TS__ObjectValues
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local ____exports = {}
local forem = require("forem-nvim")
local notify = require("forem-nvim.notify")
local Command = Command or ({})
Command.Feed = "feed"
Command.MyArticles = "my_articles"
Command.NewArticle = "new_article"
Command.OpenUrl = "open_url"
local function isCommand(command)
    return __TS__ArrayIncludes(
        __TS__ObjectValues(Command),
        command
    )
end
vim.api.nvim_create_user_command(
    "Forem",
    function(____bindingPattern0)
        local args
        args = ____bindingPattern0.args
        if not isCommand(args) then
            notify.error("Unknown command: " .. args)
            return
        end
        repeat
            local ____switch5 = args
            local ____cond5 = ____switch5 == Command.Feed
            if ____cond5 then
                return forem.feed()
            end
            ____cond5 = ____cond5 or ____switch5 == Command.MyArticles
            if ____cond5 then
                return forem.my_articles()
            end
            ____cond5 = ____cond5 or ____switch5 == Command.NewArticle
            if ____cond5 then
                return forem.new_article()
            end
            ____cond5 = ____cond5 or ____switch5 == Command.OpenUrl
            if ____cond5 then
                return forem.open_url()
            end
        until true
    end,
    {
        nargs = 1,
        complete = function() return __TS__ObjectValues(Command) end
    }
)
return ____exports
