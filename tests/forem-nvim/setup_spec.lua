local M = {}
local stub = require("luassert.stub")
local spy = require("luassert.spy")
local match = require("luassert.match")
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
    local snapshot
    before_each(function()
      vim.env.FOREM_API_KEY = "foo"
      _G.package.loaded["forem-nvim"] = nil
      foremNvim = require("forem-nvim")
      snapshot = assert:snapshot()
    end)
    after_each(function()
      snapshot:revert()
    end)
    it(
      "should show a notification when no api key is set",
      function()
        vim.env.FOREM_API_KEY = nil
        stub.new(vim, "notify")
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
      end
    )
    it(
      "should create a new article and open it",
      function()
        local input = stub.new(vim.fn, "input")
        input.returns("Title")
        local api = mockInternal("forem-nvim.api")
        local apiNewArticle = stub.new(api, "newArticle")
        local newArticle = {
          id = 1,
          body_markdown = article.get_template("Title")
        }
        apiNewArticle.returns({ status = 201, body = newArticle })
        local buffer = mockInternal("forem-nvim.buffer")
        local bufferOpenMyArticle = spy.on(buffer, "openMyArticle")
        local foremNvimMocked = require("forem-nvim")
        foremNvimMocked.new_article()
        assert.stub(apiNewArticle).was.called_with("Title")
        assert.spy(bufferOpenMyArticle).was_called_with(match.is_same(newArticle))
        assert.are.same(
          "forem://my-article/" .. tostring(newArticle.id),
          vim.api.nvim_buf_get_name(0)
        )
        local bufferContent = vim.api.nvim_buf_get_lines(0, 0, -1, true)
        assert.are.same(
          article.get_body_lines(newArticle),
          bufferContent
        )
      end
    )
  end
)
return M
