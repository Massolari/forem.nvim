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
M["my-articles"] = function(api_key)
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:38")
  return get(api_key, "/articles/me/all")
end
M["save-article"] = function(api_key, id, content)
  _G.assert((nil ~= content), "Missing argument content on fnl/forem-nvim/api.fnl:41")
  _G.assert((nil ~= id), "Missing argument id on fnl/forem-nvim/api.fnl:41")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:41")
  return put(api_key, ("/articles/" .. id), vim.fn.json_encode({article = {body_markdown = content}}))
end
M["new-article"] = function(api_key, title)
  _G.assert((nil ~= title), "Missing argument title on fnl/forem-nvim/api.fnl:45")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:45")
  return post(api_key, "/articles", vim.fn.json_encode({article = {body_markdown = get_article_template(title)}}))
end
M.feed = function(api_key)
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:49")
  return get(api_key, "/articles")
end
M["get-article"] = function(api_key, id)
  _G.assert((nil ~= id), "Missing argument id on fnl/forem-nvim/api.fnl:52")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:52")
  return get(api_key, ("/articles/" .. id))
end
M["get-article-by-path"] = function(api_key, path)
  _G.assert((nil ~= path), "Missing argument path on fnl/forem-nvim/api.fnl:55")
  _G.assert((nil ~= api_key), "Missing argument api-key on fnl/forem-nvim/api.fnl:55")
  return get(api_key, ("/articles/" .. path))
end
return M
