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
        (print (.. "Could not find a command to open the URL: " url)))))

(λ M.get-plural [count noun ?plural]
  (if (= 1 count)
      noun
      (if ?plural ?plural (.. noun :s))))

M
