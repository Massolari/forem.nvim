local M = {}
local Article = require("forem-nvim.article")
local util = require("forem-nvim.util")
local set_locals = util.set_locals

M.set_basic_options = function()
  set_locals({
    filetype = "markdown",
    modified = false
  })
end

M.write = function(buffer, lines, offset)
  local modifiable = vim.opt_local.modifiable:get()
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

M.get_content = function()
  local buffer = vim.api.nvim_get_current_buf()
  local lines = vim.api.nvim_buf_get_lines(buffer, 0, -1, true)
  return {
    content = table.concat(lines, "\n"),
    bufnr = buffer
  }
end

M.open_my_article = function(article)
  vim.cmd(":edit forem://my-article/" .. tostring(article.id))
  local buffer = vim.api.nvim_get_current_buf()
  M.write(
    buffer,
    Article.get_body_lines(article)
  )
  M.set_basic_options()
  set_locals({ buftype = "acwrite", swapfile = false })
end

M.load_article = function(article)
  vim.cmd(":edit forem://article/" .. article.title)
  set_locals({ linebreak = true, textwidth = 80 })
  local buffer = vim.api.nvim_get_current_buf()
  local body = Article.get_body_lines(article)
  M.write(buffer, body)
  M.set_basic_options()
  set_locals({
    modifiable = false,
    spell = false,
    buftype = "nowrite",
    swapfile = false
  })
end

return M
