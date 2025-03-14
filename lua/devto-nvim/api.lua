local M = {}
local notify = require("devto-nvim.notify")
local article = require("devto-nvim.article")

function M.key()
  return vim.env.DEVTO_API_KEY
end

local BASE_URL = "https://dev.to/api"

---@class Response
---@field status number
---@field body table

---@alias Method "GET" | "POST" | "PUT" | "DELETE"

---@param response Response
---@param on_success fun(body: table)
function M.handle_error(response, on_success)
  local start_status = string.sub(response.status, 1, 2)

  if start_status == "20" then
    on_success(response.body)
  else
    local error = response
    if response.body then
      error = response.body
      if response.body.error then
        error = response.body.error
      end
    end
    notify.error("Error: " .. tostring(error))
  end
end

---@param out vim.SystemCompleted
---@return Response
local function system_completed_to_response(out)
  local status_code = nil
  local response_body = nil

  if out.stdout then
    -- Extract status code from headers
    status_code = out.stdout:match("HTTP/%d%.?%d?%s+(%d+)")

    -- Extract the body from the response (everything after the headers)
    response_body = out.stdout:match("\n\n(.*)")
  end

  local body = nil
  -- Only attempt to decode if we have a body
  if response_body and response_body ~= "" then
    -- Protect against JSON decode errors
    body = vim.fn.json_decode(response_body)
  end

  return {
    status = status_code,
    body = body
  }
end

---@param method Method
---@param endpoint string
---@param options table
---@param on_exit fun(response: Response)?
---@return vim.SystemObj
local function curl(method, endpoint, options, on_exit)
  local headers = options.headers or {}
  local request_body = options.body and { "-d", vim.fn.json_encode(options.body) } or {}

  local cmd = vim.iter({
    "curl",
    "-X",
    method,
    "-i", -- Include headers in the output
    vim.tbl_map(function(header)
      return { "-H", header }
    end, headers),
    request_body,
    BASE_URL .. endpoint
  }):flatten(2):totable()

  return vim.system(cmd, { text = true }, function(out)
    vim.schedule(function()
      local response = system_completed_to_response(out)
      if on_exit then
        on_exit(response)
      end
    end)
  end)
end

---@param method Method
---@param endpoint string
---@param options table
---@return Response
local function request(method, endpoint, options)
  local parameters = vim.tbl_extend(
    "force",
    {
      headers = {
        "api-key: " .. M.key(),
        "Content-Type: application/json",
        "Accept: application/vnd.devto.api-v1+json"
      }
    },
    options
  )

  local out = curl(method, endpoint, parameters, nil):wait()
  local response = system_completed_to_response(out)

  return response
end

---@param method Method
---@param endpoint string
---@param on_success fun(body: table)
local function request_async(method, endpoint, on_success)
  local options = {
    headers = {
      "Api-Key: " .. M.key()
    }
  }

  curl(method, endpoint, options, function(response)
    M.handle_error(
      response,
      on_success
    )
  end
  )
end

---@param endpoint string
---@param on_success fun(body: table)
local function get(endpoint, on_success)
  request_async(
    "GET",
    endpoint,
    on_success
  )
end

---@param endpoint string
---@param body table
---@return Response
local function put(endpoint, body)
  return request("PUT", endpoint, { body = body })
end

---@param endpoint string
---@param body table
---@return Response
local function post(endpoint, body)
  return request("POST", endpoint, { body = body })
end

---@param on_success fun(body: table)
function M.my_articles(on_success)
  return get("/articles/me/all", on_success)
end

---@param id number
---@param content string
---@return Response
function M.save_article(id, content)
  return put(
    "/articles/" .. tostring(id),
    { article = { body_markdown = content } }
  )
end

---@param title string
---@return Response
function M.new_article(title)
  return post(
    "/articles",
    { article = { body_markdown = article.get_template(title) } }
  )
end

---@param on_success fun(body: table)
function M.feed(on_success)
  get("/articles", on_success)
end

---@param id number
---@param on_success fun(body: table)
function M.get_article(id, on_success)
  get(
    "/articles/" .. tostring(id),
    on_success
  )
end

---@param path string
---@param on_success fun(body: table)
function M.get_article_by_path(path, on_success)
  get("/articles/" .. path, on_success)
end

return M
