/** @noSelf **/
interface lsp {
  /**
   * Implements the `textDocument/did…` notifications required to track a
   * buffer for any language server.
   *
   * Without calling this, the server won't be notified of changes to a buffer.
   *
   * @param bufnr - (`integer`) Buffer handle, or 0 for current
   * @param client_id - (`integer`) Client id
   *
   * @returns  (`boolean`) success `true` if client was attached successfully;
   *  `false` otherwise
   */
  buf_attach_client: (bufnr?: any, client_id?: any) => any;
  /**
   * Detaches client from the specified buffer. Note: While the server is
   * notified that the text document (buffer) was closed, it is still able to
   * send notifications should it ignore this notification.
   *
   * @param bufnr - (`integer`) Buffer handle, or 0 for current
   * @param client_id - (`integer`) Client id
   */
  buf_detach_client: (bufnr?: any, client_id?: any) => any;
  /**
   * Checks if a buffer is attached for a particular client.
   *
   * @param bufnr - (`integer`) Buffer handle, or 0 for current
   * @param client_id - (`integer`) the client id
   */
  buf_is_attached: (bufnr?: any, client_id?: any) => any;
  /**
   * Send a notification to a server
   *
   * @param bufnr - (`integer?`) The number of the buffer
   * @param method - (`string`) Name of the request method
   * @param params - (`any`) Arguments to send to the server
   *
   * @returns  (`boolean`) success true if any client returns true; false otherwise
   */
  buf_notify: (bufnr?: any, method?: any, params?: any) => any;
  /**
   * Sends an async request for all active clients attached to the buffer and
   * executes the `handler` callback with the combined result.
   *
   * @param bufnr - (`integer`) Buffer handle, or 0 for current.
   * @param method - (`string`) LSP method name
   * @param params - (`table?`) Parameters to send to the server
   * @param handler - (`function`) Handler called after all requests are
   *   completed. Server results are passed as a
   *   `client_id:result` map.
   *
   * @returns  (`function`) cancel Function that cancels all requests.
   */
  buf_request_all: (
    bufnr?: any,
    method?: any,
    params?: any,
    handler?: any
  ) => any;
  /**
   * Sends a request to all server and waits for the response of all of them.
   *
   * Calls |vim.lsp.buf_request_all()| but blocks Nvim while awaiting the
   * result. Parameters are the same as |vim.lsp.buf_request_all()| but the
   * result is different. Waits a maximum of {timeout_ms}.
   *
   * @param bufnr - (`integer`) Buffer handle, or 0 for current.
   * @param method - (`string`) LSP method name
   * @param params - (`table?`) Parameters to send to the server
   * @param timeout_ms - (`integer?`, default: `1000`) Maximum time in
   *   milliseconds to wait for a result.
   *
   * Return (multiple): ~
   *     (`table<integer, {err: lsp.ResponseError, result: any}>?`) result Map
   *     of client_id:request_result.
   *     (`string?`) err On timeout, cancel, or error, `err` is a string
   *     describing the failure reason, and `result` is nil.
   */
  buf_request_sync: (
    bufnr?: any,
    method?: any,
    params?: any,
    timeout_ms?: any
  ) => any;
  /**
   * Checks whether a client is stopped.
   *
   * @param client_id - (`integer`)
   *
   * @returns  (`boolean`) stopped true if client is stopped, false otherwise.
   */
  client_is_stopped: (client_id?: any) => any;
  /**
   * Registry for client side commands. This is an extension point for plugins
   * to handle custom commands which are not part of the core language server
   * protocol specification.
   *
   * The registry is a table where the key is a unique command name, and the
   * value is a function which is called if any LSP action (code action, code
   * lenses, ...) triggers the command.
   *
   * If a LSP response contains a command for which no matching entry is
   * available in this registry, the command will be executed via the LSP
   * server using `workspace/executeCommand`.
   *
   * The first argument to the function will be the `Command`: Command title:
   * String command: String arguments?: any[]
   *
   * The second argument is the `ctx` of |lsp-handler|
   */
  commands: any;
  /**
   * Provides an interface between the built-in client and a `formatexpr`
   * function.
   *
   * Currently only supports a single client. This can be set via `setlocal
   * formatexpr=v:lua.vim.lsp.formatexpr()` but will typically or in
   * `on_attach` via `vim.bo[bufnr].formatexpr =
   * 'v:lua.vim.lsp.formatexpr(#{timeout_ms:250})'`.
   *
   * @param opts - (`table?`) A table with the following fields:
   * @param timeout_ms - (`integer`, default: 500ms) The timeout period
   *   for the formatting request..
   */
  formatexpr: (opts?: any) => any;
  /**
   * Returns list of buffers attached to client_id.
   *
   * @param client_id - (`integer`) client id
   *
   * @returns  (`integer[]`) buffers list of buffer ids
   */
  get_buffers_by_client_id: (client_id?: any) => any;
  /**
   * Gets a client by id, or nil if the id is invalid. The returned client may
   * not yet be fully initialized.
   *
   * @param client_id - (`integer`) client id
   *
   * @returns  (`vim.lsp.Client?`) client rpc object
   */
  get_client_by_id: (client_id?: any) => any;
  /**
   * Get active clients.
   *
   * @param filter - (`table?`) Key-value pairs used to filter the returned
   *   clients.
   * @param id - ? (`integer`) Only return clients with the given id
   * @param bufnr - ? (`integer`) Only return clients attached to this
   *   buffer
   * @param name - ? (`string`) Only return clients with the given name
   * @param method - ? (`string`) Only return clients supporting the
   *   given method
   *
   * @returns  (`vim.lsp.Client[]`) List of |vim.lsp.Client| objects
   */
  get_clients: (filter?: any) => any;
  /**
   * Gets the path of the logfile used by the LSP client.
   *
   * @returns  (`string`) path to log file
   */
  get_log_path: () => any;
  /**
   * Implements 'omnifunc' compatible LSP completion.
   *
   * @param findstart - (`integer`) 0 or 1, decides behavior
   * @param base - (`integer`) findstart=0, text to match against
   *
   * @returns  (`integer|table`) Decided by {findstart}:
   *  • findstart=0: column where the completion starts, or -2 or -3
   *  • findstart=1: list of matches (actually just calls |complete()|)
   *
   * See also: ~
   *   • |complete-functions|
   *   • |complete-items|
   *   • |CompleteDone|
   */
  omnifunc: (findstart?: any, base?: any) => any;
  /**
   * Sets the global log level for LSP logging.
   *
   * Levels by name: "TRACE", "DEBUG", "INFO", "WARN", "ERROR", "OFF"
   *
   * Level numbers begin with "TRACE" at 0
   *
   * Use `lsp.log_levels` for reverse lookup.
   *
   * @param level - (`integer|string`) the case insensitive level name or number
   *
   * See also: ~
   *   • |vim.lsp.log_levels|
   */
  set_log_level: (level?: any) => any;
  /**
   * Create a new LSP client and start a language server or reuses an already
   * running client if one is found matching `name` and `root_dir`. Attaches
   * the current buffer to the client.
   *
   * Example: >lua
   *     vim.lsp.start({
   *        name = 'my-server-name',
   *        cmd = {'name-of-language-server-executable'},
   *        root_dir = vim.fs.dirname(vim.fs.find({'pyproject.toml', 'setup.py'}, { upward = true })[1]),
   *     })
   *
   *
   * See |vim.lsp.start_client()| for all available options. The most important
   * are:
   * • `name` arbitrary name for the LSP client. Should be unique per language
   *   server.
   * • `cmd` command string[] or function, described at
   *   |vim.lsp.start_client()|.
   * • `root_dir` path to the project root. By default this is used to decide
   *   if an existing client should be re-used. The example above uses
   *   |vim.fs.find()| and |vim.fs.dirname()| to detect the root by traversing
   *   the file system upwards starting from the current directory until either
   *   a `pyproject.toml` or `setup.py` file is found.
   * • `workspace_folders` list of `{ uri:string, name: string }` tables
   *   specifying the project root folders used by the language server. If
   *   `nil` the property is derived from `root_dir` for convenience.
   *
   * Language servers use this information to discover metadata like the
   * dependencies of your project and they tend to index the contents within
   * the project folder.
   *
   * To ensure a language server is only started for languages it can handle,
   * make sure to call |vim.lsp.start()| within a |FileType| autocmd. Either
   * use |:au|, |nvim_create_autocmd()| or put the call in a
   * `ftplugin/<filetype_name>.lua` (See |ftplugin-name|)
   *
   * @param config - (`vim.lsp.ClientConfig`) Configuration for the server. See
   *   |vim.lsp.ClientConfig|.
   * @param opts - (`table?`) Optional keyword arguments
   * @param reuse_client - (`fun(client: vim.lsp.Client, config:
   *   table): boolean`) Predicate used to decide if a client
   *   should be re-used. Used on all running clients. The
   *   default implementation re-uses a client if name and
   *   root_dir matches.
   * @param bufnr - (`integer`) Buffer handle to attach to if starting
   *   or re-using a client (0 for current).
   *
   * @returns  (`integer?`) client_id
   */
  start: (config?: any, opts?: any) => any;
  /**
   * Starts and initializes a client with the given configuration.
   *
   * @param config - (`vim.lsp.ClientConfig`) Configuration for the server. See
   *   |vim.lsp.ClientConfig|.
   *
   * @returns  (`integer?`) client_id |vim.lsp.get_client_by_id()| Note: client may
   *  not be fully initialized. Use `on_init` to do any actions once the
   *  client has been initialized.
   */
  start_client: (config?: any) => any;
  /**
   * Consumes the latest progress messages from all clients and formats them as
   * a string. Empty if there are no clients or if no new messages
   *
   * @returns  (`string`)
   */
  status: () => any;
  /**
   * Stops a client(s).
   *
   * You can also use the `stop()` function on a |vim.lsp.Client| object. To
   * stop all clients: >lua
   *     vim.lsp.stop_client(vim.lsp.get_clients())
   *
   *
   * By default asks the server to shutdown, unless stop was requested already
   * for this client, then force-shutdown is attempted.
   *
   * @param client_id - (`integer|vim.lsp.Client`) id or |vim.lsp.Client| object,
   *   or list thereof
   * @param force - (`boolean?`) shutdown forcefully
   */
  stop_client: (client_id?: any, force?: any) => any;
  /**
   * Provides an interface between the built-in client and 'tagfunc'.
   *
   * When used with normal mode commands (e.g. |CTRL-]|) this will invoke the
   * "textDocument/definition" LSP method to find the tag under the cursor.
   * Otherwise, uses "workspace/symbol". If no results are returned from any
   * LSP servers, falls back to using built-in tags.
   *
   * @param pattern - (`string`) Pattern used to find a workspace symbol
   * @param flags - (`string`) See |tag-function|
   *
   * @returns  (`table[]`) tags A list of matching tags
   */
  tagfunc: (pattern?: any, flags?: any) => any;
  /**
   * Function to manage overriding defaults for LSP handlers.
   *
   * @param handler - (`lsp.Handler`) See |lsp-handler|
   * @param override_config - (`table`) Table containing the keys to override
   * @param handler -
   */
  with: (handler?: any, override_config?: any) => any;
  /** @noSelf **/
  buf: {
    /**
     * Add the folder at path to the workspace folders. If {path} is not
     * provided, the user will be prompted for a path using |input()|.
     *
     * @param workspace_folder - (`string?`)
     */
    add_workspace_folder: (workspace_folder?: any) => any;
    /**
     * Removes document highlights from current buffer.
     */
    clear_references: () => any;
    /**
     * Selects a code action available at the current cursor position.
     *
     * @param options - (`table?`) A table with the following fields:
     * @param context - ? (`lsp.CodeActionContext`) Corresponds to
     *   `CodeActionContext` of the LSP specification:
     * @param diagnostics - ? (`table`) LSP `Diagnostic[]`. Inferred
     *   from the current position if not provided.
     * @param only - ? (`table`) List of LSP `CodeActionKind`s used to
     *   filter the code actions. Most language servers support
     *   values like `refactor` or `quickfix`.
     * @param triggerKind - ? (`integer`) The reason why code actions
     *   were requested.
     * @param filter - ? (`fun(x: lsp.CodeAction|lsp.Command):boolean`)
     *   Predicate taking an `CodeAction` and returning a boolean.
     * @param apply - ? (`boolean`) When set to `true`, and there is
     *   just one remaining action (after filtering), the action
     *   is applied without user query.
     * @param range - ? (`{start: integer[], end: integer[]}`) Range for
     *   which code actions should be requested. If in visual mode
     *   this defaults to the active selection. Table must contain
     * @param row,col - tuples using
     *   mark-like indexing. See |api-indexing|
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocument_codeAction
     *   • vim.lsp.protocol.CodeActionTriggerKind
     */
    code_action: (options?: any) => any;
    /**
     * Retrieves the completion items at the current cursor position. Can only be
     * called in Insert mode.
     *
     * @param context - (`table`) (context support not yet implemented) Additional
     *   information about the context in which a completion was
     *   triggered (how it was triggered, and by which trigger
     *   character, if applicable)
     *
     * See also: ~
     *   • vim.lsp.protocol.CompletionTriggerKind
     */
    completion: (context?: any) => any;
    /**
     * Jumps to the declaration of the symbol under the cursor.
     *
     * Note: ~
     *   • Many servers do not implement this method. Generally, see
     *     |vim.lsp.buf.definition()| instead.
     *
     * @param options - (`vim.lsp.LocationOpts?`) See |vim.lsp.LocationOpts|.
     */
    declaration: (options?: any) => any;
    /**
     * Jumps to the definition of the symbol under the cursor.
     *
     * @param options - (`vim.lsp.LocationOpts?`) See |vim.lsp.LocationOpts|.
     */
    definition: (options?: any) => any;
    /**
     * Send request to the server to resolve document highlights for the current
     * text document position. This request can be triggered by a key mapping or
     * by events such as `CursorHold`, e.g.: >vim
     *     autocmd CursorHold  <buffer> lua vim.lsp.buf.document_highlight()
     *     autocmd CursorHoldI <buffer> lua vim.lsp.buf.document_highlight()
     *     autocmd CursorMoved <buffer> lua vim.lsp.buf.clear_references()
     *
     *
     * Note: Usage of |vim.lsp.buf.document_highlight()| requires the following
     * highlight groups to be defined or you won't be able to see the actual
     * highlights. |hl-LspReferenceText| |hl-LspReferenceRead|
     * |hl-LspReferenceWrite|
     */
    document_highlight: () => any;
    /**
     * Lists all symbols in the current buffer in the quickfix window.
     *
     * @param options - (`vim.lsp.ListOpts?`) See |vim.lsp.ListOpts|.
     */
    document_symbol: (options?: any) => any;
    /**
     * Executes an LSP server command.
     *
     * @param command_params - (`lsp.ExecuteCommandParams`)
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#workspace_executeCommand
     */
    execute_command: (command_params?: any) => any;
    /**
     * Formats a buffer using the attached (and optionally filtered) language
     * server clients.
     *
     * @param options - (`table?`) A table with the following fields:
     * @param formatting_options - ? (`table`) Can be used to specify
     *   FormattingOptions. Some unspecified options will be
     *   automatically derived from the current Nvim options. See
     *   https://microsoft.github.io/language-server-protocol/specification/#formattingOptions
     * @param timeout_ms - ? (`integer`, default: `1000`) Time in
     *   milliseconds to block for formatting requests. No effect
     *   if async=true.
     * @param bufnr - ? (`integer`, default: current buffer) Restrict
     *   formatting to the clients attached to the given buffer.
     * @param filter - ? (`fun(client: vim.lsp.Client): boolean?`)
     *   Predicate used to filter clients. Receives a client as
     *   argument and must return a boolean. Clients matching the
     *   predicate are included. Example: >lua
     *   -- Never request typescript-language-server for formatting
     *   vim.lsp.buf.format {
     *   filter = function(client) return client.name ~= "tsserver" end
     *   }
     *
     *                • {async}? (`boolean`, default: false) If true the method
     *                  won't block. Editing the buffer while formatting
     *                  asynchronous can lead to unexpected changes.
     *                • {id}? (`integer`) Restrict formatting to the client with
     *                  ID (client.id) matching this field.
     *                • {name}? (`string`) Restrict formatting to the client with
     *                  name (client.name) matching this field.
     *                • {range}? (`{start:integer[],end:integer[]}`, default:
     *                  current selection in visual mode, `nil` in other modes,
     *                  formatting the full buffer) Range to format. Table must
     *                  contain `start` and `end` keys with {row,col} tuples
     *                  using (1,0) indexing.
     */
    format: (options?: any) => any;
    /**
     * Displays hover information about the symbol under the cursor in a floating
     * window. Calling the function twice will jump into the floating window.
     */
    hover: () => any;
    /**
     * Lists all the implementations for the symbol under the cursor in the
     * quickfix window.
     *
     * @param options - (`vim.lsp.LocationOpts?`) See |vim.lsp.LocationOpts|.
     */
    implementation: (options?: any) => any;
    /**
     * Lists all the call sites of the symbol under the cursor in the |quickfix|
     * window. If the symbol can resolve to multiple items, the user can pick one
     * in the |inputlist()|.
     */
    incoming_calls: () => any;
    /**
     * List workspace folders.
     */
    list_workspace_folders: () => any;
    /**
     * Lists all the items that are called by the symbol under the cursor in the
     * |quickfix| window. If the symbol can resolve to multiple items, the user
     * can pick one in the |inputlist()|.
     */
    outgoing_calls: () => any;
    /**
     * Lists all the references to the symbol under the cursor in the quickfix
     * window.
     *
     * @param context - (`table?`) Context for the request
     * @param options - (`vim.lsp.ListOpts?`) See |vim.lsp.ListOpts|.
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocument_references
     */
    references: (context?: any, options?: any) => any;
    /**
     * Remove the folder at path from the workspace folders. If {path} is not
     * provided, the user will be prompted for a path using |input()|.
     *
     * @param workspace_folder - (`string?`)
     */
    remove_workspace_folder: (workspace_folder?: any) => any;
    /**
     * Renames all references to the symbol under the cursor.
     *
     * @param new_name - (`string?`) If not provided, the user will be prompted for
     *   a new name using |vim.ui.input()|.
     * @param options - (`table?`) Additional options:
     * @param filter - ? (`fun(client: vim.lsp.Client): boolean?`)
     *   Predicate used to filter clients. Receives a client as
     *   argument and must return a boolean. Clients matching the
     *   predicate are included.
     * @param name - ? (`string`) Restrict clients used for rename to
     *   ones where client.name matches this field.
     * @param bufnr - ? (`integer`) (default: current buffer)
     */
    rename: (new_name?: any, options?: any) => any;
    /**
     * Displays signature information about the symbol under the cursor in a
     * floating window.
     */
    signature_help: () => any;
    /**
     * Jumps to the definition of the type of the symbol under the cursor.
     *
     * @param options - (`vim.lsp.LocationOpts?`) See |vim.lsp.LocationOpts|.
     */
    type_definition: (options?: any) => any;
    /**
     * Lists all symbols in the current workspace in the quickfix window.
     *
     * The list is filtered against {query}; if the argument is omitted from the
     * call, the user is prompted to enter a string on the command line. An empty
     * string means no filtering is done.
     *
     * @param query - (`string?`) optional
     * @param options - (`vim.lsp.ListOpts?`) See |vim.lsp.ListOpts|.
     */
    workspace_symbol: (query?: any, options?: any) => any;
  };

