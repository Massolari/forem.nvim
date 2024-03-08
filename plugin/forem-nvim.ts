import * as forem from "forem-nvim";
import * as notify from "forem-nvim.notify";

enum Command {
  Feed = "feed",
  MyArticles = "my_articles",
  NewArticle = "new_article",
  OpenUrl = "open_url",
}

const isCommand = (command: string): command is Command =>
  Object.values(Command).includes(command as Command);

vim.api.nvim_create_user_command(
  "Forem",
  function ({ args }) {
    if (!isCommand(args)) {
      notify.error(`Unknown command: ${args}`);
      return;
    }

    switch (args) {
      case Command.Feed:
        return forem.feed();
      case Command.MyArticles:
        return forem.my_articles();
      case Command.NewArticle:
        return forem.new_article();
      case Command.OpenUrl:
        return forem.open_url();
    }
  },
  { nargs: 1, complete: () => Object.values(Command) },
);
