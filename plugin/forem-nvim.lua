local M = {}
local forem = require("forem-nvim")
local notify = require("forem-nvim.notify")

local commands = {
  feed = "feed",
  my_articles = "my_articles",
  new_article = "new_article",
  open_url = "open_url"
}

vim.api.nvim_create_user_command(
  "Forem",
  function(data)
    local args = data.args

    if args == commands.feed then
      return forem.feed()
    elseif args == commands.my_articles then
      return forem.my_articles()
    elseif args == commands.new_article then
      return forem.new_article()
    elseif args == commands.open_url then
      return forem.open_url()
    else
      notify.error("Unknown command: " .. args)
    end
  end,
  {
    nargs = 1,
    complete = function() return vim.tbl_values(commands) end
  }
)
return M
