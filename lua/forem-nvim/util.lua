local M = {}

function M.set_locals(values)
  for key, value in pairs(values) do
    vim.opt_local[key] = value
  end
end

local function is_executable(path)
  return vim.fn.executable(path) == 1
end

local function get_open_command()
  if is_executable("xdg-open") then
    return "xdg-open"
  elseif is_executable("open") then
    return "open"
  elseif is_executable("start") then
    return "start"
  else
    return nil
  end
end

function M.open_url_on_browser(url)
  local cmd = get_open_command()
  if not cmd then
    vim.api.nvim_err_writeln("Could not find a command to open the URL: $[url]")
    return
  end
  vim.fn.system((cmd .. " ") .. url)
end

function M.pluralize(count, singular, plural)
  if count == 1 then
    return singular
  end
  return plural or singular .. "s"
end

function M.open_float_menu(content, options)
  local width = 0
  for _, line in ipairs(content) do
    width = math.max(width, #line)
  end

  local bufnr = vim.api.nvim_create_buf(false, true)
  local float_options = vim.tbl_extend("keep", options or {}, {
    relative = "cursor",
    col = 0,
    row = 1,
    style = "minimal",
    width = width,
    border = "rounded",
    height = #content
  })
  local window = vim.api.nvim_open_win(bufnr, false, float_options)
  vim.api.nvim_buf_set_lines(
    bufnr,
    0,
    -1,
    true,
    content
  )
  vim.api.nvim_buf_set_name(bufnr, "forem://feed/floatmenu")
  vim.api.nvim_set_option_value("modifiable", false, { buf = bufnr })
  vim.api.nvim_set_option_value("bufhidden", "delete", { buf = bufnr })
  vim.api.nvim_set_option_value("cursorline", true, { win = window })
end

return M
