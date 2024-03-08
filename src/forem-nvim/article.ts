export type Article = {
  id: number;
  type_of: string;
  title: string;
  slug: string;
  description: string;
  url: string;
  body_markdown: string | null;
  user: Author;
  reading_time_minutes: number;
  tags: string[];
  positive_reactions_count: number;
  comments_count: number;
  readable_publish_date: string;
  published_at: string | null;
};

export type Author = {
  name: string;
  username: string;
};

export const getBodyLines = (article: Article): string[] =>
  vim.split(article.body_markdown || "", "\n")

export const getTemplate = (title: string) =>
  `---
title: ${title}
published: false
description:
tags:
# cover_image: https://direct_url_to_image.jpg
# Use a ratio of 100:42 for best results.
---

`;
