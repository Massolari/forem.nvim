--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local curl = require("plenary.curl")
local job = require("plenary.job")
local notify = require("forem-nvim.notify")
local article = require("forem-nvim.article")
____exports.key = function() return vim.env.FOREM_API_KEY end
local baseUrl = "https://dev.to/api"
local function handleAsyncError(response)
    notify.error("Error: " .. tostring(response.body.error))
end
____exports.handleError = function(response, onSuccess)
    local startStatus = string.sub(response.status, 1, 2)
    local ____temp_0
    if startStatus == "20" then
        ____temp_0 = onSuccess(response.body)
    else
        ____temp_0 = notify.error("Error: " .. tostring(response.body.error))
    end
    return ____temp_0
end
local function request(requestFunction, endpoint, options)
    local parameters = vim.tbl_extend(
        "force",
        {
            url = baseUrl .. endpoint,
            headers = {
                ["api-key"] = ____exports.key(),
                content_type = "application/json",
                accept = "application/vnd.forem.api-v1+json"
            }
        },
        options
    )
    local response = requestFunction(parameters)
    if response.body then
        return vim.tbl_extend(
            "force",
            response,
            {body = vim.fn.json_decode(response.body)}
        )
    end
    return response
end
local function requestAsync(method, endpoint, options, onSuccess, onError)
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
            "api-key: " .. tostring(____exports.key()),
            "-d",
            vim.fn.json_encode(options),
            baseUrl .. endpoint
        },
        on_exit = function(job, code)
            vim.schedule(function()
                local result = table.concat(
                    job:result(),
                    "\n"
                )
                local response = vim.fn.json_decode(result)
                if code == 0 then
                    onSuccess(response)
                    return
                end
                handleAsyncError(response)
                if onError then
                    onError(response)
                end
            end)
        end
    }):start()
end
local function get(endpoint, onSuccess, onError)
    return requestAsync(
        "GET",
        endpoint,
        {},
        onSuccess,
        onError
    )
end
local function put(endpoint, body)
    return request(curl.put, endpoint, {body = body})
end
local function post(endpoint, body)
    return request(curl.post, endpoint, {body = body})
end
____exports.myArticles = function(onSuccess, onError) return get("/articles/me/all", onSuccess, onError) end
____exports.saveArticle = function(id, content) return put(
    "/articles/" .. tostring(id),
    vim.fn.json_encode({article = {body_markdown = content}})
) end
____exports.newArticle = function(title) return post(
    "/articles",
    vim.fn.json_encode({article = {body_markdown = article.getTemplate(title)}})
) end
____exports.feed = function(onSuccess, onError) return get("/articles", onSuccess, onError) end
____exports.getArticle = function(id, onSuccess, onError) return get(
    "/articles/" .. tostring(id),
    onSuccess,
    onError
) end
____exports.getArticleByPath = function(path, onSuccess, onError) return get("/articles/" .. path, onSuccess, onError) end
return ____exports
