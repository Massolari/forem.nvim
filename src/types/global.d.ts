/** @noSelf **/
declare namespace vim {
  /**
   * Executes Vim script commands.
   *
   * Note that `vim.cmd` can be indexed with a command name to return a
   * callable function to the command.
   *
   * Example: >lua
   *     vim.cmd('echo 42')
   *     vim.cmd([[
   *       augroup My_group
   *         autocmd!
   *         autocmd FileType c setlocal cindent
   *       augroup END
   *     ]])
   *
   *     -- Ex command :echo "foo"
   *     -- Note string literals need to be double quoted.
   *     vim.cmd('echo "foo"')
   *     vim.cmd { cmd = 'echo', args = { '"foo"' } }
   *     vim.cmd.echo({ args = { '"foo"' } })
   *     vim.cmd.echo('"foo"')
   *
   *     -- Ex command :write! myfile.txt
   *     vim.cmd('write! myfile.txt')
   *     vim.cmd { cmd = 'write', args = { "myfile.txt" }, bang = true }
   *     vim.cmd.write { args = { "myfile.txt" }, bang = true }
   *     vim.cmd.write { "myfile.txt", bang = true }
   *
   *     -- Ex command :colorscheme blue
   *     vim.cmd('colorscheme blue')
   *     vim.cmd.colorscheme('blue')
   *
   *
   * @param command - (`string|table`) Command(s) to execute. If a string,
   *   executes multiple lines of Vim script at once. In this
   *   case, it is an alias to |nvim_exec2()|, where `opts.output`
   *   is set to false. Thus it works identical to |:source|. If a
   *   table, executes a single command. In this case, it is an
   *   alias to |nvim_cmd()| where `opts` is empty.
   *
   * See also: ~
   *   • |ex-cmd-index|
   */
  function cmd(command?: any): any;
  /**
   * Defers calling {fn} until {timeout} ms passes.
   *
   * Use to do a one-shot timer that calls {fn} Note: The {fn} is
   * |vim.schedule_wrap()|ped automatically, so API functions are safe to call.
   *
   * @param fn - (`function`) Callback to call once `timeout` expires
   * @param timeout - (`integer`) Number of milliseconds to wait before calling
   *   `fn`
   *
   * @returns  (`table`) timer luv timer object
   */
  function defer_fn(fn?: any, timeout?: any): any;
  /**
   * Shows a deprecation message to the user.
   *
   * @param name - (`string`) Deprecated feature (function, API, etc.).
   * @param alternative - (`string?`) Suggested alternative feature.
   * @param version - (`string`) Version when the deprecated function will be
   *   removed.
   * @param plugin - (`string?`) Name of the plugin that owns the deprecated
   *   feature. Defaults to "Nvim".
   * @param backtrace - (`boolean?`) Prints backtrace. Defaults to true.
   *
   * @returns  (`string?`) Deprecated message, or nil if no message was shown.
   */
  function deprecate(
    name?: any,
    alternative?: any,
    version?: any,
    plugin?: any,
    backtrace?: any,
  ): any;
  /**
   * Gets a human-readable representation of the given object.
   *
   * @returns  (`string`)
   *
   * See also: ~
   *   • |vim.print()|
   *   • https://github.com/kikito/inspect.lua
   *   • https://github.com/mpeterv/vinspect
   */
  function inspect(a: any): any;
  /**
   * Translates keycodes.
   *
   * Example: >lua
   *     local k = vim.keycode
   *     vim.g.mapleader = k'<bs>'
   *
   *
   * @param str - (`string`) String to be converted.
   *
   * @returns  (`string`)
   *
   * See also: ~
   *   • |nvim_replace_termcodes()|
   */
  function keycode(str?: any): any;
  /**
   * Omnifunc for completing Lua values from the runtime Lua interpreter,
   * similar to the builtin completion for the `:lua` command.
   *
   * Activate using `set omnifunc=v:lua.vim.lua_omnifunc` in a Lua buffer.
   *
   * @param find_start - (`1|0`)
   */
  function lua_omnifunc(find_start?: any): any;
  /**
   * Displays a notification to the user.
   *
   * This function can be overridden by plugins to display notifications using
   * a custom provider (such as the system notification provider). By default,
   * writes to |:messages|.
   *
   * @param msg - (`string`) Content of the notification to show to the user.
   * @param level - (`integer?`) One of the values from |vim.log.levels|.
   * @param opts - (`table?`) Optional parameters. Unused by default.
   */
  function notify(msg?: any, level?: any, opts?: any): any;
  /**
   * Displays a notification only one time.
   *
   * Like |vim.notify()|, but subsequent calls with the same message will not
   * display a notification.
   *
   * @param msg - (`string`) Content of the notification to show to the user.
   * @param level - (`integer?`) One of the values from |vim.log.levels|.
   * @param opts - (`table?`) Optional parameters. Unused by default.
   *
   * @returns  (`boolean`) true if message was displayed, else false
   */
  function notify_once(msg?: any, level?: any, opts?: any): any;
  /**
   * Adds Lua function {fn} with namespace id {ns_id} as a listener to every,
   * yes every, input key.
   *
   * The Nvim command-line option |-w| is related but does not support
   * callbacks and cannot be toggled dynamically.
   *
   * Note: ~
   *   • {fn} will be removed on error.
   *   • {fn} will not be cleared by |nvim_buf_clear_namespace()|
   *   • {fn} will receive the keys after mappings have been evaluated
   *
   * @param fn - (`fun(key: string)?`) Function invoked on every key press.
   * @param ns_id - is specified removes
   * @param ns_id - .
   * @param ns_id - (`integer?`) Namespace ID. If nil or 0, generates and returns
   *   a new |nvim_create_namespace()| id.
   *
   * @returns  (`integer`) Namespace id associated with {fn}. Or count of all
   *  callbacks if on_key() is called without arguments.
   */
  function on_key(fn?: any, ns_id?: any): any;
  /**
   * Paste handler, invoked by |nvim_paste()| when a conforming UI (such as the
   * |TUI|) pastes text into the editor.
   *
   * Example: To remove ANSI color codes when pasting: >lua
   *     vim.paste = (function(overridden)
   *       return function(lines, phase)
   *         for i,line in ipairs(lines) do
   *           -- Scrub ANSI color codes from paste input.
   *           lines[i] = line:gsub('\27%[[0-9;mK]+', '')
   *         end
   *         overridden(lines, phase)
   *       end
   *     end)(vim.paste)
   *
   *
   * @param lines - (`string[]`) |readfile()|-style list of lines to paste.
   *   |channel-lines|
   * @param phase - (`-1|1|2|3`) -1: "non-streaming" paste: the call contains all
   *   lines. If paste is "streamed", `phase` indicates the stream
   *   state:
   *   • 1: starts the paste (exactly once)
   *   • 2: continues the paste (zero or more times)
   *   • 3: ends the paste (exactly once)
   *
   * @returns  (`boolean`) result false if client should cancel the paste.
   *
   * See also: ~
   *   • |paste|
   */
  function paste(lines?: any, phase?: any): any;
  /**
   * "Pretty prints" the given arguments and returns them unmodified.
   *
   * Example: >lua
   *     local hl_normal = vim.print(vim.api.nvim_get_hl(0, { name = 'Normal' }))
   *
   *
   * @param ... - (`any`)
   *
   * @returns  (`any`) given arguments.
   *
   * See also: ~
   *   • |vim.inspect()|
   *   • |:=|
   */
  function print(...arguments: any[]): any;
  /**
   * Gets a dict of line segment ("chunk") positions for the region from `pos1`
   * to `pos2`.
   *
   * Input and output positions are byte positions, (0,0)-indexed. "End of
   * line" column position (for example, |linewise| visual selection) is
   * returned as |v:maxcol| (big number).
   *
   * @param bufnr - (`integer`) Buffer number, or 0 for current buffer
   * @param pos1 - (`integer[]|string`) Start of region as a (line, column)
   *   tuple or |getpos()|-compatible string
   * @param pos2 - (`integer[]|string`) End of region as a (line, column)
   *   tuple or |getpos()|-compatible string
   * @param regtype - (`string`) |setreg()|-style selection type
   * @param inclusive - (`boolean`) Controls whether the ending column is
   *   inclusive (see also 'selection').
   *
   * @returns  (`table`) region Dict of the form `{linenr = {startcol,endcol}}`.
   *  `endcol` is exclusive, and whole lines are returned as
   *  `{startcol,endcol} = {0,-1}`.
   */
  function region(
    bufnr?: any,
    pos1?: any,
    pos2?: any,
    regtype?: any,
    inclusive?: any,
  ): any;
  /**
   * Returns a function which calls {fn} via |vim.schedule()|.
   *
   * The returned function passes all arguments to {fn}.
   *
   * Example: >lua
   *     function notify_readable(_err, readable)
   *       vim.notify("readable? " .. tostring(readable))
   *     end
   *     vim.uv.fs_access(vim.fn.stdpath("config"), "R", vim.schedule_wrap(notify_readable))
   *
   *
   * @param fn - (`function`)
   *
   * @returns  (`function`)
   *
   * See also: ~
   *   • |lua-loop-callbacks|
   *   • |vim.schedule()|
   *   • |vim.in_fast_event()|
   */
  function schedule_wrap(fn?: any): any;
  /**
   * Runs a system command or throws an error if {cmd} cannot be run.
   *
   * Examples: >lua
   *     local on_exit = function(obj)
   *       print(obj.code)
   *       print(obj.signal)
   *       print(obj.stdout)
   *       print(obj.stderr)
   *     end
   *
   *     -- Runs asynchronously:
   *     vim.system({'echo', 'hello'}, { text = true }, on_exit)
   *
   *     -- Runs synchronously:
   *     local obj = vim.system({'echo', 'hello'}, { text = true }):wait()
   *     -- { code = 0, signal = 0, stdout = 'hello', stderr = '' }
   *
   *
   * See |uv.spawn()| for more details. Note: unlike |uv.spawn()|, vim.system
   * throws an error if {cmd} cannot be run.
   *
   * @param cmd - (`string[]`) Command to execute
   * @param opts - (`vim.SystemOpts?`) Options:
   *   • cwd: (string) Set the current working directory for the
   *   sub-process.
   *   • env: table<string,string> Set environment variables for
   *   the new process. Inherits the current environment with
   *   `NVIM` set to |v:servername|.
   *   • clear_env: (boolean) `env` defines the job environment
   *   exactly, instead of merging current environment.
   *   • stdin: (string|string[]|boolean) If `true`, then a pipe
   *   to stdin is opened and can be written to via the
   *   `write()` method to SystemObj. If string or string[] then
   *   will be written to stdin and closed. Defaults to `false`.
   *   • stdout: (boolean|function) Handle output from stdout.
   *   When passed as a function must have the signature
   *   `fun(err: string, data: string)`. Defaults to `true`
   *   • stderr: (boolean|function) Handle output from stderr.
   *   When passed as a function must have the signature
   *   `fun(err: string, data: string)`. Defaults to `true`.
   *   • text: (boolean) Handle stdout and stderr as text.
   *   Replaces `\r\n` with `\n`.
   *   • timeout: (integer) Run the command with a time limit.
   *   Upon timeout the process is sent the TERM signal (15) and
   *   the exit code is set to 124.
   *   • detach: (boolean) If true, spawn the child process in a
   *   detached state - this will make it a process group
   *   leader, and will effectively enable the child to keep
   *   running after the parent exits. Note that the child
   *   process will still keep the parent's event loop alive
   *   unless the parent process calls |uv.unref()| on the
   *   child's process handle.
   * @param on_exit - (`fun(out: vim.SystemCompleted)?`) Called when subprocess
   *   exits. When provided, the command runs asynchronously.
   *   Receives SystemCompleted object, see return of
   *   SystemObj:wait().
   *
   * @returns  (`vim.SystemObj`) Object with the fields:
   *  • pid (integer) Process ID
   *  • wait (fun(timeout: integer|nil): SystemCompleted) Wait for the
   *  process to complete. Upon timeout the process is sent the KILL
   *  signal (9) and the exit code is set to 124. Cannot be called in
   *  |api-fast|.
   *  • SystemCompleted is an object with the fields:
   *  • code: (integer)
   *  • signal: (integer)
   *  • stdout: (string), nil if stdout argument is passed
   *  • stderr: (string), nil if stderr argument is passed
   *  • kill (fun(signal: integer|string))
   *  • write (fun(data: string|nil)) Requires `stdin=true`. Pass `nil` to
   *  close the stream.
   *  • is_closing (fun(): boolean)
   */
  function system(cmd?: any, opts?: any, on_exit?: any): any;
  /**
   * Invokes |vim-function| or |user-function| {func} with arguments {...}.
   * See also |vim.fn|.
   * Equivalent to: >lua
   *     vim.fn[func]({...})
   *
   * cmd({command})
   * See |vim.cmd()|.
   */
  function call(func?: any, ...arguments: any[]): any;
  /**
   * Global (|g:|) editor variables.
   * Key with no value returns `nil`.
   */
  let g: any;
  /**
   * Buffer-scoped (|b:|) variables for the current buffer.
   * Invalid or unset key returns `nil`. Can be indexed with
   * an integer to access variables for a specific buffer.
   */
  let b: any;
  /**
   * Window-scoped (|w:|) variables for the current window.
   * Invalid or unset key returns `nil`. Can be indexed with
   * an integer to access variables for a specific window.
   */
  let w: any;
  /**
   * Tabpage-scoped (|t:|) variables for the current tabpage.
   * Invalid or unset key returns `nil`. Can be indexed with
   * an integer to access variables for a specific tabpage.
   */
  let t: any;
  /**
   * |v:| variables.
   * Invalid or unset key returns `nil`.
   */
  let v: any;
  /**
   *
   */
  let opt: any;
  let opt_local: any;
  /**
   * Get or set buffer-scoped |options| for the buffer with number {bufnr}. If
   * [{bufnr}] is omitted then the current buffer is used. Invalid {bufnr} or
   * key is an error.
   *
   * Note: this is equivalent to `:setlocal` for |global-local| options and
   * `:set` otherwise.
   *
   * Example: >lua
   *     local bufnr = vim.api.nvim_get_current_buf()
   *     vim.bo[bufnr].buflisted = true    -- same as vim.bo.buflisted = true
   *     print(vim.bo.comments)
   *     print(vim.bo.baz)                 -- error: invalid key
   *
   */
  let bo: any;
  /**
   * Environment variables defined in the editor session. See |expand-env| and
   * |:let-environment| for the Vimscript behavior. Invalid or unset key
   * returns `nil`.
   *
   * Example: >lua
   *     vim.env.FOO = 'bar'
   *     print(vim.env.TERM)
   *
   */
  let env: any;
  /**
   * Get or set global |options|. Like `:setglobal`. Invalid key is an error.
   *
   * Note: this is different from |vim.o| because this accesses the global
   * option value and thus is mostly useful for use with |global-local|
   * options.
   *
   * Example: >lua
   *     vim.go.cmdheight = 4
   *     print(vim.go.columns)
   *     print(vim.go.bar)     -- error: invalid key
   *
   */
  let go: any;
  /**
   * Get or set |options|. Like `:set`. Invalid key is an error.
   *
   * Note: this works on both buffer-scoped and window-scoped options using the
   * current buffer and window.
   *
   * Example: >lua
   *     vim.o.cmdheight = 4
   *     print(vim.o.columns)
   *     print(vim.o.foo)     -- error: invalid key
   *
   */
  let o: any;
  /**
   * Get or set window-scoped |options| for the window with handle {winid} and
   * buffer with number {bufnr}. Like `:setlocal` if setting a |global-local|
   * option or if {bufnr} is provided, like `:set` otherwise. If [{winid}] is
   * omitted then the current window is used. Invalid {winid}, {bufnr} or key
   * is an error.
   *
   * Note: only {bufnr} with value `0` (the current buffer in the window) is
   * supported.
   *
   * Example: >lua
   *     local winid = vim.api.nvim_get_current_win()
   *     vim.wo[winid].number = true    -- same as vim.wo.number = true
   *     print(vim.wo.foldmarker)
   *     print(vim.wo.quux)             -- error: invalid key
   *     vim.wo[winid][0].spell = false -- like ':setlocal nospell'
   *
   */
  let wo: any;
  /**
   * Get a URI from a bufnr
   *
   * @param bufnr - (number): Buffer number
   *
   * @returns  URI
   */
  function uri_from_bufnr(bufnr?: any): any;
  /**
   * Get a URI from a file path.
   *
   * @param path - (string): Path to file
   *
   * @returns  URI
   */
  function uri_from_fname(path?: any): any;
  /**
   * Return or create a buffer for a uri.
   *
   * @param uri - (string): The URI
   *
   * @returns  bufnr.
   *
   * Note:
   *     Creates buffer but does not load it
   */
  function uri_to_bufnr(uri?: any): any;
  /**
   * Get a filename from a URI
   *
   * @param uri - (string): The URI
   *
   * @returns  Filename
   *
   * ft=help:norl:
   */
  function uri_to_fname(uri?: any): any;
  /**
   * Gets the version of the current Nvim build.
   */
  function version(): any;
  /**
   * Returns true if the code is executing as part of a "fast" event
   * handler, where most of the API is disabled. These are low-level events
   * (e.g. |lua-loop-callbacks|) which can be invoked whenever Nvim polls
   * for input.  When this is `false` most API functions are callable (but
   * may be subject to other restrictions such as |textlock|).
   */
  function in_fast_event(): any;
  /**
   * Special value representing NIL in |RPC| and |v:null| in Vimscript
   * conversion, and similar cases. Lua `nil` cannot be used as part of
   * a Lua table representing a Dictionary or Array, because it is
   * treated as missing: `{"foo", nil}` is the same as `{"foo"}`.
   */
  let NIL: any;
  /**
   * Creates a special empty table (marked with a metatable), which Nvim
   * converts to an empty dictionary when translating Lua values to
   * Vimscript or API types. Nvim by default converts an empty table `{}`
   * without this metatable to an list/array.
   *
   * Note: if numeric keys are present in the table, Nvim ignores the
   * metatable marker and converts the dict to a list/array anyway.
   */
  function empty_dict(): any;
  /**
   * Sends {event} to {channel} via |RPC| and returns immediately. If
   * {channel} is 0, the event is broadcast to all channels.
   *
   * This function also works in a fast callback |lua-loop-callbacks|.
   */
  function rpcnotify(channel?: any, method?: any, ...arguments: any[]): any;
  /**
   * Sends a request to {channel} to invoke {method} via |RPC| and blocks
   * until a response is received.
   *
   * Note: NIL values as part of the return value is represented as
   * |vim.NIL| special value
   */
  function rpcrequest(channel?: any, method?: any, ...arguments: any[]): any;
  /**
   * Compares strings case-insensitively.  Returns 0, 1 or -1 if strings
   * are equal, {a} is greater than {b} or {a} is lesser than {b},
   * respectively.
   */
  function stricmp(a?: any, b?: any): any;
  /**
   * Convert byte index to UTF-32 and UTF-16 indicies. If {index} is not
   * supplied, the length of the string is used. All indicies are zero-based.
   * Returns two values: the UTF-32 and UTF-16 indicies respectively.
   *
   * Embedded NUL bytes are treated as terminating the string. Invalid
   * UTF-8 bytes, and embedded surrogates are counted as one code
   * point each. An {index} in the middle of a UTF-8 sequence is rounded
   * upwards to the end of that sequence.
   */
  function str_utfindex(str?: any, index?: any): any;
  /**
   * Convert UTF-32 or UTF-16 {index} to byte index. If {use_utf16} is not
   * supplied, it defaults to false (use UTF-32). Returns the byte index.
   *
   * Invalid UTF-8 and NUL is treated like by |vim.str_byteindex()|. An {index}
   * in the middle of a UTF-16 sequence is rounded upwards to the end of that
   * sequence.
   */
  function str_byteindex(str?: any, index?: any, use_utf16?: any): any;
  /**
   * Schedules {callback} to be invoked soon by the main event-loop. Useful
   * to avoid |textlock| or other temporary restrictions.
   */
  function schedule(callback?: any): any;
  /**
   * Defers calling {fn} until {timeout} ms passes.  Use to do a one-shot timer
   * that calls {fn}.
   *
   * Note: The {fn} is |schedule_wrap|ped automatically, so API functions are
   * safe to call.
   *
   * @param fn - Callback to call once {timeout} expires
   * @param timeout - Time in ms to wait before calling {fn}
   *
   * Returns: ~
   *     |vim.loop|.new_timer() object
   */
  function defer_fn(fn?: any, timeout?: any): any;
  /**
   * Wait for {time} in milliseconds until {callback} returns `true`.
   *
   * Executes {callback} immediately and at approximately {interval}
   * milliseconds (default 200). Nvim still processes other events during
   * this time.
   *
   * meters: ~
   * {time}      Number of milliseconds to wait
   * {callback}  Optional callback. Waits until {callback} returns true
   * {interval}  (Approximate) number of milliseconds to wait between polls
   * {fast_only} If true, only |api-fast| events will be processed.
   *                 If called from while in an |api-fast| event, will
   *                 automatically be set to `true`.
   *
   * rns: ~
   * If {callback} returns `true` during the {time}:
   *     `true, nil`
   *
   * If {callback} never returns `true` during the {time}:
   *     `false, -1`
   *
   * If {callback} is interrupted during the {time}:
   *     `false, -2`
   *
   * If {callback} errors, the error is raised.
   *
   * Examples: >
   *
   *
   * ait for 100 ms, allowing other events to process
   * wait(100, function() end)
   *
   *
   * ait for 100 ms or until global variable set.
   * wait(100, function() return vim.g.waiting_for_var end)
   *
   *
   * ait for 1 second or until global variable set, checking every ~500 ms
   * wait(1000, function() return vim.g.waiting_for_var end, 500)
   *
   *
   * chedule a function to set a value in 100ms
   * defer_fn(function() vim.g.timer_result = true end, 100)
   *
   * ould wait ten seconds if results blocked. Actually only waits  100 ms
   * im.wait(10000, function() return vim.g.timer_result end) then
   * int('Only waiting a little bit of time!')
   *
   *
   */
  function wait(
    time?: any,
    callback?: any,
    interval?: any,
    fast_only?: any,
  ): any;
  /**
   * Type index for use in |lua-special-tbl|.  Specifying one of the values
   * from |vim.types| allows typing the empty table (it is unclear whether
   * empty Lua table represents empty list or empty array) and forcing
   * integral numbers to be |Float|.  See |lua-special-tbl| for more
   * details.
   */
  let type_idx: any;
  /**
   * Value index for tables representing |Float|s.  A table representing
   * floating-point value 1.0 looks like this: >
   *     {
   *       [vim.type_idx] = vim.types.float,
   *       [vim.val_idx] = 1.0,
   *     }
   * See also |vim.type_idx| and |lua-special-tbl|.
   */
  let val_idx: any;
  /**
   * Table with possible values for |vim.type_idx|.  Contains two sets of
   * key-value pairs: first maps possible values for |vim.type_idx| to
   * human-readable strings, second maps human-readable type names to
   * values for |vim.type_idx|.  Currently contains pairs for `float`,
   * `array` and `dictionary` types.
   *
   * Note: one must expect that values corresponding to `vim.types.float`,
   * `vim.types.array` and `vim.types.dictionary` fall under only two
   * following assumptions:
   * 1. Value may serve both as a key and as a value in a table.  Given the
   *    properties of Lua tables this basically means “value is not `nil`”.
   * 2. For each value in `vim.types` table `vim.types[vim.types[value]]`
   *    is the same as `value`.
   * No other restrictions are put on types, and it is not guaranteed that
   * values corresponding to `vim.types.float`, `vim.types.array` and
   * `vim.types.dictionary` will not change or that `vim.types` table will
   * only contain values for these three types.
   */
  const types: any;
  const fn: fn;
  const api: api;
  function tbl_extend(
    behavior: "error" | "keep" | "force",
    ...tables: any[]
  ): any;
  const log: {
    levels: {
      DEBUG: 0;
      INFO: 1;
      WARN: 2;
      ERROR: 3;
      TRACE: 4;
      OFF: 5;
    };
  };
  const keymap: keymap;
  const split: (
    s: string,
    sep: string,
    options?: { plain?: boolean; trimempty?: boolean },
  ) => string[];
}
