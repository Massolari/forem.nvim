(local curl (require :plenary.curl))
(local M {})
(local base-url "https://dev.to/api")

(λ get-article-template [title]
  (string.format "---
title: %s
published: false
description: 
tags:
# cover_image: https://direct_url_to_image.jpg
# Use a ratio of 100:42 for best results.
---

" title))

(λ request [request-fun api-key endpoint options]
  (let [parameters (vim.tbl_extend :force
                                   {:url (.. base-url endpoint)
                                    :headers {: api-key
                                              :content_type :application/json}}
                                   options)
        response (request-fun parameters)]
    (if response.body
        (vim.tbl_extend :force response
                        {:body (vim.fn.json_decode response.body)})
        response)))

(λ get [api-key endpoint]
  (request curl.get api-key endpoint {}))

(λ put [api-key endpoint body]
  (request curl.put api-key endpoint {: body}))

(λ post [api-key endpoint body]
  (request curl.post api-key endpoint {: body}))

(λ M.my-articles [api-key]
  (get api-key :/articles/me/all))

(λ M.save-article [api-key id content]
  (put api-key (.. :/articles/ id)
       (vim.fn.json_encode {:article {:body_markdown content}})))

(λ M.new-article [api-key title]
  (post api-key :/articles
        (vim.fn.json_encode {:article {:body_markdown (get-article-template title)}})))

(λ M.feed [api-key]
  (get api-key :/articles))

(λ M.get-article [api-key id]
  (get api-key (.. :/articles/ id)))

(λ M.get-article-by-path [api-key path]
  (get api-key (.. :/articles/ path)))

M
