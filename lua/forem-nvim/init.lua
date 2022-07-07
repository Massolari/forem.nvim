local api = require("forem-nvim.api")
local buffer = require("forem-nvim.buffer")
local notify = require("forem-nvim.notify")
local picker = require("forem-nvim.picker")
local util = require("forem-nvim.util")
local M = {}
local function handle_api_error(response, on_success)
  _G.assert((nil ~= on_success), "Missing argument on-success on fnl/forem-nvim/init.fnl:11")
  _G.assert((nil ~= response), "Missing argument response on fnl/forem-nvim/init.fnl:11")
  local start_status = string.sub(tostring(response.status), 1, 2)
  if (start_status ~= "20") then
    return notify.error(("An error occurred: " .. response.body.error))
  else
    return on_success(response)
  end
end
local function my_articles(api_key)
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/init.fnl:17")
  local function _2_()
    local response = api["my-articles"](api_key)
    local function _3_(res)
      return picker["my-articles"](res.body)
    end
    return handle_api_error(response, _3_)
  end
  return _2_
end
local function save_article(api_key)
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/init.fnl:24")
  local content, bufnr = buffer["get-content"]()
  local id = vim.fn.expand("%:t")
  local response = api["save-article"](api_key, id, content)
  local function _4_()
    notify.info("Article saved!")
    return vim.api.nvim_buf_set_option(bufnr, "modified", false)
  end
  return handle_api_error(response, _4_)
end
local function new_article(api_key)
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/init.fnl:33")
  local function _5_()
    local status, title = pcall(vim.fn.input, "New article's title: ")
    if (status and (title ~= "")) then
      local response = api["new-article"](api_key, title)
      local function _6_(res)
        return buffer["open-my-article"](res.body)
      end
      return handle_api_error(response, _6_)
    else
      return nil
    end
  end
  return _5_
end
local function feed(api_key)
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/init.fnl:42")
  local function _8_()
    local response = api.feed(api_key)
    local function _9_(res)
      return buffer["open-feed"](res.body)
    end
    return handle_api_error(response, _9_)
  end
  return _8_
end
local function seek_feed_title(line_number, get_next_line_number, count)
  _G.assert((nil ~= count), "Missing argument count on fnl/forem-nvim/init.fnl:49")
  _G.assert((nil ~= get_next_line_number), "Missing argument get-next-line-number on fnl/forem-nvim/init.fnl:49")
  _G.assert((nil ~= line_number), "Missing argument line-number on fnl/forem-nvim/init.fnl:49")
  local line_content = vim.fn.getline(line_number)
  local _3ftitle = string.match(line_content, " ## (.+)", 1)
  vim.pretty_print({["line-content"] = line_content, ["line-number"] = line_number, ["?title"] = _3ftitle})
  if _3ftitle then
    return _3ftitle
  elseif (count > 1000) then
    return notify.error("Could not find title")
  else
    return seek_feed_title(get_next_line_number(line_number), get_next_line_number, (count + 1))
  end
end
local function get_card_title(line_number)
  _G.assert((nil ~= line_number), "Missing argument line-number on fnl/forem-nvim/init.fnl:60")
  local line_content = vim.fn.getline(line_number)
  local is_card_upper_border_3f = string.match(line_content, "\240\159\173\189", 1)
  local is_out_of_card_3f = not string.match(line_content, "^[ |\240\159\173\189|\226\150\143|\240\159\173\188]", 1)
  if is_out_of_card_3f then
    return nil
  else
    local _11_
    if is_card_upper_border_3f then
      local function _12_(n)
        return (n + 1)
      end
      _11_ = _12_
    else
      local function _13_(n)
        return (n - 1)
      end
      _11_ = _13_
    end
    return seek_feed_title(line_number, _11_, 0)
  end
end
local function open_feed_article(api_key, location)
  _G.assert((nil ~= location), "Missing argument location on fnl/forem-nvim/init.fnl:73")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/init.fnl:73")
  local title = get_card_title(vim.fn.line("."))
  local _3farticle_data = (_G["forem-feed-articles"])[title]
  if title then
    if _3farticle_data then
      if (location == "browser") then
        return util["open-browser-url"](_3farticle_data.url)
      else
        local response = api["get-article"](api_key, _3farticle_data.id)
        local function _16_(res)
          return buffer["open-article"](res.body)
        end
        return handle_api_error(response, _16_)
      end
    else
      return notify.error("Could not find article data. Please reopen the feed.")
    end
  else
    return nil
  end
end
local function open_by_url(api_key)
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/init.fnl:86")
  local function _20_()
    local status, url = pcall(vim.fn.input, "Article's URL: ")
    if (status and (url ~= "")) then
      local path = string.match(url, "(%w+/[%w|-]+)$")
      if path then
        local response = api["get-article-by-path"](api_key, path)
        local function _21_(res)
          return buffer["open-article"](res.body)
        end
        return handle_api_error(response, _21_)
      else
        return notify.error(("This URL is not valid: " .. url))
      end
    else
      return nil
    end
  end
  return _20_
end
local forem_group = vim.api.nvim_create_augroup("forem_autocmds", {clear = true})
local function autocmds(api_key)
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/init.fnl:102")
  local function _24_()
    return save_article(api_key)
  end
  vim.api.nvim_create_autocmd({"BufWriteCmd"}, {group = forem_group, pattern = "forem://my-article/*", callback = _24_})
  local function _25_()
    local function _26_()
      return open_feed_article(api_key, "buffer")
    end
    return vim.keymap.set("n", "<CR>", _26_, {buffer = true, silent = true})
  end
  vim.api.nvim_create_autocmd({"BufEnter"}, {group = forem_group, pattern = "forem://*/feed", callback = _25_})
  local function _27_()
    local function _28_()
      return open_feed_article(api_key, "browser")
    end
    return vim.keymap.set("n", "<C-b>", _28_, {buffer = true, silent = true})
  end
  return vim.api.nvim_create_autocmd({"BufEnter"}, {group = forem_group, pattern = "forem://*/feed", callback = _27_})
end
local function setup(options)
  _G.assert((nil ~= options), "Missing argument options on fnl/forem-nvim/init.fnl:126")
  autocmds(options.api_key)
  M.my_articles = my_articles(options.api_key)
  M.new_article = new_article(options.api_key)
  M.feed = feed(options.api_key)
  M.open_by_url = open_by_url(options.api_key)
  return nil
end
local function _29_(options)
  _G.assert((nil ~= options), "Missing argument options on fnl/forem-nvim/init.fnl:133")
  if not options.api_key then
    return notify.error("forem.nvim: api_key is required on setup")
  else
    return setup(options)
  end
end
M.setup = _29_
return M
