import * as Article from "./article";
import { setLocals, getOption } from "./util";

export const setBasicOptions = () => {
  setLocals([
    ["filetype", "markdown"],
    ["modified", false],
  ]);
};

export const write = (buffer: number, lines: string[], offset?: number) => {
  const modifiable = getOption(vim.opt_local.modifiable);

  vim.opt_local.modifiable = true;
  vim.api.nvim_buf_set_lines(buffer, offset || 0, -1, false, lines);
  vim.opt_local.modifiable = modifiable;
};

export const getContent = () => {
  const buffer = vim.api.nvim_get_current_buf();

  const lines: string[] = vim.api.nvim_buf_get_lines(buffer, 0, -1, true);

  return { content: lines.join("\n"), bufnr: buffer };
};

export const openMyArticle = (article: Article.Article) => {
  vim.cmd(`:edit forem://my-article/${article.id}`);

  const buffer = vim.api.nvim_get_current_buf();

  write(buffer, Article.getBodyLines(article));
  setBasicOptions();
  setLocals([
    ["buftype", "acwrite"],
    ["swapfile", false],
  ]);
};

export const loadArticle = (article: Article.Article) => {
  vim.cmd(`:edit forem://article/${article.title}`);
  setLocals([
    ["linebreak", true],
    ["textwidth", 80],
  ]);

  const buffer = vim.api.nvim_get_current_buf();
  const body = Article.getBodyLines(article);

  write(buffer, body);

  setBasicOptions();
  setLocals([
    ["modifiable", false],
    ["spell", false],
    ["buftype", "nowrite"],
    ["swapfile", false],
  ]);
};
