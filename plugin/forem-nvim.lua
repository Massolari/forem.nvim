local forem = require("forem-nvim")
local notify = require("forem-nvim.notify")
local commands = {"feed", "my_articles", "new_article", "open_by_url"}
local function _3_(_1_)
  local _arg_2_ = _1_
  local args = _arg_2_["args"]
  if vim.tbl_contains(commands, args) then
    return forem[args]()
  else
    return notify.error(("Unknown command: " .. args))
  end
end
local function _5_()
  return commands
end
return vim.api.nvim_create_user_command("Forem", _3_, {nargs = 1, complete = _5_})
