(local M {})

(set M.fold (λ [fun init list]
              (var acc init)
              (each [_ el (pairs list)]
                (set acc (fun el acc)))
              acc))

(set M.set-local (λ [opt val]
                   (tset vim.opt_local opt val)))

(set M.set-locals (λ [opt-vals]
                    (each [_ [opt val] (pairs opt-vals)]
                      (M.set-local opt val))))

(set M.is-executable? (λ [file]
                        (= 1 (vim.fn.executable file))))

(set M.open-browser-url (λ [url]
                          (let [?cmd (if (M.is-executable? :xdg-open) :xdg-open
                                         (M.is-executable? :open) :open
                                         (M.is-executable? :start) :start nil)]
                            (if ?cmd
                                (vim.cmd (.. ":!" ?cmd " " url))
                                (print (.. "Could not find a command to open the URL: "
                                           url))))))

(set M.get-plural (λ [count noun ?plural]
                    (if (= 1 count)
                        noun
                        (if ?plural ?plural (.. noun :s)))))

M
