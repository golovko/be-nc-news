const db = require('../db/connection');

exports.fetchTopics = () => {
    return db.query(`
        SELECT * FROM topics
    `)
    .then((data) => {
        return data.rows;
    })
}

exports.saveTopic = (topic) => {
    if (!topic.slug || !topic.description) {
      return Promise.reject({
        errorCode: 400,
        errorMessage: "Bad request. Topic doesn`t have required properties",
      });
    }
   
    return db
      .query(
        `
          INSERT INTO topics(slug, description) 
          VALUES ($1, $2)
          RETURNING *
          `,
        [
          topic.slug,
          topic.description
        ]
      )
  
      .then((data) => {
        const result = data.rows[0];
        result.comment_count = 0;
        return result;
      });
  };