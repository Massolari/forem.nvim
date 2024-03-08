import * as stub from "luassert.stub";
import * as mock from "luassert.mock";
import * as spy from "luassert.spy";
import * as match from "luassert.match";
const article = require("forem-nvim.article");

const mockInternal = (module: string): any => {
  _G.package.loaded["forem-nvim"] = undefined;
  _G.package.loaded[module] = undefined;

  const mocked = require(module);
  return mocked;
};

describe("Forem.nvim", () => {
  let foremNvim: ForemNvim;
  let snapshot: Snapshot;
  before_each(() => {
    vim.env.FOREM_API_KEY = "foo";
    _G.package.loaded["forem-nvim"] = undefined;
    foremNvim = require("forem-nvim");
    snapshot = assert.snapshot();
  });

  after_each(() => {
    snapshot.revert();
  });

  it("should show a notification when no api key is set", () => {
    vim.env.FOREM_API_KEY = undefined;
    stub.new(vim, "notify");
    foremNvim.my_articles();
    assert.stub(vim.notify).was.called();
  });

  it("should call the api to get the articles", function () {
    const mockedApi = mockInternal("forem-nvim.api");
    mockedApi.myArticles = spy.new(() => {});

    const foremNvimMocked: ForemNvim = require("forem-nvim");
    foremNvimMocked.my_articles();

    assert.spy(mockedApi.myArticles).was.called();
  });

  it("should create a new article and open it", function () {
    const input = stub.new(vim.fn, "input");
    input.returns("Title");

    const api = mockInternal("forem-nvim.api");
    const apiNewArticle = stub.new(api, "newArticle");

    const newArticle = { id: 1, body_markdown: article.getTemplate("Title") };
    apiNewArticle.returns({
      status: 201,
      body: newArticle,
    });

    const buffer = mockInternal("forem-nvim.buffer");
    const bufferOpenMyArticle = spy.on(buffer, "openMyArticle");

    const foremNvimMocked: ForemNvim = require("forem-nvim");
    foremNvimMocked.new_article();

    // Check if the API function was called correctly
    assert.stub(apiNewArticle).was.called_with("Title");

    // Check if the buffer function was called correctly
    assert.spy(bufferOpenMyArticle).was_called_with(match.is_same(newArticle));

    // Check if the buffer name is correct
    assert.are.same(
      `forem://my-article/${newArticle.id}`,
      vim.api.nvim_buf_get_name(0),
    );

    // Check if the buffer content is correct
    const bufferContent = vim.api.nvim_buf_get_lines(0, 0, -1, true);
    assert.are.same(article.getBodyLines(newArticle), bufferContent);
  });
});
