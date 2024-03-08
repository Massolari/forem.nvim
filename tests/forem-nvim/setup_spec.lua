--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local spy = require("luassert.spy")
local match = require("luassert.match")
local stub = require("luassert.stub")
local mock = require("luassert.mock")
local article = require("forem-nvim.article")
local function mockInternal(module)
    _G.package.loaded["forem-nvim"] = nil
    _G.package.loaded[module] = nil
    local mocked = require(module)
    return mocked
end
describe(
    "Forem.nvim",
    function()
        local foremNvim
        before_each(function()
            vim.env.FOREM_API_KEY = "foo"
            _G.package.loaded["forem-nvim"] = nil
            foremNvim = require("forem-nvim")
        end)
        it(
            "should show a notification when no api key is set",
            function()
                vim.env.FOREM_API_KEY = nil
                stub(vim, "notify")
                foremNvim.my_articles()
                assert.stub(vim.notify).was.called()
            end
        )
        it(
            "should call the api to get the articles",
            function()
                local mockedApi = mockInternal("forem-nvim.api")
                mockedApi.myArticles = spy.new(function()
                end)
                local foremNvimMocked = require("forem-nvim")
                foremNvimMocked.my_articles()
                assert.spy(mockedApi.myArticles).was.called()
                _G.package.loaded["forem-nvim.api"] = nil
            end
        )
        it(
            "should create a new article and open it",
            function()
                local ____vim_fn_0 = vim.fn
                local input = ____vim_fn_0.input
                vim.fn.input = spy.on(
                    {input = function(_prompt) return "Title" end},
                    "input"
                )
                stub(vim, "cmd")
                local mockedApi = mockInternal("forem-nvim.api")
                mockedApi.newArticle = spy.on(
                    {newArticle = function(title) return {
                        status = 201,
                        body = {
                            id = 1,
                            body_markdown = article.getTemplate(title)
                        }
                    } end},
                    "newArticle"
                )
                local mockedBuffer = mockInternal("forem-nvim.buffer")
                mockedBuffer.openMyArticle = spy.new(function()
                end)
                local foremNvimMocked = require("forem-nvim")
                foremNvimMocked.new_article()
                assert.spy(mockedBuffer.openMyArticle).was_called_with(match.is_same({
                    id = 1,
                    body_markdown = article.getTemplate("Title")
                }))
                vim.fn.input = input
                _G.package.loaded["forem-nvim.api"] = nil
            end
        )
    end
)
return ____exports
