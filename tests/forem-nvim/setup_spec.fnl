(describe :Setup (fn []
                   (require :forem-nvim)))

(it "should expose my_articles when has an api key"
    (fn []
      (local forem-nvim (require :forem-nvim))
      (forem-nvim.setup {:api_key :blabla})
      (assert.truthy forem-nvim.my_articles)))

(it "should not expose my_articles when has no api key"
    (fn []
      (tset package.loaded :forem-nvim nil)
      (local forem-nvim (require :forem-nvim))
      (forem-nvim.setup {})
      (assert.falsy forem-nvim.my_articles)))
