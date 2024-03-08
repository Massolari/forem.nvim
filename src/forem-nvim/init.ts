import * as Article from "./article";
import * as api from "./api";
import * as buffer from "./buffer";
import * as Feed from "./feed";
import * as notify from "./notify";
import * as picker from "./picker";

const NO_API_KEY_ERROR =
  "forem.nvim: FOREM_API_KEY environment variable is missing";

const checkApiKey = (callback: () => any) => {
  if (api.key()) {
    callback();
    return;
  }

  notify.error(NO_API_KEY_ERROR);
};

const myArticles = () => api.myArticles(picker.myArticles);

const saveArticle = () => {
  const { bufnr, content } = buffer.getContent();
  const id = Number(vim.fn.expand("%:t"));

  if (!id) {
    notify.error("forem.nvim: Could not find article id");
    return;
  }

  const response = api.saveArticle(id, content);

  api.handleError(response, () => {
    notify.info("Article saved");
    vim.api.nvim_set_option_value("modified", false, { buf: bufnr });
  });
};

const newArticle = () => {
  const [status, title] = pcall(
    (prompt: string) => vim.fn.input(prompt),
    "Article's Title: ",
  );

  if (!status || title === "") {
    return;
  }

  const response = api.newArticle(title);

  api.handleError(response, (article: Article.Article) => {
    buffer.openMyArticle(article);
  });
};

const openByUrl = () => {
  const [status, url] = pcall(
    (prompt: string) => vim.fn.input(prompt),
    "Article's URL: ",
  );

  if (!status || url === "") {
    return;
  }

  const [path] = string.match(url, "(%w+/[%w|-]+)$");

  if (path === undefined) {
    notify.error(`This URL is not valid: ${url}`);
    return;
  }

  api.getArticleByPath(path, buffer.loadArticle);
};

// Autocmd

const foremAuGroup = vim.api.nvim_create_augroup("forem_autocmds", {});

const setAutoCmds = () => {
  vim.api.nvim_create_autocmd("BufWriteCmd", {
    group: foremAuGroup,
    pattern: "forem://my-article/*",
    callback: saveArticle,
  });
  vim.api.nvim_create_autocmd("BufEnter", {
    group: foremAuGroup,
    pattern: "forem://articles/feed",
    callback: Feed.load,
  });
  vim.api.nvim_create_autocmd("CursorMoved", {
    group: foremAuGroup,
    pattern: "forem://*/floatmenu",
    callback: () => {
      const [buffer, line, column, off] = vim.fn.getpos(".");

      if (column <= 1) {
        return;
      }

      vim.fn.setpos(".", [buffer, line, 1, off]);
    },
  });
  vim.api.nvim_create_autocmd("BufEnter", {
    group: foremAuGroup,
    pattern: "forem://*/floatmenu",
    callback: () => {
      vim.keymap.set("n", "<Esc>", () => vim.api.nvim_win_close(0, false));
    },
  });
};

// Setup

setAutoCmds();

if (!api.key()) {
  notify.error(NO_API_KEY_ERROR);
}

export const my_articles = () => checkApiKey(myArticles);
export const new_article = () => checkApiKey(newArticle);
export const feed = () => checkApiKey(Feed.open);
export const open_url = () => checkApiKey(openByUrl);
