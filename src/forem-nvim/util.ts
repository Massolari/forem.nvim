export const setLocals = (values: [string, any][]): void => {
  values.forEach(([key, value]) => (vim.opt_local[key] = value));
};

export const getOption = (option: any) => {
  return option.get(option)
}

export const isExecutable = (path: string): boolean =>
  vim.fn.executable(path) === 1;

export const openUrlOnBrowser = (url: string): void => {
  const cmd = getOpenCommand();

  if (!cmd) {
    vim.api.nvim_err_writeln(
      `Could not find a command to open the URL: $[url]`,
    );
    return;
  }

  vim.fn.system(`${cmd} ${url}`);
};

const getOpenCommand = (): string | null => {
  if (isExecutable("xdg-open")) return "xdg-open";
  if (isExecutable("open")) return "open";
  if (isExecutable("start")) return "start";
  return null;
};

export const pluralize = (
  count: number,
  singular: string,
  plural?: string,
): string => {
  if (count === 1) return singular;

  return plural || `${singular}s`;
};

export const openFloatMenu = (
  content: string[],
  options?: Record<string, any>,
): void => {
  const width = content.reduce((acc, line) => Math.max(acc, line.length), 0);

  const bufnr = vim.api.nvim_create_buf(false, true);

  const floatOptions = vim.tbl_extend("keep", options || {}, {
    relative: "cursor",
    col: 0,
    row: 1,
    style: "minimal",
    width: width,
    border: "rounded",
    height: content.length,
  });

  const window = vim.api.nvim_open_win(bufnr, false, floatOptions);

  vim.api.nvim_buf_set_lines(bufnr, 0, -1, true, content);
  vim.api.nvim_buf_set_name(bufnr, "forem://feed/floatmenu");
  vim.api.nvim_set_option_value("modifiable", false, { buf: bufnr });
  vim.api.nvim_set_option_value("bufhidden", "delete", { buf: bufnr });
  vim.api.nvim_set_option_value("cursorline", true, { win: window });
};
