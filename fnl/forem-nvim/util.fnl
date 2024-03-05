(local M {})

(λ M.fold [fun init list]
  (var acc init)
  (each [_ el (pairs list)]
    (set acc (fun el acc)))
  acc)

(λ M.set-local [opt val]
  (tset vim.opt_local opt val))

(λ M.set-locals [opt-vals]
  (each [_ [opt val] (pairs opt-vals)]
    (M.set-local opt val)))

(λ M.is-executable? [file]
  (= 1 (vim.fn.executable file)))

(λ M.open-browser-url [url]
  (let [?cmd (if (M.is-executable? :xdg-open) :xdg-open
                 (M.is-executable? :open) :open
                 (M.is-executable? :start) :start
                 nil)]
    (if ?cmd
        (vim.cmd (.. ":!" ?cmd " " url))
        (vim.api.nvim_err_writeln (.. "Could not find a command to open the URL: "
                                      url)))))

(λ M.get-plural [count noun ?plural]
  (if (= 1 count)
      noun
      (or ?plural (.. noun :s))))

(λ M.open-float-menu [content ?options]
  (let [width (accumulate [bigger 0 _ text (pairs content)]
                (let [text-width (vim.fn.len text)]
                  (if (> text-width bigger)
                      text-width
                      bigger)))
        buffer (vim.api.nvim_create_buf false true)
        float-options (vim.tbl_extend :keep (or ?options {})
                                      {:relative :cursor
                                       :col 0
                                       :row 1
                                       :style :minimal
                                       : width
                                       :border :rounded
                                       :height (vim.fn.len content)})
        win (vim.api.nvim_open_win buffer 0 float-options)]
    (vim.api.nvim_buf_set_lines buffer 0 -1 true content)
    (vim.api.nvim_buf_set_name buffer "forem://feed/floatmenu")
    (vim.api.nvim_buf_set_option buffer :modifiable false)
    (vim.api.nvim_buf_set_option buffer :bufhidden :delete)
    (vim.api.nvim_win_set_option win :cursorline true)))

M
