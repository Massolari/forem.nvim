local M = {}
M.fold = function(fun, init, list)
  _G.assert((nil ~= list), "Missing argument list on fnl/forem-nvim/util.fnl:3")
  _G.assert((nil ~= init), "Missing argument init on fnl/forem-nvim/util.fnl:3")
  _G.assert((nil ~= fun), "Missing argument fun on fnl/forem-nvim/util.fnl:3")
  local acc = init
  for _, el in pairs(list) do
    acc = fun(el, acc)
  end
  return acc
end
M["set-local"] = function(opt, val)
  _G.assert((nil ~= val), "Missing argument val on fnl/forem-nvim/util.fnl:9")
  _G.assert((nil ~= opt), "Missing argument opt on fnl/forem-nvim/util.fnl:9")
  do end (vim.opt_local)[opt] = val
  return nil
end
M["set-locals"] = function(opt_vals)
  _G.assert((nil ~= opt_vals), "Missing argument opt-vals on fnl/forem-nvim/util.fnl:12")
  for _, _1_ in pairs(opt_vals) do
    local _each_2_ = _1_
    local opt = _each_2_[1]
    local val = _each_2_[2]
    M["set-local"](opt, val)
  end
  return nil
end
M["is-executable?"] = function(file)
  _G.assert((nil ~= file), "Missing argument file on fnl/forem-nvim/util.fnl:16")
  return (1 == vim.fn.executable(file))
end
M["open-browser-url"] = function(url)
  _G.assert((nil ~= url), "Missing argument url on fnl/forem-nvim/util.fnl:19")
  local _3fcmd
  if M["is-executable?"]("xdg-open") then
    _3fcmd = "xdg-open"
  elseif M["is-executable?"]("open") then
    _3fcmd = "open"
  elseif M["is-executable?"]("start") then
    _3fcmd = "start"
  else
    _3fcmd = nil
  end
  if _3fcmd then
    return vim.cmd((":!" .. _3fcmd .. " " .. url))
  else
    return print(("Could not find a command to open the URL: " .. url))
  end
end
M["get-plural"] = function(count, noun, _3fplural)
  _G.assert((nil ~= noun), "Missing argument noun on fnl/forem-nvim/util.fnl:28")
  _G.assert((nil ~= count), "Missing argument count on fnl/forem-nvim/util.fnl:28")
  if (1 == count) then
    return noun
  else
    if _3fplural then
      return _3fplural
    else
      return (noun .. "s")
    end
  end
end
return M
