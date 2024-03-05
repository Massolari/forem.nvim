local api = require("forem-nvim.api")
local buffer = require("forem-nvim.buffer")
local notify = require("forem-nvim.notify")
local picker = require("forem-nvim.picker")
local M = {}
local function check_api_key(callback)
  _G.assert((nil ~= callback), "Missing argument callback on fnl/forem-nvim/init.fnl:10")
  if not api.key() then
    return notify.error("forem.nvim: FOREM_API_KEY environment variable is missing")
  else
    return callback()
  end
end
local function my_articles()
  return api["my-articles"](picker["my-articles"])
end
local function save_article()
  local content, bufnr = buffer["get-content"]()
  local id = vim.fn.expand("%:t")
  local response = api["save-article"](id, content)
  local function _2_()
    notify.info("Article saved!")
    return vim.api.nvim_buf_set_option(bufnr, "modified", false)
  end
  return api["handle-api-error"](response, _2_)
end
local function new_article()
  local status, title = pcall(vim.fn.input, "New article's title: ")
  if (status and (title ~= "")) then
    local response = api["new-article"](title)
    return api["handle-api-error"](response, buffer["open-my-article"])
  else
    return nil
  end
end
local function feed()
  return vim.cmd.edit("forem://articles/feed")
end
local function open_by_url()
  local status, url = pcall(vim.fn.input, "Article's URL: ")
  if (status and (url ~= "")) then
    local path = string.match(url, "(%w+/[%w|-]+)$")
    if path then
      return api["get-article-by-path"](path, buffer["open-article"])
    else
      return notify.error(("This URL is not valid: " .. url))
    end
  else
    return nil
  end
end
local forem_group = vim.api.nvim_create_augroup("forem_autocmds", {clear = true})
local function set_autocmds()
  local function _6_()
    return save_article()
  end
  vim.api.nvim_create_autocmd({"BufWriteCmd"}, {group = forem_group, pattern = "forem://my-article/*", callback = _6_})
  local function _7_()
    return buffer["load-feed"]()
  end
  vim.api.nvim_create_autocmd({"BufEnter"}, {group = forem_group, pattern = "forem://articles/feed", callback = _7_})
  local function _8_()
    local _let_9_ = vim.fn.getpos(".")
    local buffer0 = _let_9_[1]
    local line = _let_9_[2]
    local column = _let_9_[3]
    local off = _let_9_[4]
    if (column > 1) then
      return vim.fn.setpos(".", {buffer0, line, 1, off})
    else
      return nil
    end
  end
  vim.api.nvim_create_autocmd({"CursorMoved"}, {group = forem_group, pattern = "forem://*/floatmenu", callback = _8_})
  local function _11_()
    local function _12_()
      return vim.api.nvim_win_close(0, false)
    end
    return vim.keymap.set("n", "<Esc>", _12_)
  end
  return vim.api.nvim_create_autocmd({"BufEnter"}, {group = forem_group, pattern = "forem://*/floatmenu", callback = _11_})
end
local function setup()
  set_autocmds()
  local function _13_()
    return check_api_key(my_articles)
  end
  M.my_articles = _13_
  local function _14_()
    return check_api_key(new_article)
  end
  M.new_article = _14_
  local function _15_()
    return check_api_key(feed)
  end
  M.feed = _15_
  local function _16_()
    return check_api_key(open_by_url)
  end
  M.open_by_url = _16_
  return nil
end
M.setup = function()
  if not api.key() then
    notify.error("forem.nvim: FOREM_API_KEY environment variable is missing")
  else
  end
  return setup()
end
return M
