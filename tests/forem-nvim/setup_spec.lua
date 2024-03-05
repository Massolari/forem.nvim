local stub = require("luassert.stub")
local spy = require("luassert.spy")
local function _1_()
  local forem_nvim = nil
  local function _2_()
    vim.env.FOREM_API_KEY = "foo"
    package.loaded["forem-nvim"] = nil
    forem_nvim = require("forem-nvim")
    return forem_nvim.setup()
  end
  before_each(_2_)
  local function _3_()
    vim.env.FOREM_API_KEY = nil
    stub(vim, "notify")
    forem_nvim.my_articles()
    local assert_stub = assert.stub(vim.notify)
    return assert_stub.was.called()
  end
  it("should show a notification when no api key is set", _3_)
  local function _4_()
    package.loaded["forem-nvim"] = nil
    package.loaded["forem-nvim.api"] = nil
    local mocked_api = require("forem-nvim.api")
    local function _5_()
    end
    mocked_api["my-articles"] = spy.new(_5_)
    local forem_nvim_api_mocked = require("forem-nvim")
    forem_nvim_api_mocked.setup()
    forem_nvim_api_mocked.my_articles()
    do
      local api_spy = assert.spy(mocked_api["my-articles"])
      api_spy.was.called()
    end
    package.loaded["forem-nvim.api"] = nil
    return nil
  end
  return it("should call the api to get the articles", _4_)
end
return describe("Setup", _1_)
