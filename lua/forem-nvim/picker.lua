local pickers = require("telescope.pickers")
local finders = require("telescope.finders")
local previewers = require("telescope.previewers")
local actions = require("telescope.actions")
local action_state = require("telescope.actions.state")
local conf = (require("telescope.config")).values
local Article = require("forem-nvim.article")
local buffer = require("forem-nvim.buffer")
local M = {}
local function my_articles_picker(articles)
  _G.assert((nil ~= articles), "Missing argument articles on fnl/forem-nvim/picker.fnl:11")
  local function _1_(article)
    return {value = article, display = article.title, type_of = article.type_of, ordinal = (tostring(article.published_at) .. article.title)}
  end
  local function _2_(_, entry)
    return entry.display
  end
  local function _3_(self, entry)
    if not self.state.bufname then
      local article = entry.value
      local article_body = Article["get-body-lines"](article)
      local bufnr = self.state.bufnr
      vim.api.nvim_buf_set_option(bufnr, "filetype", "markdown")
      return buffer.write(bufnr, article_body)
    else
      return nil
    end
  end
  local function _5_(_, entry)
    return entry.value.slug
  end
  local function _6_(prompt_bufnr, _)
    local function _7_()
      local selection = action_state.get_selected_entry(prompt_bufnr)
      actions.close(prompt_bufnr)
      return buffer["open-my-article"](selection.value)
    end
    return (actions.select_default):replace(_7_)
  end
  return pickers.new({}, {prompt_title = "My Articles", finder = finders.new_table({results = articles, entry_maker = _1_}), previewer = previewers.new_buffer_previewer({title = "Article Preview", dyn_title = _2_, define_preview = _3_, get_buffer_by_name = _5_}), sorter = conf.prefilter_sorter({tag = "type_of", sorter = conf.generic_sorter({})}), attach_mappings = _6_})
end
M["my-articles"] = function(articles)
  _G.assert((nil ~= articles), "Missing argument articles on fnl/forem-nvim/picker.fnl:47")
  return my_articles_picker(articles):find()
end
return M
