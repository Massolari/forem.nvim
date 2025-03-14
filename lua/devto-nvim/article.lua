--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local M = {}

-- TODO: Create class for Article

function M.get_body_lines(article)
  return vim.split(article.body_markdown or "", "\n")
end

function M.get_template(title)
  return ("---\ntitle: " .. title) ..
      "\npublished: false\ndescription:\ntags:\n# cover_image: https://direct_url_to_image.jpg\n# Use a ratio of 100:42 for best results.\n---\n\n"
end

return M
