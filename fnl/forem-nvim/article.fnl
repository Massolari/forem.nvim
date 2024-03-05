(local M {})
(local {: get-plural} (require :forem-nvim.util))

(local new-line "\n")

(λ M.get-body-lines [article]
  (vim.split article.body_markdown new-line))

(λ tags-to-str [tags]
  (-> (vim.tbl_map (fn [tag]
                     (.. "#" tag)) tags)
      (vim.fn.join ", ")))

(λ M.format-to-feed [article max-columns]
  [(.. "🭽" (string.rep "▔" max-columns) "🭾")
   (.. " ## " article.title)
   (.. " " article.description)
   (.. " 👤" article.user.name " (" article.user.username ")")
   "▏"
   (.. " 🕒 " article.reading_time_minutes " "
       (get-plural article.reading_time_minutes :minute) " of reading time")
   (.. " Tags: " (tags-to-str article.tag_list))
   (.. " 💕" (tostring article.positive_reactions_count) " 💬"
       (tostring article.comments_count))
   (.. " 📆" article.readable_publish_date)
   "▏"
   (.. "🭼" (string.rep "▁" max-columns) "🭿")
   ""])

M
