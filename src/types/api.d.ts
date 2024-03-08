/** @noSelf **/
interface api {
  /**
   * Find files in runtime directories
   *
   * Attributes: ~
   *     |api-fast|
   *
   * @param pat - pattern of files to search for
   * @param all - whether to return all matches or only the first
   * @param opts - is_lua: only search Lua subdirs
   *
   * @returns  list of absolute paths to the found files
   */
  nvim__get_runtime: (pat?: any, all?: any, opts?: any) => any;
  /**
   * Returns object given as argument.
   *
   * This API function is used for testing. One should not rely on its presence
   * in plugins.
   *
   * @param obj - Object to return.
   *
   * @returns  its argument.
   */
  nvim__id: (obj?: any) => any;
  /**
   * Returns array given as argument.
   *
   * This API function is used for testing. One should not rely on its presence
   * in plugins.
   *
   * @param arr - Array to return.
   *
   * @returns  its argument.
   */
  nvim__id_array: (arr?: any) => any;
  /**
   * Returns dictionary given as argument.
   *
   * This API function is used for testing. One should not rely on its presence
   * in plugins.
   *
   * @param dct - Dictionary to return.
   *
   * @returns  its argument.
   */
  nvim__id_dictionary: (dct?: any) => any;
  /**
   * Returns floating-point value given as argument.
   *
   * This API function is used for testing. One should not rely on its presence
   * in plugins.
   *
   * @param flt - Value to return.
   *
   * @returns  its argument.
   */
  nvim__id_float: (flt?: any) => any;
  /**
   * NB: if your UI doesn't use hlstate, this will not return hlstate first
   * time.
   */
  nvim__inspect_cell: (grid?: any, row?: any, col?: any) => any;
  /**
   * For testing. The condition in schar_cache_clear_if_full is hard to reach,
   * so this function can be used to force a cache clear in a test.
   */
  nvim__invalidate_glyph_cache: () => any;
  /**
   * Gets internal stats.
   *
   * @returns  Map of various internal stats.
   */
  nvim__stats: () => any;
  /**
   * Calls many API methods atomically.
   *
   * This has two main usages:
   * 1. To perform several requests from an async context atomically, i.e.
   *    without interleaving redraws, RPC requests from other clients, or user
   *    interactions (however API methods may trigger autocommands or event
   *    processing which have such side effects, e.g. |:sleep| may wake
   *    timers).
   * 2. To minimize RPC overhead (roundtrips) of a sequence of many requests.
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param calls - an array of calls, where each call is described by an array
   *   with two elements: the request name, and an array of
   *   arguments.
   *
   * @returns  Array of two elements. The first is an array of return values. The
   *  second is NIL if all calls succeeded. If a call resulted in an error,
   *  it is a three-element array with the zero-based index of the call
   *  which resulted in an error, the error type and the error message. If
   *  an error occurred, the values from all preceding calls will still be
   *  returned.
   */
  nvim_call_atomic: (calls?: any) => any;
  /**
   * Send data to channel `id`. For a job, it writes it to the stdin of the
   * process. For the stdio channel |channel-stdio|, it writes to Nvim's
   * stdout. For an internal terminal instance (|nvim_open_term()|) it writes
   * directly to terminal output. See |channel-bytes| for more information.
   *
   * This function writes raw data, not RPC messages. If the channel was
   * created with `rpc=true` then the channel expects RPC messages, use
   * |vim.rpcnotify()| and |vim.rpcrequest()| instead.
   *
   * Attributes: ~
   *     |RPC| only
   *     Lua |vim.api| only
   *
   * @param chan - id of the channel
   * @param data - data to write. 8-bit clean: can contain NUL bytes.
   */
  nvim_chan_send: (chan?: any, data?: any) => any;
  /**
   * Set info for the completion candidate index. if the info was shown in a
   * window, then the window and buffer ids are returned for further
   * customization. If the text was not shown, an empty dict is returned.
   *
   * @param index - the completion candidate index
   * @param opts - Optional parameters.
   *   • info: (string) info text.
   *
   * @returns  Dictionary containing these keys:
   *  • winid: (number) floating window id
   *  • bufnr: (number) buffer id in floating window
   */
  nvim_complete_set: (index?: any, opts?: any) => any;
  /**
   * Creates a new, empty, unnamed buffer.
   *
   * @param listed - Sets 'buflisted'
   * @param scratch - Creates a "throwaway" |scratch-buffer| for temporary work
   *   (always 'nomodified'). Also sets 'nomodeline' on the
   *   buffer.
   *
   * @returns  Buffer handle, or 0 on error
   *
   * See also: ~
   *   • buf_open_scratch
   */
  nvim_create_buf: (listed?: any, scratch?: any) => any;
  /**
   * Deletes the current line.
   *
   * Attributes: ~
   *     not allowed when |textlock| is active
   */
  nvim_del_current_line: () => any;
  /**
   * Unmaps a global |mapping| for the given mode.
   *
   * To unmap a buffer-local mapping, use |nvim_buf_del_keymap()|.
   *
   * See also: ~
   *   • |nvim_set_keymap()|
   */
  nvim_del_keymap: (mode?: any, lhs?: any) => any;
  /**
   * Deletes an uppercase/file named mark. See |mark-motions|.
   *
   * Note: ~
   *   • Lowercase name (or other buffer-local mark) is an error.
   *
   * @param name - Mark name
   *
   * @returns  true if the mark was deleted, else false.
   *
   * See also: ~
   *   • |nvim_buf_del_mark()|
   *   • |nvim_get_mark()|
   */
  nvim_del_mark: (name?: any) => any;
  /**
   * Removes a global (g:) variable.
   *
   * @param name - Variable name
   */
  nvim_del_var: (name?: any) => any;
  /**
   * Echo a message.
   *
   * @param chunks - A list of [text, hl_group] arrays, each representing a text
   *   chunk with specified highlight. `hl_group` element can be
   *   omitted for no highlight.
   * @param history - if true, add to |message-history|.
   * @param opts - Optional parameters.
   *   • verbose: Message was printed as a result of 'verbose'
   *   option if Nvim was invoked with -V3log_file, the message
   *   will be redirected to the log_file and suppressed from
   *   direct output.
   */
  nvim_echo: (chunks?: any, history?: any, opts?: any) => any;
  /**
   * Writes a message to the Vim error buffer. Does not append "\n", the
   * message is buffered (won't display) until a linefeed is written.
   *
   * @param str - Message
   */
  nvim_err_write: (str?: any) => any;
  /**
   * Writes a message to the Vim error buffer. Appends "\n", so the buffer is
   * flushed (and displayed).
   *
   * @param str - Message
   *
   * See also: ~
   *   • nvim_err_write()
   */
  nvim_err_writeln: (str?: any) => any;
  /**
   * Evaluates statusline string.
   *
   * Attributes: ~
   *     |api-fast|
   *
   * @param str - Statusline string (see 'statusline').
   * @param opts - Optional parameters.
   *   • winid: (number) |window-ID| of the window to use as context
   *   for statusline.
   *   • maxwidth: (number) Maximum width of statusline.
   *   • fillchar: (string) Character to fill blank spaces in the
   *   statusline (see 'fillchars'). Treated as single-width even
   *   if it isn't.
   *   • highlights: (boolean) Return highlight information.
   *   • use_winbar: (boolean) Evaluate winbar instead of statusline.
   *   • use_tabline: (boolean) Evaluate tabline instead of
   * @param winid - is ignored. Mutually
   * @param use_winbar - .
   *   • use_statuscol_lnum: (number) Evaluate statuscolumn for this
   *   line number instead of statusline.
   *
   * @returns  Dictionary containing statusline information, with these keys:
   *  • str: (string) Characters that will be displayed on the statusline.
   *  • width: (number) Display width of the statusline.
   *  • highlights: Array containing highlight information of the
   *  statusline. Only included when the "highlights" key in {opts} is
   *  true. Each element of the array is a |Dictionary| with these keys:
   *  • start: (number) Byte index (0-based) of first character that uses
   *  the highlight.
   *  • group: (string) Name of highlight group.
   */
  nvim_eval_statusline: (str?: any, opts?: any) => any;
  /**
   * Execute Lua code. Parameters (if any) are available as `...` inside the
   * chunk. The chunk can return a value.
   *
   * Only statements are executed. To evaluate an expression, prefix it with
   * `return`: return my_function(...)
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param code - Lua code to execute
   * @param args - Arguments to the code
   *
   * @returns  Return value of Lua code if present or NIL.
   */
  nvim_exec_lua: (code?: any, args?: any) => any;
  /**
   * Sends input-keys to Nvim, subject to various quirks controlled by `mode`
   * flags. This is a blocking call, unlike |nvim_input()|.
   *
   * On execution error: does not fail, but updates v:errmsg.
   *
   * To input sequences like <C-o> use |nvim_replace_termcodes()| (typically
   * with escape_ks=false) to replace |keycodes|, then pass the result to
   * nvim_feedkeys().
   *
   * Example: >vim
   *     :let key = nvim_replace_termcodes("<C-o>", v:true, v:false, v:true)
   *     :call nvim_feedkeys(key, 'n', v:false)
   *
   *
   * @param keys - to be typed
   * @param mode - behavior flags, see |feedkeys()|
   * @param escape_ks - If true, escape K_SPECIAL bytes in `keys`. This should be
   *   false if you already used |nvim_replace_termcodes()|, and
   *   true otherwise.
   *
   * See also: ~
   *   • feedkeys()
   *   • vim_strsave_escape_ks
   */
  nvim_feedkeys: (keys?: any, mode?: any, escape_ks?: any) => any;
  /**
   * Returns a 2-tuple (Array), where item 0 is the current channel id and item
   * 1 is the |api-metadata| map (Dictionary).
   *
   * Attributes: ~
   *     |api-fast|
   *     |RPC| only
   *
   * @returns  2-tuple [{channel-id}, {api-metadata}]
   */
  nvim_get_api_info: () => any;
  /**
   * Gets information about a channel.
   *
   * @param chan - channel_id, or 0 for current channel
   *
   * @returns  Dictionary describing a channel, with these keys:
   *  • "id" Channel id.
   *  • "argv" (optional) Job arguments list.
   *  • "stream" Stream underlying the channel.
   *  • "stdio" stdin and stdout of this Nvim instance
   *  • "stderr" stderr of this Nvim instance
   *  • "socket" TCP/IP socket or named pipe
   *  • "job" Job with communication over its stdio.
   *  • "mode" How data received on the channel is interpreted.
   *  • "bytes" Send and receive raw bytes.
   *  • "terminal" |terminal| instance interprets ASCII sequences.
   *  • "rpc" |RPC| communication on the channel is active.
   *  • "pty" (optional) Name of pseudoterminal. On a POSIX system this is a
   *  device path like "/dev/pts/1". If the name is unknown, the key will
   *  still be present if a pty is used (e.g. for conpty on Windows).
   *  • "buffer" (optional) Buffer with connected |terminal| instance.
   *  • "client" (optional) Info about the peer (client on the other end of
   *  the RPC channel), if provided by it via |nvim_set_client_info()|.
   */
  nvim_get_chan_info: (chan?: any) => any;
  /**
   * Returns the 24-bit RGB value of a |nvim_get_color_map()| color name or
   * "#rrggbb" hexadecimal string.
   *
   * Example: >vim
   *     :echo nvim_get_color_by_name("Pink")
   *     :echo nvim_get_color_by_name("#cbcbcb")
   *
   *
   * @param name - Color name or "#rrggbb" string
   *
   * @returns  24-bit RGB value, or -1 for invalid argument.
   */
  nvim_get_color_by_name: (name?: any) => any;
  /**
   * Returns a map of color names and RGB values.
   *
   * Keys are color names (e.g. "Aqua") and values are 24-bit RGB color values
   * (e.g. 65535).
   *
   * @returns  Map of color names and RGB values.
   */
  nvim_get_color_map: () => any;
  /**
   * Gets a map of the current editor state.
   *
   * @param opts - Optional parameters.
   *   • types: List of |context-types| ("regs", "jumps", "bufs",
   *   "gvars", …) to gather, or empty for "all".
   *
   * @returns  map of global |context|.
   */
  nvim_get_context: (opts?: any) => any;
  /**
   * Gets the current buffer.
   *
   * @returns  Buffer handle
   */
  nvim_get_current_buf: () => any;
  /**
   * Gets the current line.
   *
   * @returns  Current line string
   */
  nvim_get_current_line: () => any;
  /**
   * Gets the current tabpage.
   *
   * @returns  Tabpage handle
   */
  nvim_get_current_tabpage: () => any;
  /**
   * Gets the current window.
   *
   * @returns  Window handle
   */
  nvim_get_current_win: () => any;
  /**
   * Gets all or specific highlight groups in a namespace.
   *
   * Note: ~
   *   • When the `link` attribute is defined in the highlight definition map,
   *     other attributes will not be taking effect (see |:hi-link|).
   *
   * @param ns_id - Get highlight groups for namespace ns_id
   *   |nvim_get_namespaces()|. Use 0 to get global highlight groups
   *   |:highlight|.
   * @param opts - Options dict:
   *   • name: (string) Get a highlight definition by name.
   *   • id: (integer) Get a highlight definition by id.
   *   • link: (boolean, default true) Show linked group name
   *   instead of effective definition |:hi-link|.
   *   • create: (boolean, default true) When highlight group
   *   doesn't exist create it.
   *
   * @returns  Highlight groups as a map from group name to a highlight definition
   *  map as in |nvim_set_hl()|, or only a single highlight definition map
   *  if requested by name or id.
   */
  nvim_get_hl: (ns_id?: any, opts?: any) => any;
  /**
   * Gets a highlight group by name
   *
   * similar to |hlID()|, but allocates a new ID if not present.
   */
  nvim_get_hl_id_by_name: (name?: any) => any;
  /**
   * Gets the active highlight namespace.
   *
   * @param opts - Optional parameters
   *   • winid: (number) |window-ID| for retrieving a window's
   *   highlight namespace. A value of -1 is returned when
   *   |nvim_win_set_hl_ns()| has not been called for the window
   *   (or was called with a namespace of -1).
   *
   * @returns  Namespace id, or -1
   */
  nvim_get_hl_ns: (opts?: any) => any;
  /**
   * Gets a list of global (non-buffer-local) |mapping| definitions.
   *
   * @param mode - Mode short-name ("n", "i", "v", ...)
   *
   * @returns  Array of |maparg()|-like dictionaries describing mappings. The
   *  "buffer" key is always zero.
   */
  nvim_get_keymap: (mode?: any) => any;
  /**
   * Returns a `(row, col, buffer, buffername)` tuple representing the position
   * of the uppercase/file named mark. "End of line" column position is
   * returned as |v:maxcol| (big number). See |mark-motions|.
   *
   * Marks are (1,0)-indexed. |api-indexing|
   *
   * Note: ~
   *   • Lowercase name (or other buffer-local mark) is an error.
   *
   * @param name - Mark name
   * @param opts - Optional parameters. Reserved for future use.
   *
   * @returns  4-tuple (row, col, buffer, buffername), (0, 0, 0, '') if the mark is
   *  not set.
   *
   * See also: ~
   *   • |nvim_buf_set_mark()|
   *   • |nvim_del_mark()|
   */
  nvim_get_mark: (name?: any, opts?: any) => any;
  /**
   * Gets the current mode. |mode()| "blocking" is true if Nvim is waiting for
   * input.
   *
   * Attributes: ~
   *     |api-fast|
   *
   * @returns  Dictionary { "mode": String, "blocking": Boolean }
   */
  nvim_get_mode: () => any;
  /**
   * Gets info describing process `pid`.
   *
   * @returns  Map of process properties, or NIL if process not found.
   */
  nvim_get_proc: (pid?: any) => any;
  /**
   * Gets the immediate children of process `pid`.
   *
   * @returns  Array of child process ids, empty if process not found.
   */
  nvim_get_proc_children: (pid?: any) => any;
  /**
   * Find files in runtime directories
   *
   * "name" can contain wildcards. For example
   * nvim_get_runtime_file("colors/‍*.vim", true) will return all color scheme
   * files. Always use forward slashes (/) in the search pattern for
   * subdirectories regardless of platform.
   *
   * It is not an error to not find any files. An empty array is returned then.
   *
   * Attributes: ~
   *     |api-fast|
   *
   * @param name - pattern of files to search for
   * @param all - whether to return all matches or only the first
   *
   * @returns  list of absolute paths to the found files
   */
  nvim_get_runtime_file: (name?: any, all?: any) => any;
  /**
   * Gets a global (g:) variable.
   *
   * @param name - Variable name
   *
   * @returns  Variable value
   */
  nvim_get_var: (name?: any) => any;
  /**
   * Gets a v: variable.
   *
   * @param name - Variable name
   *
   * @returns  Variable value
   */
  nvim_get_vvar: (name?: any) => any;
  /**
   * Queues raw user-input. Unlike |nvim_feedkeys()|, this uses a low-level
   * input buffer and the call is non-blocking (input is processed
   * asynchronously by the eventloop).
   *
   * On execution error: does not fail, but updates v:errmsg.
   *
   * Note: ~
   *   • |keycodes| like <CR> are translated, so "<" is special. To input a
   *     literal "<", send <LT>.
   *   • For mouse events use |nvim_input_mouse()|. The pseudokey form
   *     "<LeftMouse><col,row>" is deprecated since |api-level| 6.
   *
   * Attributes: ~
   *     |api-fast|
   *
   * @param keys - to be typed
   *
   * @returns  Number of bytes actually written (can be fewer than requested if the
   *  buffer becomes full).
   */
  nvim_input: (keys?: any) => any;
  /**
   * Send mouse event from GUI.
   *
   * Non-blocking: does not wait on any result, but queues the event to be
   * processed soon by the event loop.
   *
   * Note: ~
   *   • Currently this doesn't support "scripting" multiple mouse events by
   *     calling it multiple times in a loop: the intermediate mouse positions
   *     will be ignored. It should be used to implement real-time mouse input
   *     in a GUI. The deprecated pseudokey form ("<LeftMouse><col,row>") of
   *     |nvim_input()| has the same limitation.
   *
   * Attributes: ~
   *     |api-fast|
   *
   * @param button - Mouse button: one of "left", "right", "middle", "wheel",
   *   "move", "x1", "x2".
   * @param action - For ordinary buttons, one of "press", "drag", "release".
   *   For the wheel, one of "up", "down", "left", "right".
   *   Ignored for "move".
   * @param modifier - String of modifiers each represented by a single char. The
   *   same specifiers are used as for a key press, except that
   *   the "-" separator is optional, so "C-A-", "c-a" and "CA"
   *   can all be used to specify Ctrl+Alt+click.
   * @param grid - Grid number if the client uses |ui-multigrid|, else 0.
   * @param row - Mouse row-position (zero-based, like redraw events)
   * @param col - Mouse column-position (zero-based, like redraw events)
   */
  nvim_input_mouse: (
    button?: any,
    action?: any,
    modifier?: any,
    grid?: any,
    row?: any,
    col?: any,
  ) => any;
  /**
   * Gets the current list of buffer handles
   *
   * Includes unlisted (unloaded/deleted) buffers, like `:ls!`. Use
   * |nvim_buf_is_loaded()| to check if a buffer is loaded.
   *
   * @returns  List of buffer handles
   */
  nvim_list_bufs: () => any;
  /**
   * Get information about all open channels.
   *
   * @returns  Array of Dictionaries, each describing a channel with the format
   *  specified at |nvim_get_chan_info()|.
   */
  nvim_list_chans: () => any;
  /**
   * Gets the paths contained in |runtime-search-path|.
   *
   * @returns  List of paths
   */
  nvim_list_runtime_paths: () => any;
  /**
   * Gets the current list of tabpage handles.
   *
   * @returns  List of tabpage handles
   */
  nvim_list_tabpages: () => any;
  /**
   * Gets a list of dictionaries representing attached UIs.
   *
   * @returns  Array of UI dictionaries, each with these keys:
   *  • "height" Requested height of the UI
   *  • "width" Requested width of the UI
   *  • "rgb" true if the UI uses RGB colors (false implies |cterm-colors|)
   *  • "ext_..." Requested UI extensions, see |ui-option|
   *  • "chan" |channel-id| of remote UI
   */
  nvim_list_uis: () => any;
  /**
   * Gets the current list of window handles.
   *
   * @returns  List of window handles
   */
  nvim_list_wins: () => any;
  /**
   * Sets the current editor state from the given |context| map.
   *
   * @param dict - |Context| map.
   */
  nvim_load_context: (dict?: any) => any;
  /**
   * Notify the user with a message
   *
   * Relays the call to vim.notify . By default forwards your message in the
   * echo area but can be overridden to trigger desktop notifications.
   *
   * @param msg - Message to display to the user
   * @param log_level - The log level
   * @param opts - Reserved for future use.
   */
  nvim_notify: (msg?: any, log_level?: any, opts?: any) => any;
  /**
   * Open a terminal instance in a buffer
   *
   * By default (and currently the only option) the terminal will not be
   * connected to an external process. Instead, input send on the channel will
   * be echoed directly by the terminal. This is useful to display ANSI
   * terminal sequences returned as part of a rpc message, or similar.
   *
   * Note: to directly initiate the terminal using the right size, display the
   * buffer in a configured window before calling this. For instance, for a
   * floating display, first create an empty buffer using |nvim_create_buf()|,
   * then display it using |nvim_open_win()|, and then call this function. Then
   * |nvim_chan_send()| can be called immediately to process sequences in a
   * virtual terminal having the intended size.
   *
   * Attributes: ~
   *     not allowed when |textlock| is active
   *
   * @param buffer - the buffer to use (expected to be empty)
   * @param opts - Optional parameters.
   *   • on_input: Lua callback for input sent, i e keypresses in
   *   terminal mode. Note: keypresses are sent raw as they would
   *   be to the pty master end. For instance, a carriage return
   *   is sent as a "\r", not as a "\n". |textlock| applies. It
   *   is possible to call |nvim_chan_send()| directly in the
   *   callback however. ["input", term, bufnr, data]
   *   • force_crlf: (boolean, default true) Convert "\n" to
   *   "\r\n".
   *
   * @returns  Channel id, or 0 on error
   */
  nvim_open_term: (buffer?: any, opts?: any) => any;
  /**
   * Writes a message to the Vim output buffer. Does not append "\n", the
   * message is buffered (won't display) until a linefeed is written.
   *
   * @param str - Message
   */
  nvim_out_write: (str?: any) => any;
  /**
   * Pastes at cursor, in any mode.
   *
   * Invokes the `vim.paste` handler, which handles each mode appropriately.
   * Sets redo/undo. Faster than |nvim_input()|. Lines break at LF ("\n").
   *
   * Errors ('nomodifiable', `vim.paste()` failure, …) are reflected in `err`
   * but do not affect the return value (which is strictly decided by
   * `vim.paste()`). On error, subsequent calls are ignored ("drained") until
   * the next paste is initiated (phase 1 or -1).
   *
   * Attributes: ~
   *     not allowed when |textlock| is active
   *
   * @param data - Multiline input. May be binary (containing NUL bytes).
   * @param crlf - Also break lines at CR and CRLF.
   * @param phase - -1: paste in a single call (i.e. without streaming). To
   *   "stream" a paste, call `nvim_paste` sequentially with these
   *   `phase` values:
   *   • 1: starts the paste (exactly once)
   *   • 2: continues the paste (zero or more times)
   *   • 3: ends the paste (exactly once)
   *
   * @returns  • true: Client may continue pasting.
   *  • false: Client must cancel the paste.
   */
  nvim_paste: (data?: any, crlf?: any, phase?: any) => any;
  /**
   * Puts text at cursor, in any mode.
   *
   * Compare |:put| and |p| which are always linewise.
   *
   * Attributes: ~
   *     not allowed when |textlock| is active
   *
   * @param lines - |readfile()|-style list of lines. |channel-lines|
   * @param type - Edit behavior: any |getregtype()| result, or:
   *   • "b" |blockwise-visual| mode (may include width, e.g. "b3")
   *   • "c" |charwise| mode
   *   • "l" |linewise| mode
   *   • "" guess by contents, see |setreg()|
   * @param after - If true insert after cursor (like |p|), or before (like
   *   |P|).
   * @param follow - If true place cursor at end of inserted text.
   */
  nvim_put: (lines?: any, type?: any, after?: any, follow?: any) => any;
  /**
   * Replaces terminal codes and |keycodes| (<CR>, <Esc>, ...) in a string with
   * the internal representation.
   *
   * @param str - String to be converted.
   * @param from_part - Legacy Vim parameter. Usually true.
   * @param do_lt - Also translate <lt>. Ignored if `special` is false.
   * @param special - Replace |keycodes|, e.g. <CR> becomes a "\r" char.
   *
   * See also: ~
   *   • replace_termcodes
   *   • cpoptions
   */
  nvim_replace_termcodes: (
    str?: any,
    from_part?: any,
    do_lt?: any,
    special?: any,
  ) => any;
  /**
   * Selects an item in the completion popup menu.
   *
   * If neither |ins-completion| nor |cmdline-completion| popup menu is active
   * this API call is silently ignored. Useful for an external UI using
   * |ui-popupmenu| to control the popup menu with the mouse. Can also be used
   * in a mapping; use <Cmd> |:map-cmd| or a Lua mapping to ensure the mapping
   * doesn't end completion mode.
   *
   * @param item - Index (zero-based) of the item to select. Value of -1
   *   selects nothing and restores the original text.
   * @param insert - For |ins-completion|, whether the selection should be
   *   inserted in the buffer. Ignored for |cmdline-completion|.
   * @param finish - Finish the completion and dismiss the popup menu. Implies
   * @param insert - .
   * @param opts - Optional parameters. Reserved for future use.
   */
  nvim_select_popupmenu_item: (
    item?: any,
    insert?: any,
    finish?: any,
    opts?: any,
  ) => any;
  /**
   * Self-identifies the client.
   *
   * The client/plugin/application should call this after connecting, to
   * provide hints about its identity and purpose, for debugging and
   * orchestration.
   *
   * Can be called more than once; the caller should merge old info if
   * appropriate. Example: library first identifies the channel, then a plugin
   * using that library later identifies itself.
   *
   * Note: ~
   *   • "Something is better than nothing". You don't need to include all the
   *     fields.
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param name - Short name for the connected client
   * @param version - Dictionary describing the version, with these (optional)
   *   keys:
   *   • "major" major version (defaults to 0 if not set, for
   *   no release yet)
   *   • "minor" minor version
   *   • "patch" patch number
   *   • "prerelease" string describing a prerelease, like
   *   "dev" or "beta1"
   *   • "commit" hash or similar identifier of commit
   * @param type - Must be one of the following values. Client libraries
   *   should default to "remote" unless overridden by the
   *   user.
   *   • "remote" remote client connected "Nvim flavored"
   *   MessagePack-RPC (responses must be in reverse order of
   *   requests). |msgpack-rpc|
   *   • "msgpack-rpc" remote client connected to Nvim via
   *   fully MessagePack-RPC compliant protocol.
   *   • "ui" gui frontend
   *   • "embedder" application using Nvim as a component (for
   *   example, IDE/editor implementing a vim mode).
   *   • "host" plugin host, typically started by nvim
   *   • "plugin" single plugin, started by nvim
   * @param methods - Builtin methods in the client. For a host, this does not
   *   include plugin methods which will be discovered later.
   *   The key should be the method name, the values are dicts
   *   with these (optional) keys (more keys may be added in
   *   future versions of Nvim, thus unknown keys are ignored.
   *   Clients must only use keys defined in this or later
   *   versions of Nvim):
   *   • "async" if true, send as a notification. If false or
   *   unspecified, use a blocking request
   *   • "nargs" Number of arguments. Could be a single integer
   *   or an array of two integers, minimum and maximum
   *   inclusive.
   * @param attributes - Arbitrary string:string map of informal client
   *   properties. Suggested keys:
   *   • "website": Client homepage URL (e.g. GitHub
   *   repository)
   *   • "license": License description ("Apache 2", "GPLv3",
   *   "MIT", …)
   *   • "logo": URI or path to image, preferably small logo or
   *   icon. .png or .svg format is preferred.
   */
  nvim_set_client_info: (
    name?: any,
    version?: any,
    type?: any,
    methods?: any,
    attributes?: any,
  ) => any;
  /**
   * Sets the current buffer.
   *
   * Attributes: ~
   *     not allowed when |textlock| is active or in the |cmdwin|
   *
   * @param buffer - Buffer handle
   */
  nvim_set_current_buf: (buffer?: any) => any;
  /**
   * Changes the global working directory.
   *
   * @param dir - Directory path
   */
  nvim_set_current_dir: (dir?: any) => any;
  /**
   * Sets the current line.
   *
   * Attributes: ~
   *     not allowed when |textlock| is active
   *
   * @param line - Line contents
   */
  nvim_set_current_line: (line?: any) => any;
  /**
   * Sets the current tabpage.
   *
   * Attributes: ~
   *     not allowed when |textlock| is active or in the |cmdwin|
   *
   * @param tabpage - Tabpage handle
   */
  nvim_set_current_tabpage: (tabpage?: any) => any;
  /**
   * Sets the current window.
   *
   * Attributes: ~
   *     not allowed when |textlock| is active or in the |cmdwin|
   *
   * @param window - Window handle
   */
  nvim_set_current_win: (window?: any) => any;
  /**
   * Sets a highlight group.
   *
   * Note: ~
   *   • Unlike the `:highlight` command which can update a highlight group,
   *     this function completely replaces the definition. For example:
   *     `nvim_set_hl(0, 'Visual', {})` will clear the highlight group
   *     'Visual'.
   *   • The fg and bg keys also accept the string values `"fg"` or `"bg"`
   *     which act as aliases to the corresponding foreground and background
   *     values of the Normal group. If the Normal group has not been defined,
   *     using these values results in an error.
   *   • If `link` is used in combination with other attributes; only the
   *     `link` will take effect (see |:hi-link|).
   *
   * @param ns_id - Namespace id for this highlight |nvim_create_namespace()|.
   *   Use 0 to set a highlight group globally |:highlight|.
   *   Highlights from non-global namespaces are not active by
   *   default, use |nvim_set_hl_ns()| or |nvim_win_set_hl_ns()| to
   *   activate them.
   * @param name - Highlight group name, e.g. "ErrorMsg"
   * @param val - Highlight definition map, accepts the following keys:
   *   • fg: color name or "#RRGGBB", see note.
   *   • bg: color name or "#RRGGBB", see note.
   *   • sp: color name or "#RRGGBB"
   *   • blend: integer between 0 and 100
   *   • bold: boolean
   *   • standout: boolean
   *   • underline: boolean
   *   • undercurl: boolean
   *   • underdouble: boolean
   *   • underdotted: boolean
   *   • underdashed: boolean
   *   • strikethrough: boolean
   *   • italic: boolean
   *   • reverse: boolean
   *   • nocombine: boolean
   *   • link: name of another highlight group to link to, see
   *   |:hi-link|.
   *   • default: Don't override existing definition |:hi-default|
   *   • ctermfg: Sets foreground of cterm color |ctermfg|
   *   • ctermbg: Sets background of cterm color |ctermbg|
   *   • cterm: cterm attribute map, like |highlight-args|. If not
   *   set, cterm attributes will match those from the attribute
   *   map documented above.
   *   • force: if true force update the highlight group when it
   *   exists.
   */
  nvim_set_hl: (ns_id?: any, name?: any, val?: any) => any;
  /**
   * Set active namespace for highlights defined with |nvim_set_hl()|. This can
   * be set for a single window, see |nvim_win_set_hl_ns()|.
   *
   * @param ns_id - the namespace to use
   */
  nvim_set_hl_ns: (ns_id?: any) => any;
  /**
   * Set active namespace for highlights defined with |nvim_set_hl()| while
   * redrawing.
   *
   * This function meant to be called while redrawing, primarily from
   * |nvim_set_decoration_provider()| on_win and on_line callbacks, which are
   * allowed to change the namespace during a redraw cycle.
   *
   * Attributes: ~
   *     |api-fast|
   *
   * @param ns_id - the namespace to activate
   */
  nvim_set_hl_ns_fast: (ns_id?: any) => any;
  /**
   * Sets a global |mapping| for the given mode.
   *
   * To set a buffer-local mapping, use |nvim_buf_set_keymap()|.
   *
   * Unlike |:map|, leading/trailing whitespace is accepted as part of the
   * {lhs} or {rhs}. Empty {rhs} is |<Nop>|. |keycodes| are replaced as usual.
   *
   * Example: >vim
   *     call nvim_set_keymap('n', ' <NL>', '', {'nowait': v:true})
   *
   *
   * is equivalent to: >vim
   *     nmap <nowait> <Space><NL> <Nop>
   *
   *
   * @param mode - Mode short-name (map command prefix: "n", "i", "v", "x", …)
   *   or "!" for |:map!|, or empty string for |:map|. "ia", "ca" or
   *   "!a" for abbreviation in Insert mode, Cmdline mode, or both,
   *   respectively
   * @param lhs - Left-hand-side |{lhs}| of the mapping.
   * @param rhs - Right-hand-side |{rhs}| of the mapping.
   * @param opts - Optional parameters map: Accepts all |:map-arguments| as keys
   *   except |<buffer>|, values are booleans (default false). Also:
   *   • "noremap" disables |recursive_mapping|, like |:noremap|
   *   • "desc" human-readable description.
   * @param rhs - .
   *   • "replace_keycodes" (boolean) When "expr" is true, replace
   *   keycodes in the resulting string (see
   *   |nvim_replace_termcodes()|). Returning nil from the Lua
   *   "callback" is equivalent to returning an empty string.
   */
  nvim_set_keymap: (mode?: any, lhs?: any, rhs?: any, opts?: any) => any;
  /**
   * Sets a global (g:) variable.
   *
   * @param name - Variable name
   * @param value - Variable value
   */
  nvim_set_var: (name?: any, value?: any) => any;
  /**
   * Sets a v: variable, if it is not readonly.
   *
   * @param name - Variable name
   * @param value - Variable value
   */
  nvim_set_vvar: (name?: any, value?: any) => any;
  /**
   * Calculates the number of display cells occupied by `text`. Control
   * characters including <Tab> count as one cell.
   *
   * @param text - Some text
   *
   * @returns  Number of cells
   */
  nvim_strwidth: (text?: any) => any;
  /**
   * Subscribes to event broadcasts.
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param event - Event type string
   */
  nvim_subscribe: (event?: any) => any;
  /**
   * Unsubscribes to event broadcasts.
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param event - Event type string
   */
  nvim_unsubscribe: (event?: any) => any;
  /**
   * Activates buffer-update events on a channel, or as Lua callbacks.
   *
   * Example (Lua): capture buffer updates in a global `events` variable (use
   * "vim.print(events)" to see its contents): >lua
   *     events = {}
   *     vim.api.nvim_buf_attach(0, false, {
   *       on_lines = function(...)
   *         table.insert(events, {...})
   *       end,
   *     })
   *
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param send_buffer - True if the initial notification should contain the
   *   whole buffer: first notification will be
   *   `nvim_buf_lines_event`. Else the first notification
   *   will be `nvim_buf_changedtick_event`. Not for Lua
   *   callbacks.
   * @param opts - Optional parameters.
   *   • on_lines: Lua callback invoked on change. Return a
   *   truthy value (not `false` or `nil`) to detach. Args:
   *   • the string "lines"
   *   • buffer handle
   *   • b:changedtick
   *   • first line that changed (zero-indexed)
   *   • last line that was changed
   *   • last line in the updated range
   *   • byte count of previous contents
   *   • deleted_codepoints (if `utf_sizes` is true)
   *   • deleted_codeunits (if `utf_sizes` is true)
   *   • on_bytes: Lua callback invoked on change. This
   *   callback receives more granular information about the
   *   change compared to on_lines. Return a truthy value
   *   (not `false` or `nil`) to detach. Args:
   *   • the string "bytes"
   *   • buffer handle
   *   • b:changedtick
   *   • start row of the changed text (zero-indexed)
   *   • start column of the changed text
   *   • byte offset of the changed text (from the start of
   *   the buffer)
   *   • old end row of the changed text (offset from start
   *   row)
   *   • old end column of the changed text (if old end row
   *   = 0, offset from start column)
   *   • old end byte length of the changed text
   *   • new end row of the changed text (offset from start
   *   row)
   *   • new end column of the changed text (if new end row
   *   = 0, offset from start column)
   *   • new end byte length of the changed text
   *   • on_changedtick: Lua callback invoked on changedtick
   *   increment without text change. Args:
   *   • the string "changedtick"
   *   • buffer handle
   *   • b:changedtick
   *   • on_detach: Lua callback invoked on detach. Args:
   *   • the string "detach"
   *   • buffer handle
   *   • on_reload: Lua callback invoked on reload. The entire
   *   buffer content should be considered changed. Args:
   *   • the string "reload"
   *   • buffer handle
   *   • utf_sizes: include UTF-32 and UTF-16 size of the
   *   replaced region, as args to `on_lines`.
   *   • preview: also attach to command preview (i.e.
   *   'inccommand') events.
   *
   * @returns  False if attach failed (invalid parameter, or buffer isn't loaded);
   *  otherwise True. TODO: LUA_API_NO_EVAL
   *
   * See also: ~
   *   • |nvim_buf_detach()|
   *   • |api-buffer-updates-lua|
   */
  nvim_buf_attach: (buffer?: any, send_buffer?: any, opts?: any) => any;
  /**
   * call a function with buffer as temporary current buffer
   *
   * This temporarily switches current buffer to "buffer". If the current
   * window already shows "buffer", the window is not switched If a window
   * inside the current tabpage (including a float) already shows the buffer
   * One of these windows will be set as current window temporarily. Otherwise
   * a temporary scratch window (called the "autocmd window" for historical
   * reasons) will be used.
   *
   * This is useful e.g. to call Vimscript functions that only work with the
   * current buffer/window currently, like |termopen()|.
   *
   * Attributes: ~
   *     Lua |vim.api| only
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param fun - Function to call inside the buffer (currently Lua callable
   *   only)
   *
   * @returns  Return value of function.
   */
  nvim_buf_call: (buffer?: any, fun?: any) => any;
  /**
   * Unmaps a buffer-local |mapping| for the given mode.
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   *
   * See also: ~
   *   • |nvim_del_keymap()|
   */
  nvim_buf_del_keymap: (buffer?: any, mode?: any, lhs?: any) => any;
  /**
   * Deletes a named mark in the buffer. See |mark-motions|.
   *
   * Note: ~
   *   • only deletes marks set in the buffer, if the mark is not set in the
   *     buffer it will return false.
   *
   * @param buffer - Buffer to set the mark on
   * @param name - Mark name
   *
   * @returns  true if the mark was deleted, else false.
   *
   * See also: ~
   *   • |nvim_buf_set_mark()|
   *   • |nvim_del_mark()|
   */
  nvim_buf_del_mark: (buffer?: any, name?: any) => any;
  /**
   * Removes a buffer-scoped (b:) variable
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param name - Variable name
   */
  nvim_buf_del_var: (buffer?: any, name?: any) => any;
  /**
   * Deletes the buffer. See |:bwipeout|
   *
   * Attributes: ~
   *     not allowed when |textlock| is active or in the |cmdwin|
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param opts - Optional parameters. Keys:
   *   • force: Force deletion and ignore unsaved changes.
   *   • unload: Unloaded only, do not delete. See |:bunload|
   */
  nvim_buf_delete: (buffer?: any, opts?: any) => any;
  /**
   * Deactivates buffer-update events on the channel.
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   *
   * @returns  False if detach failed (because the buffer isn't loaded); otherwise
   *  True.
   *
   * See also: ~
   *   • |nvim_buf_attach()|
   *   • |api-lua-detach| for detaching Lua callbacks
   */
  nvim_buf_detach: (buffer?: any) => any;
  /**
   * Gets a changed tick of a buffer
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   *
   * @returns  `b:changedtick` value.
   */
  nvim_buf_get_changedtick: (buffer?: any) => any;
  /**
   * Gets a list of buffer-local |mapping| definitions.
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param mode - Mode short-name ("n", "i", "v", ...)
   *
   * @returns  Array of |maparg()|-like dictionaries describing mappings. The
   *  "buffer" key holds the associated buffer handle.
   */
  nvim_buf_get_keymap: (buffer?: any, mode?: any) => any;
  /**
   * Gets a line-range from the buffer.
   *
   * Indexing is zero-based, end-exclusive. Negative indices are interpreted as
   * length+1+index: -1 refers to the index past the end. So to get the last
   * element use start=-2 and end=-1.
   *
   * Out-of-bounds indices are clamped to the nearest valid value, unless
   * `strict_indexing` is set.
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param start - First line index
   * @param end - Last line index, exclusive
   * @param strict_indexing - Whether out-of-bounds should be an error.
   *
   * @returns  Array of lines, or empty array for unloaded buffer.
   */
  nvim_buf_get_lines: (
    buffer?: any,
    start?: any,
    end?: any,
    strict_indexing?: any,
  ) => any;
  /**
   * Returns a `(row,col)` tuple representing the position of the named mark.
   * "End of line" column position is returned as |v:maxcol| (big number). See
   * |mark-motions|.
   *
   * Marks are (1,0)-indexed. |api-indexing|
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param name - Mark name
   *
   * @returns  (row, col) tuple, (0, 0) if the mark is not set, or is an
   *  uppercase/file mark set in another buffer.
   *
   * See also: ~
   *   • |nvim_buf_set_mark()|
   *   • |nvim_buf_del_mark()|
   */
  nvim_buf_get_mark: (buffer?: any, name?: any) => any;
  /**
   * Gets the full file name for the buffer
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   *
   * @returns  Buffer name
   */
  nvim_buf_get_name: (buffer?: any) => any;
  /**
   * Returns the byte offset of a line (0-indexed). |api-indexing|
   *
   * Line 1 (index=0) has offset 0. UTF-8 bytes are counted. EOL is one byte.
   * 'fileformat' and 'fileencoding' are ignored. The line index just after the
   * last line gives the total byte-count of the buffer. A final EOL byte is
   * counted if it would be written, see 'eol'.
   *
   * Unlike |line2byte()|, throws error for out-of-bounds indexing. Returns -1
   * for unloaded buffer.
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param index - Line index
   *
   * @returns  Integer byte offset, or -1 for unloaded buffer.
   */
  nvim_buf_get_offset: (buffer?: any, index?: any) => any;
  /**
   * {opts})
   * rom the buffer.
   *
   * rom |nvim_buf_get_lines()| in that it allows retrieving only
   * line.
   *
   * ro-based. Row indices are end-inclusive, and column indices
   * ive.
   *
   * uf_get_lines()| when retrieving entire lines.
   *
   *
   *    Buffer handle, or 0 for current buffer
   * }  First line index
   * }  Starting column (byte offset) on first line
   *    Last line index, inclusive
   *    Ending column (byte offset) on last line, exclusive
   *    Optional parameters. Currently unused.
   *
   *
   * ines, or empty array for unloaded buffer.
   */
  nvim_buf_get_text: () => any;
  /**
   * Gets a buffer-scoped (b:) variable.
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param name - Variable name
   *
   * @returns  Variable value
   */
  nvim_buf_get_var: (buffer?: any, name?: any) => any;
  /**
   * Checks if a buffer is valid and loaded. See |api-buffer| for more info
   * about unloaded buffers.
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   *
   * @returns  true if the buffer is valid and loaded, false otherwise.
   */
  nvim_buf_is_loaded: (buffer?: any) => any;
  /**
   * Checks if a buffer is valid.
   *
   * Note: ~
   *   • Even if a buffer is valid it may have been unloaded. See |api-buffer|
   *     for more info about unloaded buffers.
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   *
   * @returns  true if the buffer is valid, false otherwise.
   */
  nvim_buf_is_valid: (buffer?: any) => any;
  /**
   * Returns the number of lines in the given buffer.
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   *
   * @returns  Line count, or 0 for unloaded buffer. |api-buffer|
   */
  nvim_buf_line_count: (buffer?: any) => any;
  /**
   * Sets a buffer-local |mapping| for the given mode.
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   *
   * See also: ~
   *   • |nvim_set_keymap()|
   */
  nvim_buf_set_keymap: (
    buffer?: any,
    mode?: any,
    lhs?: any,
    rhs?: any,
    opts?: any,
  ) => any;
  /**
   * Sets (replaces) a line-range in the buffer.
   *
   * Indexing is zero-based, end-exclusive. Negative indices are interpreted as
   * length+1+index: -1 refers to the index past the end. So to change or
   * delete the last element use start=-2 and end=-1.
   *
   * To insert lines at a given index, set `start` and `end` to the same index.
   * To delete a range of lines, set `replacement` to an empty array.
   *
   * Out-of-bounds indices are clamped to the nearest valid value, unless
   * `strict_indexing` is set.
   *
   * Attributes: ~
   *     not allowed when |textlock| is active
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param start - First line index
   * @param end - Last line index, exclusive
   * @param strict_indexing - Whether out-of-bounds should be an error.
   * @param replacement - Array of lines to use as replacement
   *
   * See also: ~
   *   • |nvim_buf_set_text()|
   */
  nvim_buf_set_lines: (
    buffer?: any,
    start?: any,
    end?: any,
    strict_indexing?: any,
    replacement?: any,
  ) => any;
  /**
   * Sets a named mark in the given buffer, all marks are allowed
   * file/uppercase, visual, last change, etc. See |mark-motions|.
   *
   * Marks are (1,0)-indexed. |api-indexing|
   *
   * Note: ~
   *   • Passing 0 as line deletes the mark
   *
   * @param buffer - Buffer to set the mark on
   * @param name - Mark name
   * @param line - Line number
   * @param col - Column/row number
   * @param opts - Optional parameters. Reserved for future use.
   *
   * @returns  true if the mark was set, else false.
   *
   * See also: ~
   *   • |nvim_buf_del_mark()|
   *   • |nvim_buf_get_mark()|
   */
  nvim_buf_set_mark: (
    buffer?: any,
    name?: any,
    line?: any,
    col?: any,
    opts?: any,
  ) => any;
  /**
   * Sets the full file name for a buffer
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param name - Buffer name
   */
  nvim_buf_set_name: (buffer?: any, name?: any) => any;
  /**
   * {replacement})
   * ) a range in the buffer
   *
   * ended over |nvim_buf_set_lines()| when only modifying parts
   * extmarks will be preserved on non-modified parts of the
   *
   *
   * ro-based. Row indices are end-inclusive, and column indices
   * ive.
   *
   *  at a given `(row, column)` location, use `start_row =
   *  and `start_col = end_col = col`. To delete the text in a
   * placement = {}`.
   *
   * uf_set_lines()| if you are only adding or deleting entire
   *
   *
   * ut()| if you want to insert text at the cursor position.
   *
   *
   * d when |textlock| is active
   *
   *
   *      Buffer handle, or 0 for current buffer
   * }    First line index
   * }    Starting column (byte offset) on first line
   *      Last line index, inclusive
   *      Ending column (byte offset) on last line, exclusive
   * nt}  Array of lines to use as replacement
   *
   *
   * set_lines()|
   * )|
   */
  nvim_buf_set_text: () => any;
  /**
   * Sets a buffer-scoped (b:) variable
   *
   * @param buffer - Buffer handle, or 0 for current buffer
   * @param name - Variable name
   * @param value - Variable value
   */
  nvim_buf_set_var: (buffer?: any, name?: any, value?: any) => any;
  /**
   * Removes a tab-scoped (t:) variable
   *
   * @param tabpage - Tabpage handle, or 0 for current tabpage
   * @param name - Variable name
   */
  nvim_tabpage_del_var: (tabpage?: any, name?: any) => any;
  /**
   * Gets the tabpage number
   *
   * @param tabpage - Tabpage handle, or 0 for current tabpage
   *
   * @returns  Tabpage number
   */
  nvim_tabpage_get_number: (tabpage?: any) => any;
  /**
   * Gets a tab-scoped (t:) variable
   *
   * @param tabpage - Tabpage handle, or 0 for current tabpage
   * @param name - Variable name
   *
   * @returns  Variable value
   */
  nvim_tabpage_get_var: (tabpage?: any, name?: any) => any;
  /**
   * Gets the current window in a tabpage
   *
   * @param tabpage - Tabpage handle, or 0 for current tabpage
   *
   * @returns  Window handle
   */
  nvim_tabpage_get_win: (tabpage?: any) => any;
  /**
   * Checks if a tabpage is valid
   *
   * @param tabpage - Tabpage handle, or 0 for current tabpage
   *
   * @returns  true if the tabpage is valid, false otherwise
   */
  nvim_tabpage_is_valid: (tabpage?: any) => any;
  /**
   * Gets the windows in a tabpage
   *
   * @param tabpage - Tabpage handle, or 0 for current tabpage
   *
   * @returns  List of windows in `tabpage`
   */
  nvim_tabpage_list_wins: (tabpage?: any) => any;
  /**
   * Sets a tab-scoped (t:) variable
   *
   * @param tabpage - Tabpage handle, or 0 for current tabpage
   * @param name - Variable name
   * @param value - Variable value
   */
  nvim_tabpage_set_var: (tabpage?: any, name?: any, value?: any) => any;
  /**
   * Sets the current window in a tabpage
   *
   * @param tabpage - Tabpage handle, or 0 for current tabpage
   * @param win - Window handle, must already belong to {tabpage}
   */
  nvim_tabpage_set_win: (tabpage?: any, win?: any) => any;
  /**
   * Activates UI events on the channel.
   *
   * Entry point of all UI clients. Allows |--embed| to continue startup.
   * Implies that the client is ready to show the UI. Adds the client to the
   * list of UIs. |nvim_list_uis()|
   *
   * Note: ~
   *   • If multiple UI clients are attached, the global screen dimensions
   *     degrade to the smallest client. E.g. if client A requests 80x40 but
   *     client B requests 200x100, the global screen has size 80x40.
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param width - Requested screen columns
   * @param height - Requested screen rows
   * @param options - |ui-option| map
   */
  nvim_ui_attach: (width?: any, height?: any, options?: any) => any;
  /**
   * Deactivates UI events on the channel.
   *
   * Removes the client from the list of UIs. |nvim_list_uis()|
   *
   * Attributes: ~
   *     |RPC| only
   */
  nvim_ui_detach: () => any;
  /**
   * Tells Nvim the geometry of the popupmenu, to align floating windows with
   * an external popup menu.
   *
   * Note that this method is not to be confused with
   * |nvim_ui_pum_set_height()|, which sets the number of visible items in the
   * popup menu, while this function sets the bounding box of the popup menu,
   * including visual elements such as borders and sliders. Floats need not use
   * the same font size, nor be anchored to exact grid corners, so one can set
   * floating-point numbers to the popup menu geometry.
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param width - Popupmenu width.
   * @param height - Popupmenu height.
   * @param row - Popupmenu row.
   * @param col - Popupmenu height.
   */
  nvim_ui_pum_set_bounds: (
    width?: any,
    height?: any,
    row?: any,
    col?: any,
  ) => any;
  /**
   * Tells Nvim the number of elements displaying in the popupmenu, to decide
   * <PageUp> and <PageDown> movement.
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param height - Popupmenu height, must be greater than zero.
   */
  nvim_ui_pum_set_height: (height?: any) => any;
  /**
   * Tells the nvim server if focus was gained or lost by the GUI
   *
   * Attributes: ~
   *     |RPC| only
   */
  nvim_ui_set_focus: (gained?: any) => any;
  /**
   * Attributes: ~
   *     |RPC| only
   */
  nvim_ui_set_option: (name?: any, value?: any) => any;
  /**
   * Tells Nvim when a terminal event has occurred
   *
   * The following terminal events are supported:
   * • "termresponse": The terminal sent an OSC or DCS response sequence to
   *   Nvim. The payload is the received response. Sets |v:termresponse| and
   *   fires |TermResponse|.
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param event - Event name
   * @param value - Event payload
   */
  nvim_ui_term_event: (event?: any, value?: any) => any;
  /**
   * Attributes: ~
   *     |RPC| only
   */
  nvim_ui_try_resize: (width?: any, height?: any) => any;
  /**
   * Tell Nvim to resize a grid. Triggers a grid_resize event with the
   * requested grid size or the maximum size if it exceeds size limits.
   *
   * On invalid grid handle, fails with error.
   *
   * Attributes: ~
   *     |RPC| only
   *
   * @param grid - The handle of the grid to be changed.
   * @param width - The new requested width.
   * @param height - The new requested height.
   *
   *
   * :tw=78:ts=8:sw=4:sts=4:et:ft=help:norl:
   */
  nvim_ui_try_resize_grid: (grid?: any, width?: any, height?: any) => any;
  /**
   * Calls a function with window as temporary current window.
   *
   * Attributes: ~
   *     Lua |vim.api| only
   *
   * @param window - Window handle, or 0 for current window
   * @param fun - Function to call inside the window (currently Lua callable
   *   only)
   *
   * @returns  Return value of function.
   *
   * See also: ~
   *   • |win_execute()|
   *   • |nvim_buf_call()|
   */
  nvim_win_call: (window?: any, fun?: any) => any;
  /**
   * Closes the window (like |:close| with a |window-ID|).
   *
   * Attributes: ~
   *     not allowed when |textlock| is active
   *
   * @param window - Window handle, or 0 for current window
   * @param force - Behave like `:close!` The last window of a buffer with
   *   unwritten changes can be closed. The buffer will become
   *   hidden, even if 'hidden' is not set.
   */
  nvim_win_close: (window?: any, force?: any) => any;
  /**
   * Removes a window-scoped (w:) variable
   *
   * @param window - Window handle, or 0 for current window
   * @param name - Variable name
   */
  nvim_win_del_var: (window?: any, name?: any) => any;
  /**
   * Gets the current buffer in a window
   *
   * @param window - Window handle, or 0 for current window
   *
   * @returns  Buffer handle
   */
  nvim_win_get_buf: (window?: any) => any;
  /**
   * Gets the (1,0)-indexed, buffer-relative cursor position for a given window
   * (different windows showing the same buffer have independent cursor
   * positions). |api-indexing|
   *
   * @param window - Window handle, or 0 for current window
   *
   * @returns  (row, col) tuple
   *
   * See also: ~
   *   • |getcurpos()|
   */
  nvim_win_get_cursor: (window?: any) => any;
  /**
   * Gets the window height
   *
   * @param window - Window handle, or 0 for current window
   *
   * @returns  Height as a count of rows
   */
  nvim_win_get_height: (window?: any) => any;
  /**
   * Gets the window number
   *
   * @param window - Window handle, or 0 for current window
   *
   * @returns  Window number
   */
  nvim_win_get_number: (window?: any) => any;
  /**
   * Gets the window position in display cells. First position is zero.
   *
   * @param window - Window handle, or 0 for current window
   *
   * @returns  (row, col) tuple with the window position
   */
  nvim_win_get_position: (window?: any) => any;
  /**
   * Gets the window tabpage
   *
   * @param window - Window handle, or 0 for current window
   *
   * @returns  Tabpage that contains the window
   */
  nvim_win_get_tabpage: (window?: any) => any;
  /**
   * Gets a window-scoped (w:) variable
   *
   * @param window - Window handle, or 0 for current window
   * @param name - Variable name
   *
   * @returns  Variable value
   */
  nvim_win_get_var: (window?: any, name?: any) => any;
  /**
   * Gets the window width
   *
   * @param window - Window handle, or 0 for current window
   *
   * @returns  Width as a count of columns
   */
  nvim_win_get_width: (window?: any) => any;
  /**
   * Closes the window and hide the buffer it contains (like |:hide| with a
   * |window-ID|).
   *
   * Like |:hide| the buffer becomes hidden unless another window is editing
   * it, or 'bufhidden' is `unload`, `delete` or `wipe` as opposed to |:close|
   * or |nvim_win_close()|, which will close the buffer.
   *
   * Attributes: ~
   *     not allowed when |textlock| is active
   *
   * @param window - Window handle, or 0 for current window
   */
  nvim_win_hide: (window?: any) => any;
  /**
   * Checks if a window is valid
   *
   * @param window - Window handle, or 0 for current window
   *
   * @returns  true if the window is valid, false otherwise
   */
  nvim_win_is_valid: (window?: any) => any;
  /**
   * Sets the current buffer in a window, without side effects
   *
   * Attributes: ~
   *     not allowed when |textlock| is active
   *
   * @param window - Window handle, or 0 for current window
   * @param buffer - Buffer handle
   */
  nvim_win_set_buf: (window?: any, buffer?: any) => any;
  /**
   * Sets the (1,0)-indexed cursor position in the window. |api-indexing| This
   * scrolls the window even if it is not the current one.
   *
   * @param window - Window handle, or 0 for current window
   * @param pos - (row, col) tuple representing the new position
   */
  nvim_win_set_cursor: (window?: any, pos?: any) => any;
  /**
   * Sets the window height.
   *
   * @param window - Window handle, or 0 for current window
   * @param height - Height as a count of rows
   */
  nvim_win_set_height: (window?: any, height?: any) => any;
  /**
   * Set highlight namespace for a window. This will use highlights defined
   * with |nvim_set_hl()| for this namespace, but fall back to global
   * highlights (ns=0) when missing.
   *
   * This takes precedence over the 'winhighlight' option.
   *
   * @param ns_id - the namespace to use
   */
  nvim_win_set_hl_ns: (window?: any, ns_id?: any) => any;
  /**
   * Sets a window-scoped (w:) variable
   *
   * @param window - Window handle, or 0 for current window
   * @param name - Variable name
   * @param value - Variable value
   */
  nvim_win_set_var: (window?: any, name?: any, value?: any) => any;
  /**
   * Sets the window width. This will only succeed if the screen is split
   * vertically.
   *
   * @param window - Window handle, or 0 for current window
   * @param width - Width as a count of columns
   */
  nvim_win_set_width: (window?: any, width?: any) => any;
  /**
   * Computes the number of screen lines occupied by a range of text in a given
   * window. Works for off-screen text and takes folds into account.
   *
   * Diff filler or virtual lines above a line are counted as a part of that
   * line, unless the line is on "start_row" and "start_vcol" is specified.
   *
   * Diff filler or virtual lines below the last buffer line are counted in the
   * result when "end_row" is omitted.
   *
   * Line indexing is similar to |nvim_buf_get_text()|.
   *
   * @param window - Window handle, or 0 for current window.
   * @param opts - Optional parameters:
   *   • start_row: Starting line index, 0-based inclusive. When
   *   omitted start at the very top.
   *   • end_row: Ending line index, 0-based inclusive. When
   *   omitted end at the very bottom.
   *   • start_vcol: Starting virtual column index on "start_row",
   *   0-based inclusive, rounded down to full screen lines. When
   *   omitted include the whole line.
   *   • end_vcol: Ending virtual column index on "end_row",
   *   0-based exclusive, rounded up to full screen lines. When
   *   omitted include the whole line.
   *
   * @returns  Dictionary containing text height information, with these keys:
   *  • all: The total number of screen lines occupied by the range.
   *  • fill: The number of diff filler or virtual lines among them.
   *
   * See also: ~
   *   • |virtcol()| for text width.
   */
  nvim_win_text_height: (window?: any, opts?: any) => any;
  nvim_open_win: (buffer?: any, enter?: any, config?: any) => any;
  nvim_set_option_value: (
    name: string,
    value: any,
    opts?: { scope?: "global" | "local"; win?: any; buf?: number },
  ) => void;

