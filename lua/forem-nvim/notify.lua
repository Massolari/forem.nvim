local M = {}
local function notify(message, level)
  _G.assert((nil ~= level), "Missing argument level on fnl/forem-nvim/notify.fnl:3")
  _G.assert((nil ~= message), "Missing argument message on fnl/forem-nvim/notify.fnl:3")
  return vim.notify(message, level, {title = "Forem.nvim"})
end
M.error = function(message)
  _G.assert((nil ~= message), "Missing argument message on fnl/forem-nvim/notify.fnl:6")
  return notify(message, vim.log.levels.ERROR)
end
M.info = function(message)
  _G.assert((nil ~= message), "Missing argument message on fnl/forem-nvim/notify.fnl:9")
  return notify(message, vim.log.levels.INFO)
end
return M
