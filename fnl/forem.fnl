(local M {})

(λ setup [options]
    (print options.api_key))

(set M.setup
    (λ [options]
        (if (not options.api_key)
            (error "api_key is required")
            (setup options))))

M