  /** @noSelf **/
  diagnostic: {
    /**
     * Get the diagnostic namespace associated with an LSP client
     * |vim.diagnostic| for diagnostics
     *
     * @param client_id - (`integer`) The id of the LSP client
     * @param is_pull - (`boolean?`) Whether the namespace is for a pull or push
     *   client. Defaults to push
     */
    get_namespace: (client_id?: any, is_pull?: any) => any;
    /**
     * |lsp-handler| for the method "textDocument/diagnostic"
     *
     * See |vim.diagnostic.config()| for configuration options. Handler-specific
     * configuration can be set using |vim.lsp.with()|: >lua
     *     vim.lsp.handlers["textDocument/diagnostic"] = vim.lsp.with(
     *       vim.lsp.diagnostic.on_diagnostic, {
     *         -- Enable underline, use default values
     *         underline = true,
     *         -- Enable virtual text, override spacing to 4
     *         virtual_text = {
     *           spacing = 4,
     *         },
     *         -- Use a function to dynamically turn signs off
     *         -- and on, using buffer local variables
     *         signs = function(namespace, bufnr)
     *           return vim.b[bufnr].show_signs == true
     *         end,
     *         -- Disable a feature
     *         update_in_insert = false,
     *       }
     *     )
     *
     *
     * @param result - (`lsp.DocumentDiagnosticReport`)
     * @param ctx - (`lsp.HandlerContext`)
     * @param config - (`vim.diagnostic.Opts`) Configuration table (see
     *   |vim.diagnostic.config()|).
     */
    on_diagnostic: (arg__?: any, result?: any, ctx?: any, config?: any) => any;
    /**
     * |lsp-handler| for the method "textDocument/publishDiagnostics"
     *
     * See |vim.diagnostic.config()| for configuration options. Handler-specific
     * configuration can be set using |vim.lsp.with()|: >lua
     *     vim.lsp.handlers["textDocument/publishDiagnostics"] = vim.lsp.with(
     *       vim.lsp.diagnostic.on_publish_diagnostics, {
     *         -- Enable underline, use default values
     *         underline = true,
     *         -- Enable virtual text, override spacing to 4
     *         virtual_text = {
     *           spacing = 4,
     *         },
     *         -- Use a function to dynamically turn signs off
     *         -- and on, using buffer local variables
     *         signs = function(namespace, bufnr)
     *           return vim.b[bufnr].show_signs == true
     *         end,
     *         -- Disable a feature
     *         update_in_insert = false,
     *       }
     *     )
     *
     *
     * @param result - (`lsp.PublishDiagnosticsParams`)
     * @param ctx - (`lsp.HandlerContext`)
     * @param config - (`vim.diagnostic.Opts?`) Configuration table (see
     *   |vim.diagnostic.config()|).
     */
    on_publish_diagnostics: (
      arg__?: any,
      result?: any,
      ctx?: any,
      config?: any
    ) => any;
  };

