import * as curl from "plenary.curl";
import * as Feed from "./feed";
import * as job from "plenary.job";
import * as notify from "./notify";
import * as article from "./article";

export const key = () => vim.env.FOREM_API_KEY;

type ResponseCallback<T = any> = (response: T) => any;

const baseUrl = "https://dev.to/api";

const handleAsyncError = (response: any) => {
  notify.error(`Error: ${response.body.error}`);
};

export const handleError = (response: any, onSuccess: ResponseCallback) => {
  const startStatus = string.sub(response.status, 1, 2);

  return startStatus === "20"
    ? onSuccess(response.body)
    : notify.error(`Error: ${response.body.error}`);
};

const request = (
  requestFunction: (params: any) => any,
  endpoint: string,
  options: any,
) => {
  const parameters = vim.tbl_extend(
    "force",
    {
      url: baseUrl + endpoint,
      headers: {
        "api-key": key(),
        content_type: "application/json",
        accept: "application/vnd.forem.api-v1+json",
      },
    },
    options,
  );

  const response = requestFunction(parameters);

  if (response.body) {
    return vim.tbl_extend("force", response, {
      body: vim.fn.json_decode(response.body),
    });
  }

  return response;
};

const requestAsync = (
  method: string,
  endpoint: string,
  options: any,
  onSuccess: ResponseCallback,
  onError?: ResponseCallback,
) =>
  job
    .new({
      command: "curl",
      args: [
        "-X",
        method,
        "-H",
        "Content-Type: application/json",
        "-H",
        "Accept: application/vnd.forem.api-v1+json",
        "-H",
        `api-key: ${key()}`,
        "-d",
        vim.fn.json_encode(options),
        baseUrl + endpoint,
      ],
      on_exit: (job: Job, code: number) => {
        vim.schedule(() => {
          const result = job.result().join("\n");
          const response = vim.fn.json_decode(result);

          if (code === 0) {
            onSuccess(response);
            return;
          }

          handleAsyncError(response);
          if (onError) {
            onError(response);
          }
        });
      },
    })
    .start();

const get = (
  endpoint: string,
  onSuccess: ResponseCallback,
  onError?: ResponseCallback,
) => requestAsync("GET", endpoint, {}, onSuccess, onError);

const put = (endpoint: string, body: any) =>
  request(curl.put, endpoint, { body });

const post = (endpoint: string, body: any) =>
  request(curl.post, endpoint, { body });

export const myArticles = (
  onSuccess: ResponseCallback<article.Article[]>,
  onError?: ResponseCallback,
) => get("/articles/me/all", onSuccess, onError);

export const saveArticle = (id: number, content: string) =>
  put(
    `/articles/${id}`,
    vim.fn.json_encode({ article: { body_markdown: content } }),
  );

export const newArticle = (title: string) =>
  post(
    "/articles",
    vim.fn.json_encode({
      article: { body_markdown: article.getTemplate(title) },
    }),
  );

export const feed = (
  onSuccess: ResponseCallback<Feed.FeedArticle[]>,
  onError?: ResponseCallback,
) => get("/articles", onSuccess, onError);

export const getArticle = (
  id: number,
  onSuccess: ResponseCallback,
  onError?: ResponseCallback,
) => get(`/articles/${id}`, onSuccess, onError);

export const getArticleByPath = (
  path: string,
  onSuccess: ResponseCallback,
  onError?: ResponseCallback,
) => get(`/articles/${path}`, onSuccess, onError);
