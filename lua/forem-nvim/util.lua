local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayReduce = ____lualib.__TS__ArrayReduce
local ____exports = {}
local getOpenCommand
____exports.setLocals = function(values)
    __TS__ArrayForEach(
        values,
        function(____, ____bindingPattern0)
            local value
            local key
            key = ____bindingPattern0[1]
            value = ____bindingPattern0[2]
            local ____value_0 = value
            vim.opt_local[key] = ____value_0
            return ____value_0
        end
    )
end
____exports.getOption = function(option)
    return option.get(option)
end
____exports.isExecutable = function(path) return vim.fn.executable(path) == 1 end
____exports.openUrlOnBrowser = function(url)
    local cmd = getOpenCommand()
    if not cmd then
        vim.api.nvim_err_writeln("Could not find a command to open the URL: $[url]")
        return
    end
    vim.fn.system((cmd .. " ") .. url)
end
getOpenCommand = function()
    if ____exports.isExecutable("xdg-open") then
        return "xdg-open"
    end
    if ____exports.isExecutable("open") then
        return "open"
    end
    if ____exports.isExecutable("start") then
        return "start"
    end
    return nil
end
____exports.pluralize = function(count, singular, plural)
    if count == 1 then
        return singular
    end
    return plural or singular .. "s"
end
____exports.openFloatMenu = function(content, options)
    local width = __TS__ArrayReduce(
        content,
        function(____, acc, line) return math.max(acc, #line) end,
        0
    )
    local bufnr = vim.api.nvim_create_buf(false, true)
    local floatOptions = vim.tbl_extend("keep", options or ({}), {
        relative = "cursor",
        col = 0,
        row = 1,
        style = "minimal",
        width = width,
        border = "rounded",
        height = #content
    })
    local window = vim.api.nvim_open_win(bufnr, false, floatOptions)
    vim.api.nvim_buf_set_lines(
        bufnr,
        0,
        -1,
        true,
        content
    )
    vim.api.nvim_buf_set_name(bufnr, "forem://feed/floatmenu")
    vim.api.nvim_set_option_value("modifiable", false, {buf = bufnr})
    vim.api.nvim_set_option_value("bufhidden", "delete", {buf = bufnr})
    vim.api.nvim_set_option_value("cursorline", true, {win = window})
end
return ____exports