  /** @noSelf **/
  handlers: {
    /**
     * |lsp-handler| for the method "textDocument/hover" >lua
     *     vim.lsp.handlers["textDocument/hover"] = vim.lsp.with(
     *       vim.lsp.handlers.hover, {
     *         -- Use a sharp border with `FloatBorder` highlights
     *         border = "single",
     *         -- add the title in hover float window
     *         title = "hover"
     *       }
     *     )
     *
     *
     * @param result - (`lsp.Hover`)
     * @param ctx - (`lsp.HandlerContext`)
     * @param config - (`table`) Configuration table.
     *   • border: (default=nil)
     *   • Add borders to the floating window
     *   • See |vim.lsp.util.open_floating_preview()| for more
     *   options.
     */
    hover: (arg__?: any, result?: any, ctx?: any, config?: any) => any;
    /**
     * |lsp-handler| for the method "textDocument/signatureHelp".
     *
     * The active parameter is highlighted with |hl-LspSignatureActiveParameter|. >lua
     *     vim.lsp.handlers["textDocument/signatureHelp"] = vim.lsp.with(
     *       vim.lsp.handlers.signature_help, {
     *         -- Use a sharp border with `FloatBorder` highlights
     *         border = "single"
     *       }
     *     )
     *
     *
     * @param result - (`lsp.SignatureHelp`) Response from the language server
     * @param ctx - (`lsp.HandlerContext`) Client context
     * @param config - (`table`) Configuration table.
     *   • border: (default=nil)
     *   • Add borders to the floating window
     *   • See |vim.lsp.util.open_floating_preview()| for more
     *   options
     */
    signature_help: (arg__?: any, result?: any, ctx?: any, config?: any) => any;
  };

