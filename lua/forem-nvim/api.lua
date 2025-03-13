local M = {}
local curl = require("plenary.curl")
local job = require("plenary.job")
local notify = require("forem-nvim.notify")
local article = require("forem-nvim.article")

function M.key()
  return vim.env.FOREM_API_KEY
end

local BASE_URL = "https://dev.to/api"

local function handle_async_error(response)
  notify.error("Error: " .. tostring(response.body.error))
end

function M.handle_error(response, on_success)
  local start_status = string.sub(response.status, 1, 2)

  if start_status == "20" then
    on_success(response.body)
  else
    notify.error("Error: " .. tostring(response.body.error))
  end
end

local function request(request_function, endpoint, options)
  local parameters = vim.tbl_extend(
    "force",
    {
      url = BASE_URL .. endpoint,
      headers = {
        ["api-key"] = M.key(),
        content_type = "application/json",
        accept = "application/vnd.forem.api-v1+json"
      }
    },
    options
  )
  local response = request_function(parameters)
  if response.body then
    return vim.tbl_extend(
      "force",
      response,
      { body = vim.fn.json_decode(response.body) }
    )
  end
  return response
end

local function request_async(method, endpoint, options, on_success, on_error)
  -- TODO: Check if this could be done with `vim.system`
  return job:new({
    command = "curl",
    args = {
      "-X",
      method,
      "-H",
      "Content-Type: application/json",
      "-H",
      "Accept: application/vnd.forem.api-v1+json",
      "-H",
      "api-key: " .. tostring(M.key()),
      "-d",
      vim.fn.json_encode(options),
      BASE_URL .. endpoint
    },
    on_exit = function(this_job, code)
      vim.schedule(function()
        local result = table.concat(
          this_job:result(),
          "\n"
        )
        local response = vim.fn.json_decode(result)
        if code == 0 then
          on_success(response)
          return
        end
        handle_async_error(response)
        if on_error then
          on_error(response)
        end
      end)
    end
  }):start()
end

local function get(endpoint, on_success, on_error)
  return request_async(
    "GET",
    endpoint,
    {},
    on_success,
    on_error
  )
end

local function put(endpoint, body)
  return request(curl.put, endpoint, { body = body })
end

local function post(endpoint, body)
  return request(curl.post, endpoint, { body = body })
end

function M.my_articles(on_success, on_error) return get("/articles/me/all", on_success, on_error) end

function M.save_article(id, content)
  return put(
    "/articles/" .. tostring(id),
    vim.fn.json_encode({ article = { body_markdown = content } })
  )
end

function M.new_article(title)
  return post(
    "/articles",
    vim.fn.json_encode({ article = { body_markdown = article.get_template(title) } })
  )
end

function M.feed(on_success, on_error) return get("/articles", on_success, on_error) end

function M.get_article(id, on_success, on_error)
  return get(
    "/articles/" .. tostring(id),
    on_success,
    on_error
  )
end

function M.get_article_by_path(path, on_success, on_error) return get("/articles/" .. path, on_success, on_error) end

return M
