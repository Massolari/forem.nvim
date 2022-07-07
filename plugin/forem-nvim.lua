local forem = require("forem-nvim")
local commands = {"feed", "my_articles", "new_article", "open_by_url"}
local function _1_(params)
  if vim.tbl_contains(commands, params.args) then
    return forem[params.args]()
  else
    return print("Unknown command")
  end
end
local function _3_()
  return commands
end
return vim.api.nvim_create_user_command("Forem", _1_, {nargs = 1, complete = _3_})
