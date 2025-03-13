local M = {}
local function notify(message, level)
  vim.notify(message, vim.log.levels[level], { title = "Forem.nvim" })
end
function M.error(message) return notify(message, "ERROR") end

function M.info(message) return notify(message, "INFO") end

return M
