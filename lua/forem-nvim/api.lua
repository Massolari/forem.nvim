local curl = require("plenary.curl")
local notify = require("forem-nvim.notify")
local job = require("plenary.job")
local M = {}
local base_url = "https://dev.to/api"
M.key = function()
  return vim.env.FOREM_API_KEY
end
local function handle_async_error(response)
  _G.assert((nil ~= response), "Missing argument response on fnl/forem-nvim/api.fnl:10")
  return notify.error(("Error: " .. response.body.error))
end
local function get_article_template(title)
  _G.assert((nil ~= title), "Missing argument title on fnl/forem-nvim/api.fnl:13")
  return string.format("---\ntitle: %s\npublished: false\ndescription:\ntags:\n# cover_image: https://direct_url_to_image.jpg\n# Use a ratio of 100:42 for best results.\n---\n\n", title)
end
local function request(request_fun, endpoint, options)
  _G.assert((nil ~= options), "Missing argument options on fnl/forem-nvim/api.fnl:25")
  _G.assert((nil ~= endpoint), "Missing argument endpoint on fnl/forem-nvim/api.fnl:25")
  _G.assert((nil ~= request_fun), "Missing argument request-fun on fnl/forem-nvim/api.fnl:25")
  local parameters = vim.tbl_extend("force", {url = (base_url .. endpoint), headers = {["api-key"] = M.key, content_type = "application/json", accept = "application/vnd.forem.api-v1+json"}}, options)
  local response = request_fun(parameters)
  if response.body then
    return vim.tbl_extend("force", response, {body = vim.fn.json_decode(response.body)})
  else
    return response
  end
end
local function request_async(method, endpoint, options, on_success, _3fon_error)
  _G.assert((nil ~= on_success), "Missing argument on-success on fnl/forem-nvim/api.fnl:38")
  _G.assert((nil ~= options), "Missing argument options on fnl/forem-nvim/api.fnl:38")
  _G.assert((nil ~= endpoint), "Missing argument endpoint on fnl/forem-nvim/api.fnl:38")
  _G.assert((nil ~= method), "Missing argument method on fnl/forem-nvim/api.fnl:38")
  local function _2_(this, code)
    local function _3_()
      local results = this:result()
      local result = vim.fn.join(results, "\n")
      local response = vim.fn.json_decode(result)
      if (code == 0) then
        return on_success(response)
      else
        handle_async_error(response)
        if _3fon_error then
          return _3fon_error(response)
        else
          return nil
        end
      end
    end
    return vim.schedule(_3_)
  end
  return job:new({command = "curl", args = {"-X", method, "-H", "Content-Type: application/json", "-H", "Accept: application/vnd.forem.api-v1+json", "-H", ("api-key: " .. M.key()), "-d", vim.fn.json_encode(options), (base_url .. endpoint)}, on_exit = _2_}):start()
end
local function get(endpoint, on_sucess, _3fon_error)
  _G.assert((nil ~= on_sucess), "Missing argument on-sucess on fnl/forem-nvim/api.fnl:63")
  _G.assert((nil ~= endpoint), "Missing argument endpoint on fnl/forem-nvim/api.fnl:63")
  return request_async("GET", endpoint, {}, on_sucess, _3fon_error)
end
local function put(endpoint, body)
  _G.assert((nil ~= body), "Missing argument body on fnl/forem-nvim/api.fnl:66")
  _G.assert((nil ~= endpoint), "Missing argument endpoint on fnl/forem-nvim/api.fnl:66")
  return request(curl.put, endpoint, {body = body})
end
local function post(endpoint, body)
  _G.assert((nil ~= body), "Missing argument body on fnl/forem-nvim/api.fnl:69")
  _G.assert((nil ~= endpoint), "Missing argument endpoint on fnl/forem-nvim/api.fnl:69")
  return request(curl.post, endpoint, {body = body})
end
M["my-articles"] = function(on_success, _3fon_error)
  _G.assert((nil ~= on_success), "Missing argument on-success on fnl/forem-nvim/api.fnl:72")
  return get("/articles/me/all", on_success, _3fon_error)
end
M["save-article"] = function(id, content)
  _G.assert((nil ~= content), "Missing argument content on fnl/forem-nvim/api.fnl:75")
  _G.assert((nil ~= id), "Missing argument id on fnl/forem-nvim/api.fnl:75")
  return put(("/articles/" .. id), vim.fn.json_encode({article = {body_markdown = content}}))
end
M["new-article"] = function(title)
  _G.assert((nil ~= title), "Missing argument title on fnl/forem-nvim/api.fnl:79")
  return post("/articles", vim.fn.json_encode({article = {body_markdown = get_article_template(title)}}))
end
M.feed = function(on_success, _3fon_error)
  _G.assert((nil ~= on_success), "Missing argument on-success on fnl/forem-nvim/api.fnl:83")
  return get("/articles", on_success, _3fon_error)
end
M["get-article"] = function(id, on_success, _3fon_error)
  _G.assert((nil ~= on_success), "Missing argument on-success on fnl/forem-nvim/api.fnl:86")
  _G.assert((nil ~= id), "Missing argument id on fnl/forem-nvim/api.fnl:86")
  return get(("/articles/" .. id), on_success, _3fon_error)
end
M["get-article-by-path"] = function(path, on_success, _3fon_error)
  _G.assert((nil ~= on_success), "Missing argument on-success on fnl/forem-nvim/api.fnl:89")
  _G.assert((nil ~= path), "Missing argument path on fnl/forem-nvim/api.fnl:89")
  return get(("/articles/" .. path), on_success, _3fon_error)
end
M["handle-api-error"] = function(response, on_success)
  _G.assert((nil ~= on_success), "Missing argument on-success on fnl/forem-nvim/api.fnl:92")
  _G.assert((nil ~= response), "Missing argument response on fnl/forem-nvim/api.fnl:92")
  local start_status = string.sub(tostring(response.status), 1, 2)
  if (start_status ~= "20") then
    return notify.error(("Error: " .. response.body.error))
  else
    return on_success(response)
  end
end
return M