  /** @noSelf **/
  log: {
    /**
     * Returns the log filename.
     *
     * @returns  (`string`) log filename
     */
    get_filename: () => any;
    /**
     * Gets the current log level.
     *
     * @returns  (`integer`) current log level
     */
    get_level: () => any;
    /**
     * Sets formatting function used to format logs
     *
     * @param handle - (`function`) function to apply to logging arguments, pass
     *   vim.inspect for multi-line formatting
     */
    set_format_func: (handle?: any) => any;
    /**
     * Sets the current log level.
     *
     * @param level - (`string|integer`) One of `vim.lsp.log.levels`
     */
    set_level: (level?: any) => any;
    /**
     * Checks whether the level is sufficient for logging.
     *
     * @param level - (`integer`) log level
     *
     * @returns  (`bool`) true if would log, false if not
     */
    should_log: (level?: any) => any;
  };

  /** @noSelf **/
  protocol: {
    /**
     * Gets a new ClientCapabilities object describing the LSP client
     * capabilities.
     *
     * @returns  (`lsp.ClientCapabilities`)
     */
    make_client_capabilities: () => any;
    /**
     * LSP method names.
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specification/#metaModel
     */
    Methods: any;
    /**
     * Creates a normalized object describing LSP server capabilities.
     *
     * @param server_capabilities - (`table`) Table of capabilities supported by
     *   the server
     *
     * @returns  (`lsp.ServerCapabilities?`) Normalized table of capabilities
     *
     *
     * :tw=78:ts=8:sw=4:sts=4:et:ft=help:norl:
     */
    resolve_capabilities: (server_capabilities?: any) => any;
  };

