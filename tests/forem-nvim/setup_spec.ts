const stub: Stub = require("luassert.stub");
const mock: Mock = require("luassert.mock");
import * as spy from "luassert.spy";
import * as match from "luassert.match";
const article = require("forem-nvim.article");

const mockInternal = (module: string): any => {
  // To check if the api is called, we need to mock the api
  // The first step is to clear the api from the package.loaded table
  _G.package.loaded["forem-nvim"] = undefined;
  _G.package.loaded[module] = undefined;

  // Then we mock the api
  const mocked = require(module);
  return mocked;
};

describe("Forem.nvim", () => {
  let foremNvim: ForemNvim;
  before_each(() => {
    vim.env.FOREM_API_KEY = "foo";
    _G.package.loaded["forem-nvim"] = undefined;
    foremNvim = require("forem-nvim");
  });

  it("should show a notification when no api key is set", () => {
    vim.env.FOREM_API_KEY = undefined;
    stub(vim, "notify");
    foremNvim.my_articles();
    assert.stub(vim.notify).was.called();
  });

  it("should call the api to get the articles", () => {
    // To check if the api is called, we need to mock the api
    // The first step is to clear the api from the package.loaded table
    // _G.package.loaded["forem-nvim"] = undefined;
    // _G.package.loaded["forem-nvim.api"] = undefined;

    // Then we mock the api
    // const mockedApi = require("forem-nvim.api");
    // We need to mock the function that we want to check
    // mockedApi.myArticles = spy.new(() => {});

    const mockedApi = mockInternal("forem-nvim.api");
    mockedApi.myArticles = spy.new(() => {});
    // Now we can require the package that will require the mocked api
    const foremNvimMocked: ForemNvim = require("forem-nvim");
    foremNvimMocked.my_articles();

    // Finally we can check if the function was called
    assert.spy(mockedApi.myArticles).was.called();

    _G.package.loaded["forem-nvim.api"] = undefined;
  });

  it("should create a new article and open it", () => {
    const { input } = vim.fn;
    vim.fn.input = spy.on({ input: (_prompt: string) => "Title" }, "input");
    stub(vim, "cmd");

    const mockedApi = mockInternal("forem-nvim.api");
    mockedApi.newArticle = spy.on(
      {
        newArticle: (title: string) => ({
          status: 201,
          body: { id: 1, body_markdown: article.getTemplate(title) },
        }),
      },
      "newArticle",
    );
    const mockedBuffer = mockInternal("forem-nvim.buffer");
    mockedBuffer.openMyArticle = spy.new(() => {});

    const foremNvimMocked: ForemNvim = require("forem-nvim");
    foremNvimMocked.new_article();

    assert
      .spy(mockedBuffer.openMyArticle)
      .was_called_with(
        match.is_same({ id: 1, body_markdown: article.getTemplate("Title") }),
      );

    vim.fn.input = input;
    _G.package.loaded["forem-nvim.api"] = undefined;
  });
});
