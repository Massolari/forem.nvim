(describe :Setup
          (fn []
            (it "should expose get_articles when has an api key"
                (fn []
                  (local forem-nvim (require :forem-nvim))
                  (forem-nvim.setup {:api_key :blabla})
                  (assert.truthy forem-nvim.get_articles)))))
