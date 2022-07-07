local curl = require("plenary.curl")
local M = {}
local base_url = "https://dev.to/api"
local function get_article_template(title)
  _G.assert((nil ~= title), "Missing argument title on fnl/forem-nvim/api.fnl:5")
  return string.format("---\ntitle: %s\npublished: false\ndescription: \ntags:\n# cover_image: https://direct_url_to_image.jpg\n# Use a ratio of 100:42 for best results.\n---\n\n", title)
end
local function request(request_fun, api_key, endpoint, options)
  _G.assert((nil ~= options), "Missing argument options on fnl/forem-nvim/api.fnl:17")
  _G.assert((nil ~= endpoint), "Missing argument endpoint on fnl/forem-nvim/api.fnl:17")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:17")
  _G.assert((nil ~= request_fun), "Missing argument request-fun on fnl/forem-nvim/api.fnl:17")
  local parameters = vim.tbl_extend("force", {url = (base_url .. endpoint), headers = {["api-key"] = api_key, content_type = "application/json"}}, options)
  local response = request_fun(parameters)
  if response.body then
    return vim.tbl_extend("force", response, {body = vim.fn.json_decode(response.body)})
  else
    return response
  end
end
local function get(api_key, endpoint)
  _G.assert((nil ~= endpoint), "Missing argument endpoint on fnl/forem-nvim/api.fnl:29")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:29")
  return request(curl.get, api_key, endpoint, {})
end
local function put(api_key, endpoint, body)
  _G.assert((nil ~= body), "Missing argument body on fnl/forem-nvim/api.fnl:32")
  _G.assert((nil ~= endpoint), "Missing argument endpoint on fnl/forem-nvim/api.fnl:32")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:32")
  return request(curl.put, api_key, endpoint, {body = body})
end
local function post(api_key, endpoint, body)
  _G.assert((nil ~= body), "Missing argument body on fnl/forem-nvim/api.fnl:35")
  _G.assert((nil ~= endpoint), "Missing argument endpoint on fnl/forem-nvim/api.fnl:35")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:35")
  return request(curl.post, api_key, endpoint, {body = body})
end
local function _2_(api_key)
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:38")
  return get(api_key, "/articles/me/all")
end
M["my-articles"] = _2_
local function _3_(api_key, id, content)
  _G.assert((nil ~= content), "Missing argument content on fnl/forem-nvim/api.fnl:42")
  _G.assert((nil ~= id), "Missing argument id on fnl/forem-nvim/api.fnl:42")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:42")
  return put(api_key, ("/articles/" .. id), vim.fn.json_encode({article = {body_markdown = content}}))
end
M["save-article"] = _3_
local function _4_(api_key, title)
  _G.assert((nil ~= title), "Missing argument title on fnl/forem-nvim/api.fnl:47")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:47")
  return post(api_key, "/articles", vim.fn.json_encode({article = {body_markdown = get_article_template(title)}}))
end
M["new-article"] = _4_
local function _5_(api_key)
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:51")
  return get(api_key, "/articles")
end
M.feed = _5_
local function _6_(api_key, id)
  _G.assert((nil ~= id), "Missing argument id on fnl/forem-nvim/api.fnl:55")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:55")
  return get(api_key, ("/articles/" .. id))
end
M["get-article"] = _6_
local function _7_(api_key, path)
  _G.assert((nil ~= path), "Missing argument path on fnl/forem-nvim/api.fnl:59")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:59")
  return get(api_key, ("/articles/" .. path))
end
M["get-article-by-path"] = _7_
return M