  nvim_create_augroup: (name: string, options: { clear?: boolean }) => number;
  nvim_create_autocmd: (
    event: AutoCmdEvent | AutoCmdEvent[],
    options: {
      group?: string | number;
      pattern?: string | string[];
      buffer?: number;
      desc?: string;
      callback: string | (() => any);
      command?: string;
      once?: boolean;
      nested?: boolean;
    },
  ) => number;
  nvim_create_user_command: (
    name: string,
    command: (args: {
      name: string;
      args: string;
      fargs: string[];
      nargs: string;
      bang: boolean;
      line1: number;
      line2: number;
      range: number;
      count: number;
      reg: string;
      mods: string;
      smods: any;
    }) => any,
    options?: {
      nargs?: 0 | 1 | "*" | "?" | "+";
      bang?: boolean;
      bar?: boolean;
      complete?:
        | string
        | ((argLead: string, cmdLine: string, cursorPos: number) => string[]);
      desc?: string;
      force?: boolean;
      preview?: () => any;
    },
  ) => void;
}

type AutoCmdEvent =
  | "BufAdd"
  | "BufDelete"
  | "BufEnter"
  | "BufFilePost"
  | "BufFilePre"
  | "BufHidden"
  | "BufLeave"
  | "BufModifiedSet"
  | "BufNew"
  | "BufNewFile"
  | "BufRead"
  | "BufReadPost"
  | "BufReadCmd"
  | "BufReadPre"
  | "BufUnload"
  | "BufWinEnter"
  | "BufWinLeave"
  | "BufWipeout"
  | "BufWrite"
  | "BufWritePre"
  | "BufWriteCmd"
  | "BufWritePost"
  | "ChanInfo"
  | "ChanOpen"
  | "CmdUndefined"
  | "CmdlineChanged"
  | "CmdlineEnter"
  | "CmdlineLeave"
  | "CmdwinEnter"
  | "CmdwinLeave"
  | "ColorScheme"
  | "ColorSchemePre"
  | "CompleteChanged"
  | "CompleteDonePre"
  | "CompleteDone"
  | "CursorHold"
  | "CursorHoldI"
  | "CursorMoved"
  | "CursorMovedI"
  | "DiffUpdated"
  | "DirChanged"
  | "DirChangedPre"
  | "ExitPre"
  | "FileAppendCmd"
  | "FileAppendPost"
  | "FileAppendPre"
  | "FileChangedRO"
  | "FileChangedShell"
  | "FileChangedShellPost"
  | "FileReadCmd"
  | "FileReadPost"
  | "FileReadPre"
  | "FileType"
  | "FileWriteCmd"
  | "FileWritePost"
  | "FileWritePre"
  | "FilterReadPost"
  | "FilterReadPre"
  | "FilterWritePost"
  | "FilterWritePre"
  | "FocusGained"
  | "FocusLost"
  | "FuncUndefined"
  | "UIEnter"
  | "UILeave"
  | "InsertChange"
  | "InsertCharPre"
  | "InsertEnter"
  | "InsertLeavePre"
  | "InsertLeave"
  | "MenuPopup"
  | "ModeChanged"
  | "OptionSet"
  | "QuickFixCmdPre"
  | "QuickFixCmdPost"
  | "QuitPre"
  | "RemoteReply"
  | "SearchWrapped"
  | "RecordingEnter"
  | "RecordingLeave"
  | "SafeState"
  | "SessionLoadPost"
  | "ShellCmdPost"
  | "Signal"
  | "ShellFilterPost"
  | "SourcePre"
  | "SourcePost"
  | "SourceCmd"
  | "SpellFileMissing"
  | "StdinReadPost"
  | "StdinReadPre"
  | "SwapExists"
  | "Syntax"
  | "TabEnter"
  | "TabLeave"
  | "TabNew"
  | "TabNewEntered"
  | "TabClosed"
  | "TermOpen"
  | "TermEnter"
  | "TermLeave"
  | "TermClose"
  | "TermRequest"
  | "TermResponse"
  | "TextChanged"
  | "TextChangedI"
  | "TextChangedP"
  | "TextChangedT"
  | "TextYankPost"
  | "User"
  | "UserGettingBored"
  | "VimEnter"
  | "VimLeave"
  | "VimLeavePre"
  | "VimResized"
  | "VimResume"
  | "VimSuspend"
  | "WinClosed"
  | "WinEnter"
  | "WinLeave"
  | "WinNew"
  | "WinScrolled"
  | "WinResized";
