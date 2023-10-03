\c nc_news_test
SELECT articles.author,
articles.title,
articles.article_id,
articles.topic,
articles.created_at,
articles.votes,
article_img_url,
COUNT(comments.comment_id) AS comment_count 
FROM comments 
JOIN articles ON articles.article_id = comments.article_id
GROUP BY articles.author;