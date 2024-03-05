(local stub (require :luassert.stub))
(local spy (require :luassert.spy))

(describe :Setup
          (fn []
            (var forem-nvim nil)
            (before_each (fn []
                           (set vim.env.FOREM_API_KEY :foo)
                           (set package.loaded.forem-nvim nil)
                           (set forem-nvim (require :forem-nvim))
                           (forem-nvim.setup)))
            (it "should show a notification when no api key is set"
                (fn []
                  ;; Clear the api key
                  (set vim.env.FOREM_API_KEY nil)
                  (stub vim :notify)
                  (forem-nvim.my_articles)
                  (let [assert-stub (assert.stub vim.notify)]
                    (assert-stub.was.called))))
            (it "should call the api to get the articles"
                (fn []
                  ;; To check if the api is called, we need to mock the api
                  ;; The first step is to clear the api from the package.loaded table
                  (set package.loaded.forem-nvim nil)
                  (tset package.loaded :forem-nvim.api nil)
                  ;; Then we can mock the api
                  (local mocked-api (require :forem-nvim.api))
                  ;; We need to mock the function that we want to check
                  (set mocked-api.my-articles (spy.new (fn [])))
                  ;; Then we can require the package
                  (local forem-nvim-api-mocked (require :forem-nvim))
                  (forem-nvim-api-mocked.setup)
                  (forem-nvim-api-mocked.my_articles)
                  ;; Finally we can check if the function was called
                  (let [api-spy (assert.spy mocked-api.my-articles)]
                    (api-spy.was.called))
                  ;; We need to clear the api from the package.loaded table to reset the state
                  (tset package.loaded :forem-nvim.api nil)))))