  /** @noSelf **/
  rpc: {
    /**
     * Create a LSP RPC client factory that connects via TCP to the given host
     * and port.
     *
     * Return a function that can be passed to the `cmd` field for
     * |vim.lsp.start_client()| or |vim.lsp.start()|.
     *
     * @param host - (`string`) host to connect to
     * @param port - (`integer`) port to connect to
     *
     * @returns  (`fun(dispatchers: vim.lsp.rpc.Dispatchers):
     *  vim.lsp.rpc.PublicClient`)
     */
    connect: (host?: any, port?: any) => any;
    /**
     * Create a LSP RPC client factory that connects via named pipes (Windows) or
     * unix domain sockets (Unix) to the given pipe_path (file path on Unix and
     * name on Windows).
     *
     * Return a function that can be passed to the `cmd` field for
     * |vim.lsp.start_client()| or |vim.lsp.start()|.
     *
     * @param pipe_path - (`string`) file path of the domain socket (Unix) or name
     *   of the named pipe (Windows) to connect to
     *
     * @returns  (`fun(dispatchers: vim.lsp.rpc.Dispatchers):
     *  vim.lsp.rpc.PublicClient`)
     */
    domain_socket_connect: (pipe_path?: any) => any;
    /**
     * Constructs an error message from an LSP error object.
     *
     * @param err - (`table`) The error object
     *
     * @returns  (`string`) error_message The formatted error message
     */
    format_rpc_error: (err?: any) => any;
    /**
     * Sends a notification to the LSP server.
     *
     * @param method - (`string`) The invoked LSP method
     * @param params - (`table?`) Parameters for the invoked LSP method
     *
     * @returns  (`boolean`) `true` if notification could be sent, `false` if not
     */
    notify: (method?: any, params?: any) => any;
    /**
     * Sends a request to the LSP server and runs {callback} upon response.
     *
     * @param method - (`string`) The invoked LSP method
     * @param params - (`table?`) Parameters for the invoked LSP
     *   method
     * @param callback - (`fun(err: lsp.ResponseError?, result: any)`)
     *   Callback to invoke
     * @param notify_reply_callback - (`fun(message_id: integer)?`) Callback to
     *   invoke as soon as a request is no longer
     *   pending
     *
     * Return (multiple): ~
     *     (`boolean`) success `true` if request could be sent, `false` if not
     *     (`integer?`) message_id if request could be sent, `nil` if not
     */
    request: (
      method?: any,
      params?: any,
      callback?: any,
      notify_reply_callback?: any
    ) => any;
    /**
     * Creates an RPC response table `error` to be sent to the LSP response.
     *
     * @param code - (`integer`) RPC error code defined, see
     *   `vim.lsp.protocol.ErrorCodes`
     * @param message - (`string?`) arbitrary message to send to server
     * @param data - (`any?`) arbitrary data to send to server
     *
     * @returns  (`lsp.ResponseError`)
     *
     * See also: ~
     *   • lsp.ErrorCodes See `vim.lsp.protocol.ErrorCodes`
     */
    rpc_response_error: (code?: any, message?: any, data?: any) => any;
    /**
     * Starts an LSP server process and create an LSP RPC client object to
     * interact with it. Communication with the spawned process happens via
     * stdio. For communication via TCP, spawn a process manually and use
     * |vim.lsp.rpc.connect()|
     *
     * @param cmd - (`string[]`) Command to start the LSP server.
     * @param dispatchers - (`table?`) Dispatchers for LSP message types.
     * @param notification - (`fun(method: string, params:
     *   table)`)
     * @param server_request - (`fun(method: string, params:
     *   table): any?, lsp.ResponseError?`)
     * @param on_exit - (`fun(code: integer, signal:
     *   integer)`)
     * @param on_error - (`fun(code: integer, err: any)`)
     * @param extra_spawn_params - (`table?`) Additional context for the LSP server
     *   process.
     * @param cwd - ? (`string`) Working directory for the
     *   LSP server process
     * @param detached - ? (`boolean`) Detach the LSP server
     *   process from the current process
     * @param env - ? (`table<string,string>`) Additional
     *   environment variables for LSP server process.
     *   See |vim.system()|
     *
     * @returns  (`vim.lsp.rpc.PublicClient?`) Client RPC object, with these methods:
     *  • `notify()` |vim.lsp.rpc.notify()|
     *  • `request()` |vim.lsp.rpc.request()|
     *  • `is_closing()` returns a boolean indicating if the RPC is closing.
     *  • `terminate()` terminates the RPC client. See
     *  |vim.lsp.rpc.PublicClient|.
     */
    start: (cmd?: any, dispatchers?: any, extra_spawn_params?: any) => any;
  };

