import * as api from "./api";
import * as buffer from "./buffer";
import * as notify from "./notify";
import * as util from "./util";
import { setLocals } from "./util";

export type FeedArticle = {
  id: number;
  title: string;
  url: string;
  description: string;
  user: {
    name: string;
    username: string;
  };
  reading_time_minutes: number;
  tag_list: string[];
  positive_reactions_count: number;
  comments_count: number;
  readable_publish_date: string;
};

export const open = () => vim.cmd("edit forem://articles/feed");

const setBasicOptions = () => {
  buffer.setBasicOptions();
  setLocals([
    ["modifiable", false],
    ["spell", false],
    ["buftype", "nowrite"],
    ["swapfile", false],
  ]);
};

const seekTitle = (
  line: number,
  getNextLine: (line: number) => number,
  count: number,
): string | null => {
  const lineContent = vim.fn.getline(line);
  const [title] = string.match(lineContent, " ## (.+)", 1);

  if (title !== undefined) {
    return title;
  }

  if (count > 1000) {
    notify.error("Could not find the title of the article");
    return null;
  }

  return seekTitle(getNextLine(line), getNextLine, count + 1);
};

export const openArticle = (location: "buffer" | "browser") => {
  const title = getCardTitle(vim.fn.line("."));

  if (!title) {
    notify.error("Could not find article data. Please reopen the feed.");
    return;
  }

  const articleData = foremFeedArticles?.get(title);

  if (!articleData) {
    notify.error("Could not find article data. Please reload the feed.");
    return;
  }

  if (location === "browser") {
    util.openUrlOnBrowser(articleData.url);
  } else {
    api.getArticle(articleData.id, buffer.loadArticle);
  }
};

const getCardTitle = (line: number): string | null => {
  const content = vim.fn.getline(line);

  const [isInsideOfCard] = string.match(content, "^[ |🭽|▏|🭼]", 1);

  if (!isInsideOfCard) {
    return null;
  }

  const [isUpperBorder] = string.match(content, "🭽", 1);

  const getNextLine =
    isUpperBorder !== undefined
      ? (line: number) => line + 1
      : (line: number) => line - 1;

  return seekTitle(line, getNextLine, 0);
};

export const load = () => {
  setBasicOptions();
  const bufnr: number = vim.api.nvim_get_current_buf();
  buffer.write(bufnr, ["Loading feed..."]);

  api.feed((articles) => {
    setKeyMaps();

    populateGlobalFeedArticles(articles);

    const maxColumn = articles.reduce(
      (max, article) =>
        Math.max(article.title.length, article.description.length, max),
      0,
    );

    const feed = articles.flatMap((article) =>
      articleToFeed(article, maxColumn),
    );

    buffer.write(bufnr, [
      "# Your Feed",
      "",
      "Press <Enter> in a card to open the article in a new buffer",
      "and <C-b> to open it in the browser.",
      "",
      ...feed,
    ]);
  });
};

const setKeyMaps = () => {
  vim.keymap.set("n", "<CR>", () => openArticle("buffer"), {
    buffer: true,
    silent: true,
  });
  vim.keymap.set("n", "<C-b>", () => openArticle("browser"), {
    buffer: true,
    silent: true,
  });
};

const populateGlobalFeedArticles = (articles: FeedArticle[]) => {
  foremFeedArticles = new Map(
    articles.map((article) => [
      article.title,
      { id: article.id, url: article.url },
    ]),
  );
};

export const tagsToString = (tags: string[]): string =>
  tags.map((tag) => `#${tag}`).join(", ");
const articleToFeed = (article: FeedArticle, maxColumns: number): string[] => [
  `🭽${string.rep("▔", maxColumns)}🭾`,
  ` ## ${article.title}`,
  ` ${article.description}`,
  ` 👤${article.user.name}  (${article.user.username})`,
  "▏",

  ` 🕒 ${article.reading_time_minutes} ${util.pluralize(article.reading_time_minutes, "minute")} of reading time`,
  ` Tags: ${tagsToString(article.tag_list)}`,
  ` 💕${article.positive_reactions_count} 💬${article.comments_count}`,
  ` 📆${article.readable_publish_date}`,
  "▏",
  `🭼${string.rep("▁", maxColumns)}🭿`,
  "",
];
