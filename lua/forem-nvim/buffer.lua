local api = require("forem-nvim.api")
local Article = require("forem-nvim.article")
local notify = require("forem-nvim.notify")
local util = require("forem-nvim.util")
local _local_1_ = require("forem-nvim.util")
local fold = _local_1_["fold"]
local set_locals = _local_1_["set-locals"]
local set_local = _local_1_["set-local"]
local M = {}
local function set_basic_options()
  return set_locals({{"filetype", "markdown"}, {"modified", false}})
end
local function set_basic_options_and(opt_vals)
  _G.assert((nil ~= opt_vals), "Missing argument opt-vals on fnl/forem-nvim/buffer.fnl:11")
  set_basic_options()
  return set_locals(opt_vals)
end
local function set_feed_basic_options()
  return set_basic_options_and({{"modifiable", false}, {"spell", false}, {"buftype", "nowrite"}, {"swapfile", false}})
end
M.write = function(bufnr, text, _3finit)
  _G.assert((nil ~= text), "Missing argument text on fnl/forem-nvim/buffer.fnl:21")
  _G.assert((nil ~= bufnr), "Missing argument bufnr on fnl/forem-nvim/buffer.fnl:21")
  local modifiable = (vim.opt_local.modifiable):get()
  set_local("modifiable", true)
  vim.api.nvim_buf_set_lines(bufnr, (_3finit or 0), -1, false, text)
  return set_local("modifiable", modifiable)
end
M["get-content"] = function()
  local bufnr = vim.api.nvim_get_current_buf()
  return vim.fn.join(vim.api.nvim_buf_get_lines(bufnr, 0, -1, 1), "\n"), bufnr
end
M["open-my-article"] = function(article)
  _G.assert((nil ~= article), "Missing argument article on fnl/forem-nvim/buffer.fnl:32")
  vim.cmd(string.format(":edit forem://my-article/%s", article.id))
  do
    local bufnr = vim.api.nvim_get_current_buf()
    local article_body = Article["get-body-lines"](article)
    M.write(bufnr, article_body)
  end
  return set_basic_options_and({{"buftype", "acwrite"}, {"swapfile", false}})
end
local function seek_feed_title(line_number, get_next_line_number, count)
  _G.assert((nil ~= count), "Missing argument count on fnl/forem-nvim/buffer.fnl:39")
  _G.assert((nil ~= get_next_line_number), "Missing argument get-next-line-number on fnl/forem-nvim/buffer.fnl:39")
  _G.assert((nil ~= line_number), "Missing argument line-number on fnl/forem-nvim/buffer.fnl:39")
  local line_content = vim.fn.getline(line_number)
  local _3ftitle = string.match(line_content, " ## (.+)", 1)
  if _3ftitle then
    return _3ftitle
  elseif (count > 1000) then
    return notify.error("Could not find title")
  else
    return seek_feed_title(get_next_line_number(line_number), get_next_line_number, (count + 1))
  end
end
local function get_card_title(line_number)
  _G.assert((nil ~= line_number), "Missing argument line-number on fnl/forem-nvim/buffer.fnl:49")
  local line_content = vim.fn.getline(line_number)
  local is_card_upper_border_3f = string.match(line_content, "\240\159\173\189", 1)
  local is_out_of_card_3f = not string.match(line_content, "^[ |\240\159\173\189|\226\150\143|\240\159\173\188]", 1)
  if is_out_of_card_3f then
    return nil
  else
    local _3_
    if is_card_upper_border_3f then
      local function _4_(n)
        return (n + 1)
      end
      _3_ = _4_
    else
      local function _5_(n)
        return (n - 1)
      end
      _3_ = _5_
    end
    return seek_feed_title(line_number, _3_, 0)
  end
end
local function open_feed_article(location)
  _G.assert((nil ~= location), "Missing argument location on fnl/forem-nvim/buffer.fnl:62")
  local title = get_card_title(vim.fn.line("."))
  local _3farticle_data = (_G["forem-feed-articles"])[title]
  if title then
    if _3farticle_data then
      if (location == "browser") then
        return util["open-browser-url"](_3farticle_data.url)
      else
        return api["get-article"](_3farticle_data.id, M["open-article"])
      end
    else
      return notify.error("Could not find article data. Please reopen the feed.")
    end
  else
    return nil
  end
end
M["load-feed"] = function()
  set_feed_basic_options()
  local bufnr = vim.api.nvim_get_current_buf()
  M.write(bufnr, {"Loading feed..."})
  local function _11_(articles)
    local function _12_()
      return open_feed_article("buffer")
    end
    vim.keymap.set("n", "<CR>", _12_, {buffer = true, silent = true})
    local function _13_()
      return open_feed_article("browser")
    end
    vim.keymap.set("n", "<C-b>", _13_, {buffer = true, silent = true})
    local max_columns
    local function _14_(article, total)
      return vim.fn.max({#article.title, #article.description, total})
    end
    max_columns = fold(_14_, 0, articles)
    local feed
    local function _15_(article)
      return Article["format-to-feed"](article, max_columns)
    end
    feed = vim.tbl_flatten(vim.tbl_map(_15_, articles))
    _G["forem-feed-articles"] = {}
    for _, article in pairs(articles) do
      _G["forem-feed-articles"][article.title] = {id = article.id, url = article.url}
    end
    M.write(bufnr, {"# Your Feed", "", "Press <Enter> in a card to open the article in a new buffer", "and <C-b> to open it in the browser.", ""})
    return M.write(bufnr, feed, 5)
  end
  return api.feed(_11_)
end
M["open-article"] = function(article)
  _G.assert((nil ~= article), "Missing argument article on fnl/forem-nvim/buffer.fnl:102")
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
return M
