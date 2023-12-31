const db = require("../db/connection");

fetchArticleById = (articleId) => {
  return db
    .query(
      `
    SELECT articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.body,
            articles.created_at,
            articles.votes,
            article_img_url,
    CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count 
    FROM comments 
    RIGHT JOIN articles ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
        GROUP BY articles.author,
            articles.title,
            articles.article_id,
            articles.topic,
            articles.body,
            articles.created_at,
            articles.votes,
            article_img_url
    `,
      [articleId]
    )
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({
          errorCode: 404,
          errorMessage: `Article with id ${articleId} not found`,
        });
      }
      return data.rows[0];
    });
};
module.exports.fetchArticleById = fetchArticleById;

exports.fetchArticles = (topic, sortBy, order, page, limit) => {
  if (
    sortBy &&
    !["author", "title", "article_id", "topic", "created_at", "votes"].includes(
      sortBy
    )
  ) {
    return Promise.reject({
      errorCode: 400,
      errorMessage: "Invalid sort query",
    });
  }
  if (order && !["asc", "desc"].includes(order)) {
    return Promise.reject({
      errorCode: 400,
      errorMessage: "Invalid order query",
    });
  }
  const orderClause = `ORDER BY ${sortBy || "articles.created_at"} ${
    order || "DESC"
  }`;
  let whereClause = "";
  let values = [];
  if (topic) {
    whereClause = `WHERE articles.topic = $3`;
    values[2] = topic;
  }

  let limitValue = Number(limit) || 10;
  let pageNum = Number(page) > 0 ? (Number(page) - 1) * limit : 0;
  let limitPaging = `LIMIT $1 OFFSET $2`;
  values[0] = limitValue;
  values[1] = pageNum;

  return db
    .query(
      `
      SELECT articles.author,
              articles.title,
              articles.article_id,
              articles.topic,
              articles.created_at,
              articles.votes,
              article_img_url,
      CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      ${whereClause}
      GROUP BY articles.author,
              articles.title,
              articles.article_id,
              articles.topic,
              articles.created_at,
              articles.votes,
              article_img_url
      ${orderClause}
      ${limitPaging}
      `,
      values
    )
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({ errorCode: 404, errorMessage: "Not found" });
      }
      return data.rows;
    });
};

exports.updateArticle = (article) => {
  if (isNaN(article.inc_votes)) {
    return Promise.reject({ errorCode: 400, errorMessage: "Invalid body" });
  }
  return db
    .query(
      `
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;
    `,
      [article.inc_votes, article.article_id]
    )
    .then((data) => {
      if (data.rows.length === 0) {
        return Promise.reject({
          errorCode: 404,
          errorMessage: `Article with id ${article.article_id} not found`,
        });
      }
      return data.rows[0];
    });
};

exports.saveArticle = (article) => {
  if (!article.title || !article.body || !article.author || !article.topic) {
    return Promise.reject({
      errorCode: 400,
      errorMessage: "Bad request. Article doesn`t have required properties",
    });
  }
  if (!article.article_img_url)
    article.article_img_url = "http://default.img/url";
  return db
    .query(
      `
        INSERT INTO articles(author, body, title, topic, article_img_url) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
      [
        article.author,
        article.body,
        article.title,
        article.topic,
        article.article_img_url,
      ]
    )

    .then((data) => {
      const result = data.rows[0];
      result.comment_count = 0;
      return result;
    });
};

exports.removeArticle = (article_id) => {
  return db.query(`
    DELETE FROM comments
    WHERE article_id = $1;
  `, [article_id])
  .then(() => {
    return db.query(`
        DELETE FROM articles
        WHERE article_id = $1;
    `, [article_id])
  })
  .then((data) => {
      if(data.rowCount > 0) return true;
      else return Promise.reject({errorCode: 404, errorMessage: "Article not found"})
  })
}