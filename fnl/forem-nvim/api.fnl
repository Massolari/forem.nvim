(local curl (require :plenary.curl))
(local notify (require :forem-nvim.notify))
(local job (require :plenary.job))
(local M {})
(local base-url "https://dev.to/api")

(λ key []
  vim.env.FOREM_API_KEY)

(λ handle-async-error [response]
  (notify.error (.. "Error: " response.body.error)))

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

(λ request [request-fun endpoint options]
  (let [parameters (vim.tbl_extend :force
                                   {:url (.. base-url endpoint)
                                    :headers {:api-key (key)
                                              :content_type :application/json
                                              :accept :application/vnd.forem.api-v1+json}}
                                   options)
        response (request-fun parameters)]
    (if response.body
        (vim.tbl_extend :force response
                        {:body (vim.fn.json_decode response.body)})
        response)))

(λ request-async [method endpoint options on-success ?on-error]
  (: (job:new {:command :curl
               :args [:-X
                      method
                      :-H
                      "Content-Type: application/json"
                      :-H
                      "Accept: application/vnd.forem.api-v1+json"
                      :-H
                      (.. "api-key: " (key))
                      :-d
                      (vim.fn.json_encode options)
                      (.. base-url endpoint)]
               :on_exit (fn [this code]
                          (vim.schedule #(let [results (this:result)
                                               result (vim.fn.join results "\n")
                                               response (vim.fn.json_decode result)]
                                           (if (= code 0)
                                               (on-success response)
                                               (do
                                                 (handle-async-error response)
                                                 (when ?on-error
                                                   (?on-error response)))))))})
     :start))

(λ get [endpoint on-sucess ?on-error]
  (request-async :GET endpoint {} on-sucess ?on-error))

(λ put [endpoint body]
  (request curl.put endpoint {: body}))

(λ post [endpoint body]
  (request curl.post endpoint {: body}))

(λ M.my-articles [on-success ?on-error]
  (get :/articles/me/all on-success ?on-error))

(λ M.save-article [id content]
  (put (.. :/articles/ id)
       (vim.fn.json_encode {:article {:body_markdown content}})))

(λ M.new-article [title]
  (post :/articles
        (vim.fn.json_encode {:article {:body_markdown (get-article-template title)}})))

(λ M.feed [on-success ?on-error]
  (get :/articles on-success ?on-error))

(λ M.get-article [id on-success ?on-error]
  (get (.. :/articles/ id) on-success ?on-error))

(λ M.get-article-by-path [path on-success ?on-error]
  (get (.. :/articles/ path) on-success ?on-error))

(λ M.handle-api-error [response on-success]
  (let [start-status (-> response.status (tostring) (string.sub 1 2))]
    (if (not= start-status :20)
        (notify.error (.. "Error: " response.body.error))
        (on-success response))))

M
