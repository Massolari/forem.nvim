--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.getBodyLines = function(article) return vim.split(article.body_markdown or "", "\n") end
____exports.getTemplate = function(title) return ("---\ntitle: " .. title) .. "\npublished: false\ndescription:\ntags:\n# cover_image: https://direct_url_to_image.jpg\n# Use a ratio of 100:42 for best results.\n---\n\n" end
return ____exports
