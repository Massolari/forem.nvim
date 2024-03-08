import * as actions from "telescope.actions";
import * as actionState from "telescope.actions.state";
import * as finders from "telescope.finders";
import * as pickers from "telescope.pickers";
import * as previewers from "telescope.previewers";
import * as buffer from "./buffer";
import { Article, getBodyLines } from "./article";
import { values as configValues } from "telescope.config";

type Entry = {
  value: Article;
  display: string;
  type_of: string;
  ordinal: string;
};

const myArticlesPicker = (articles: Article[]): Picker =>
  pickers.new(
    {},
    {
      prompt_title: "My Articles",
      finder: finders.new_table({
        results: articles,
        entry_maker: (article: Article): Entry => {
          return {
            value: article,
            display: article.title,
            type_of: article.type_of,
            ordinal: article.title,
          };
        },
      }),
      previewer: previewers.new_buffer_previewer({
        title: "Article Preview",
        dyn_title: (_: any, entry: Entry) => entry.display,
        define_preview: (self: any, entry: Entry) => {
          if (self.state.bufname) {
            return;
          }

          const body = getBodyLines(entry.value);

          vim.api.nvim_set_option_value("filetype", "markdown", {
            buf: self.state.bufnr,
          });
          buffer.write(self.state.bufnr, body);
        },
        get_buffer_by_name: (_self: any, entry: Entry) => entry.value.slug,
      }),
      sorter: configValues.prefilter_sorter({
        tag: "type_of",
        sorter: configValues.generic_sorter({}),
      }),
      attach_mappings: (prompt_bufnr: number) =>
        actions.select_default.replace(() => {
          const selection = actionState.get_selected_entry(prompt_bufnr);

          actions.close(prompt_bufnr);
          buffer.openMyArticle(selection.value);
        }),
    },
  );

export const myArticles = (articles: Article[]): void => {
  myArticlesPicker(articles).find();
};