  /** @noSelf **/
  util: {
    /**
     * Applies a `TextDocumentEdit`, which is a list of changes to a single
     * document.
     *
     * @param text_document_edit - (`table`) a `TextDocumentEdit` object
     * @param index - (`integer`) Optional index of the edit, if from
     *   a list of edits (or nil, if not from a list)
     * @param offset_encoding - (`string?`)
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocumentEdit
     */
    apply_text_document_edit: (
      text_document_edit?: any,
      index?: any,
      offset_encoding?: any
    ) => any;
    /**
     * Applies a list of text edits to a buffer.
     *
     * @param text_edits - (`table`) list of `TextEdit` objects
     * @param bufnr - (`integer`) Buffer id
     * @param offset_encoding - (`string`) utf-8|utf-16|utf-32
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textEdit
     */
    apply_text_edits: (
      text_edits?: any,
      bufnr?: any,
      offset_encoding?: any
    ) => any;
    /**
     * Applies a `WorkspaceEdit`.
     *
     * @param workspace_edit - (`table`) `WorkspaceEdit`
     * @param offset_encoding - (`string`) utf-8|utf-16|utf-32 (required)
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#workspace_applyEdit
     */
    apply_workspace_edit: (workspace_edit?: any, offset_encoding?: any) => any;
    /**
     * Removes document highlights from a buffer.
     *
     * @param bufnr - (`integer?`) Buffer id
     */
    buf_clear_references: (bufnr?: any) => any;
    /**
     * Shows a list of document highlights for a certain buffer.
     *
     * @param bufnr - (`integer`) Buffer id
     * @param references - (`table`) List of `DocumentHighlight` objects to
     *   highlight
     * @param offset_encoding - (`string`) One of "utf-8", "utf-16", "utf-32".
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specification/#textDocumentContentChangeEvent
     */
    buf_highlight_references: (
      bufnr?: any,
      references?: any,
      offset_encoding?: any
    ) => any;
    /**
     * Returns the UTF-32 and UTF-16 offsets for a position in a certain buffer.
     *
     * @param buf - (`integer`) buffer number (0 for current)
     * @param row - (`integer`) 0-indexed line
     * @param col - (`integer`) 0-indexed byte offset in line
     * @param offset_encoding - (`string`) utf-8|utf-16|utf-32 defaults to
     *   `offset_encoding` of first client of `buf`
     *
     * @returns  (`integer`) `offset_encoding` index of the character in line {row}
     *  column {col} in buffer {buf}
     */
    character_offset: (
      buf?: any,
      row?: any,
      col?: any,
      offset_encoding?: any
    ) => any;
    /**
     * Converts any of `MarkedString` | `MarkedString[]` | `MarkupContent` into a
     * list of lines containing valid markdown. Useful to populate the hover
     * window for `textDocument/hover`, for parsing the result of
     * `textDocument/signatureHelp`, and potentially others.
     *
     * Note that if the input is of type `MarkupContent` and its kind is
     * `plaintext`, then the corresponding value is returned without further
     * modifications.
     *
     * @param input - (`lsp.MarkedString|lsp.MarkedString[]|lsp.MarkupContent`)
     * @param contents - (`table?`) List of strings to extend with converted lines.
     *   Defaults to {}.
     *
     * @returns  (`string[]`) extended with lines of converted markdown.
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocument_hover
     */
    convert_input_to_markdown_lines: (input?: any, contents?: any) => any;
    /**
     * Converts `textDocument/signatureHelp` response to markdown lines.
     *
     * @param signature_help - (`table`) Response of `textDocument/SignatureHelp`
     * @param ft - (`string?`) filetype that will be use as the `lang`
     *   for the label markdown code block
     * @param triggers - (`table?`) list of trigger characters from the lsp
     *   server. used to better determine parameter offsets
     *
     * Return (multiple): ~
     *     (`table?`) table list of lines of converted markdown.
     *     (`table?`) table of active hl
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocument_signatureHelp
     */
    convert_signature_help_to_markdown_lines: (
      signature_help?: any,
      ft?: any,
      triggers?: any
    ) => any;
    /**
     * Returns indentation size.
     *
     * @param bufnr - (`integer?`) Buffer handle, defaults to current
     *
     * @returns  (`integer`) indentation size
     *
     * See also: ~
     *   • 'shiftwidth'
     */
    get_effective_tabstop: (bufnr?: any) => any;
    /**
     * Jumps to a location.
     *
     * @param location - (`table`) (`Location`|`LocationLink`)
     * @param offset_encoding - (`string?`) utf-8|utf-16|utf-32
     * @param reuse_win - (`boolean?`) Jump to existing window if buffer is
     *   already open.
     *
     * @returns  (`boolean`) `true` if the jump succeeded
     */
    jump_to_location: (
      location?: any,
      offset_encoding?: any,
      reuse_win?: any
    ) => any;
    /**
     * Returns the items with the byte position calculated correctly and in
     * sorted order, for display in quickfix and location lists.
     *
     * The `user_data` field of each resulting item will contain the original
     * `Location` or `LocationLink` it was computed from.
     *
     * The result can be passed to the {list} argument of |setqflist()| or
     * |setloclist()|.
     *
     * @param locations - (`lsp.Location[]|lsp.LocationLink[]`)
     * @param offset_encoding - (`string`) offset_encoding for locations
     *   utf-8|utf-16|utf-32 default to first client of
     *   buffer
     *
     * @returns  (`table[]`) A list of objects with the following fields:
     *  • {filename} (`string`)
     *  • {lnum} (`integer`) 1-indexed line number
     *  • {col} (`integer`) 1-indexed column
     *  • {text} (`string`)
     *  • {user_data} (`lsp.Location|lsp.LocationLink`)
     */
    locations_to_items: (locations?: any, offset_encoding?: any) => any;
    /**
     * Creates a table with sensible default options for a floating window. The
     * table can be passed to |nvim_open_win()|.
     *
     * @param width - (`integer`) window width (in character cells)
     * @param height - (`integer`) window height (in character cells)
     * @param opts - (`table`) optional
     *   • offset_x (integer) offset to add to `col`
     *   • offset_y (integer) offset to add to `row`
     *   • border (string or table) override `border`
     *   • focusable (string or table) override `focusable`
     *   • zindex (string or table) override `zindex`, defaults to 50
     *   • relative ("mouse"|"cursor") defaults to "cursor"
     *   • anchor_bias ("auto"|"above"|"below") defaults to "auto"
     *   • "auto": place window based on which side of the cursor
     *   has more lines
     *   • "above": place the window above the cursor unless there
     *   are not enough lines to display the full window height.
     *   • "below": place the window below the cursor unless there
     *   are not enough lines to display the full window height.
     *
     * @returns  (`table`) Options
     */
    make_floating_popup_options: (width?: any, height?: any, opts?: any) => any;
    /**
     * Creates a `DocumentFormattingParams` object for the current buffer and
     * cursor position.
     *
     * @param options - (`table?`) with valid `FormattingOptions` entries
     *
     * @returns  (`lsp.DocumentFormattingParams`) object
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocument_formatting
     */
    make_formatting_params: (options?: any) => any;
    /**
     * Using the given range in the current buffer, creates an object that is
     * similar to |vim.lsp.util.make_range_params()|.
     *
     * @param start_pos - (`integer[]?`) {row,col} mark-indexed position.
     *   Defaults to the start of the last visual selection.
     * @param end_pos - (`integer[]?`) {row,col} mark-indexed position.
     *   Defaults to the end of the last visual selection.
     * @param bufnr - (`integer?`) buffer handle or 0 for current,
     *   defaults to current
     * @param offset_encoding - (`"utf-8"|"utf-16"|"utf-32"?`) defaults to
     *   `offset_encoding` of first client of `bufnr`
     *
     * @returns  (`table`) { textDocument = { uri = `current_file_uri` }, range = {
     *  start = `start_position`, end = `end_position` } }
     */
    make_given_range_params: (
      start_pos?: any,
      end_pos?: any,
      bufnr?: any,
      offset_encoding?: any
    ) => any;
    /**
     * Creates a `TextDocumentPositionParams` object for the current buffer and
     * cursor position.
     *
     * @param window - (`integer?`) window handle or 0 for current,
     *   defaults to current
     * @param offset_encoding - (`string?`) utf-8|utf-16|utf-32|nil defaults to
     *   `offset_encoding` of first client of buffer of
     *   `window`
     *
     * @returns  (`table`) `TextDocumentPositionParams` object
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocumentPositionParams
     */
    make_position_params: (window?: any, offset_encoding?: any) => any;
    /**
     * Using the current position in the current buffer, creates an object that
     * can be used as a building block for several LSP requests, such as
     * `textDocument/codeAction`, `textDocument/colorPresentation`,
     * `textDocument/rangeFormatting`.
     *
     * @param window - (`integer?`) window handle or 0 for current,
     *   defaults to current
     * @param offset_encoding - (`"utf-8"|"utf-16"|"utf-32"?`) defaults to
     *   `offset_encoding` of first client of buffer of
     *   `window`
     *
     * @returns  (`table`) { textDocument = { uri = `current_file_uri` }, range = {
     *  start = `current_position`, end = `current_position` } }
     */
    make_range_params: (window?: any, offset_encoding?: any) => any;
    /**
     * Creates a `TextDocumentIdentifier` object for the current buffer.
     *
     * @param bufnr - (`integer?`) Buffer handle, defaults to current
     *
     * @returns  (`table`) `TextDocumentIdentifier`
     *
     * See also: ~
     *   • https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocumentIdentifier
     */
    make_text_document_params: (bufnr?: any) => any;
    /**
     * Create the workspace params
     *
     * @param added - (`table`)
     * @param removed - (`table`)
     */
    make_workspace_params: (added?: any, removed?: any) => any;
    /**
     * Shows contents in a floating window.
     *
     * @param contents - (`table`) of lines to show in window
     * @param syntax - (`string`) of syntax to set for opened buffer
     * @param opts - (`table?`) with optional fields (additional keys are
     *   filtered with |vim.lsp.util.make_floating_popup_options()|
     *   before they are passed on to |nvim_open_win()|)
     * @param height - ? (`integer`) Height of floating window
     * @param width - ? (`integer`) Width of floating window
     * @param wrap - ? (`boolean`, default: `true`) Wrap long lines
     * @param wrap_at - ? (`integer`) Character to wrap at for
     *   computing height when wrap is enabled
     * @param max_width - ? (`integer`) Maximal width of floating
     *   window
     * @param max_height - ? (`integer`) Maximal height of floating
     *   window
     * @param focus_id - ? (`string`) If a popup with this id is
     *   opened, then focus it
     * @param close_events - ? (`table`) List of events that closes the
     *   floating window
     * @param focusable - ? (`boolean`, default: `true`) Make float
     *   focusable.
     * @param focus - ? (`boolean`, default: `true`) If `true`, and if
     * @param focusable - is also `true`, focus an existing floating
     * @param focus_id -
     *
     * Return (multiple): ~
     *     (`integer`) bufnr of newly created float window
     *     (`integer`) winid of newly created float window preview window
     */
    open_floating_preview: (contents?: any, syntax?: any, opts?: any) => any;
    /**
     * Previews a location in a floating window
     *
     * behavior depends on type of location:
     * • for Location, range is shown (e.g., function definition)
     * • for LocationLink, targetRange is shown (e.g., body of function
     *   definition)
     *
     * @param location - (`table`) a single `Location` or `LocationLink`
     * @param opts - (`table`)
     *
     * Return (multiple): ~
     *     (`integer?`) buffer id of float window
     *     (`integer?`) window id of float window
     */
    preview_location: (location?: any, opts?: any) => any;
    /**
     * Rename old_fname to new_fname
     *
     * Existing buffers are renamed as well, while maintaining their bufnr.
     *
     * It deletes existing buffers that conflict with the renamed file name only
     * when
     * • `opts` requests overwriting; or
     * • the conflicting buffers are not loaded, so that deleting thme does not
     *   result in data loss.
     *
     * @param old_fname - (`string`)
     * @param new_fname - (`string`)
     * @param opts - (`table?`) Options:
     * @param overwrite - ? (`boolean`)
     * @param ignoreIfExists - ? (`boolean`)
     */
    rename: (old_fname?: any, new_fname?: any, opts?: any) => any;
    /**
     * Shows document and optionally jumps to the location.
     *
     * @param location - (`table`) (`Location`|`LocationLink`)
     * @param offset_encoding - (`string?`) utf-8|utf-16|utf-32
     * @param opts - (`table?`) options
     *   • reuse_win (boolean) Jump to existing window if
     *   buffer is already open.
     *   • focus (boolean) Whether to focus/jump to location
     *   if possible. Defaults to true.
     *
     * @returns  (`boolean`) `true` if succeeded
     */
    show_document: (location?: any, offset_encoding?: any, opts?: any) => any;
    /**
     * Converts markdown into syntax highlighted regions by stripping the code
     * blocks and converting them into highlighted code. This will by default
     * insert a blank line separator after those code block regions to improve
     * readability.
     *
     * This method configures the given buffer and returns the lines to set.
     *
     * If you want to open a popup with fancy markdown, use
     * `open_floating_preview` instead
     *
     * @param bufnr - (`integer`)
     * @param contents - (`table`) of lines to show in window
     * @param opts - (`table`) with optional fields
     *   • height of floating window
     *   • width of floating window
     *   • wrap_at character to wrap at for computing height
     *   • max_width maximal width of floating window
     *   • max_height maximal height of floating window
     *   • separator insert separator after code block
     *
     * @returns  (`table`) stripped content
     */
    stylize_markdown: (bufnr?: any, contents?: any, opts?: any) => any;
    /**
     * Converts symbols to quickfix list items.
     *
     * @param symbols - (`table`) DocumentSymbol[] or SymbolInformation[]
     * @param bufnr - (`integer`)
     */
    symbols_to_items: (symbols?: any, bufnr?: any) => any;
  };
}
