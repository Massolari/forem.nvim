local M = {}
local _local_1_ = require("forem-nvim.util")
local get_plural = _local_1_["get-plural"]
local new_line = "\n"
M["get-body-lines"] = function(article)
  _G.assert((nil ~= article), "Missing argument article on fnl/forem-nvim/article.fnl:6")
  return vim.split(article.body_markdown, new_line)
end
local function tags_to_str(tags)
  _G.assert((nil ~= tags), "Missing argument tags on fnl/forem-nvim/article.fnl:9")
  local function _2_(tag)
    return ("#" .. tag)
  end
  return vim.fn.join(vim.tbl_map(_2_, tags), ", ")
end
M["format-to-feed"] = function(article, max_columns)
  _G.assert((nil ~= max_columns), "Missing argument max-columns on fnl/forem-nvim/article.fnl:14")
  _G.assert((nil ~= article), "Missing argument article on fnl/forem-nvim/article.fnl:14")
  return {("\240\159\173\189" .. string.rep("\226\150\148", max_columns) .. "\240\159\173\190"), (" ## " .. article.title), (" " .. article.description), "\226\150\143", (" \240\159\149\146 " .. article.reading_time_minutes .. " " .. get_plural(article.reading_time_minutes, "minute") .. " of reading time"), (" Tags: " .. tags_to_str(article.tag_list)), (" \240\159\146\149" .. tostring(article.positive_reactions_count) .. " \240\159\146\172" .. tostring(article.comments_count)), (" \240\159\147\134" .. article.readable_publish_date), "\226\150\143", ("\240\159\173\188" .. string.rep("\226\150\129", max_columns) .. "\240\159\173\191"), ""}
end
return M
