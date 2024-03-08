--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local actions = require("telescope.actions")
local actionState = require("telescope.actions.state")
local finders = require("telescope.finders")
local pickers = require("telescope.pickers")
local previewers = require("telescope.previewers")
local buffer = require("forem-nvim.buffer")
local ____article = require("forem-nvim.article")
local getBodyLines = ____article.getBodyLines
local ____telescope_2Econfig = require("telescope.config")
local configValues = ____telescope_2Econfig.values
local function myArticlesPicker(articles)
    return pickers.new(
        {},
        {
            prompt_title = "My Articles",
            finder = finders.new_table({
                results = articles,
                entry_maker = function(article)
                    return {value = article, display = article.title, type_of = article.type_of, ordinal = article.title}
                end
            }),
            previewer = previewers.new_buffer_previewer({
                title = "Article Preview",
                dyn_title = function(_, entry) return entry.display end,
                define_preview = function(____self, entry)
                    if ____self.state.bufname then
                        return
                    end
                    local body = getBodyLines(entry.value)
                    vim.api.nvim_set_option_value("filetype", "markdown", {buf = ____self.state.bufnr})
                    buffer.write(____self.state.bufnr, body)
                end,
                get_buffer_by_name = function(_self, entry) return entry.value.slug end
            }),
            sorter = configValues.prefilter_sorter({
                tag = "type_of",
                sorter = configValues.generic_sorter({})
            }),
            attach_mappings = function(prompt_bufnr) return actions.select_default:replace(function()
                local selection = actionState.get_selected_entry(prompt_bufnr)
                actions.close(prompt_bufnr)
                buffer.openMyArticle(selection.value)
            end) end
        }
    )
end
____exports.myArticles = function(articles)
    myArticlesPicker(articles):find()
end
return ____exports
