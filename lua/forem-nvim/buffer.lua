local Article = require("forem-nvim.article")
local _local_1_ = require("forem-nvim.util")
local fold = _local_1_["fold"]
local set_locals = _local_1_["set-locals"]
local set_local = _local_1_["set-local"]
local M = {}
local function set_basic_options()
  return set_locals({{"filetype", "markdown"}, {"modified", false}})
end
local function set_basic_options_and(opt_vals)
  _G.assert((nil ~= opt_vals), "Missing argument opt-vals on fnl/forem-nvim/buffer.fnl:8")
  set_basic_options()
  return set_locals(opt_vals)
end
local function set_feed_basic_options()
  return set_basic_options_and({{"modifiable", false}, {"spell", false}, {"buftype", "nowrite"}, {"swapfile", false}})
end
local function _2_(bufnr, text, _3finit)
  _G.assert((nil ~= text), "Missing argument text on fnl/forem-nvim/buffer.fnl:19")
  _G.assert((nil ~= bufnr), "Missing argument bufnr on fnl/forem-nvim/buffer.fnl:19")
  set_local("modifiable", true)
  return vim.api.nvim_buf_set_lines(bufnr, (_3finit or 0), -1, false, text)
end
M.write = _2_
local function _3_()
  local bufnr = vim.api.nvim_get_current_buf()
  return vim.fn.join(vim.api.nvim_buf_get_lines(bufnr, 0, -1, 1), "\n"), bufnr
end
M["get-content"] = _3_
local function _4_(article)
  _G.assert((nil ~= article), "Missing argument article on fnl/forem-nvim/buffer.fnl:30")
  vim.cmd(string.format(":edit forem://my-article/%s", article.id))
  do
    local bufnr = vim.api.nvim_get_current_buf()
    local article_body = Article["get-body-lines"](article)
    M.write(bufnr, article_body)
  end
  return set_basic_options_and({{"buftype", "acwrite"}, {"swapfile", false}})
end
M["open-my-article"] = _4_
local function _5_(articles)
  _G.assert((nil ~= articles), "Missing argument articles on fnl/forem-nvim/buffer.fnl:37")
  vim.cmd(":edit forem://articles/feed")
  local bufnr = vim.api.nvim_get_current_buf()
  local max_columns
  local function _6_(article, total)
    return vim.fn.max({#article.title, #article.description, total})
  end
  max_columns = fold(_6_, 0, articles)
  local feed
  local function _7_(article)
    return Article["format-to-feed"](article, max_columns)
  end
  feed = vim.tbl_flatten(vim.tbl_map(_7_, articles))
  _G["forem-feed-articles"] = {}
  for _, article in pairs(articles) do
    _G["forem-feed-articles"][article.title] = {id = article.id, url = article.url}
  end
  M.write(bufnr, {"# Your Feed", "", "Press <Enter> in a card to open the article in a new buffer", "and <C-b> to open it in the browser.", ""})
  M.write(bufnr, feed, 5)
  return set_feed_basic_options()
end
M["open-feed"] = _5_
local function _8_(article)
  _G.assert((nil ~= article), "Missing argument article on fnl/forem-nvim/buffer.fnl:62")
  vim.cmd(string.format(":edit forem://article/%s", article.title))
  do
    local bufnr = vim.api.nvim_get_current_buf()
    local article_body = Article["get-body-lines"](article)
    set_local("linebreak", true)
    set_local("textwidth", 80)
    M.write(bufnr, article_body)
  end
  return set_feed_basic_options()
end
M["open-article"] = _8_
return M
