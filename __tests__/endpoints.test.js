const app = require("../app");
const query = require("supertest");
const seed = require("../db/seeds/seed");
const db = require('../db/connection');
const data = require('../db/data/test-data')
require('jest-sorted');


beforeEach(()=>{
  return seed(data);
})

afterAll(()=>{
  db.end();
})

// GET /api/topics
describe('GET /api/topics', () => { 
  test('should return array of topics', () => { 
      return query(app)
      .get('/api/topics/')
      .expect(200)
      .then((res) => {
          const {topics} = res.body;
          expect(topics.length).toBe(3);
          topics.forEach(topic => {
              expect(typeof topic.description).toBe('string');
              expect(typeof topic.slug).toBe('string');
          });
      })
   })
})

 // general
 describe('general', () => { 
  test('return 400 if requested endpoint not exist', () => { 
      return query(app)
      .get('/api/not-exist/')
      .expect(400)
  })
})

// endpoints - GET /api
describe("GET /api", () => {
  test("should return an object describing all the available endpoints on API", () => {
    return query(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const { endpoints } = res.body;
        for(endpoint in endpoints){
          expect(typeof endpoints[endpoint].description).toBe('string');
        }
      });
  });
});

// GET /api/articles/:article_id
describe('GET /api/articles', () => { 
  test('should return article with a specified id', () => { 
    return query(app)
      .get('/api/articles/1')
      .expect(200)
      .then((res) => {
          const article = res.body;
          expect(article.article_id).toBe(1);
          expect(typeof article.topic).toBe('string');
          expect(typeof article.author).toBe('string');
          expect(typeof article.body).toBe('string');
          expect(typeof article.created_at).toBe('string');
          expect(typeof article.votes).toBe('number');
          expect(typeof article.article_img_url).toBe('string');
      });
  });
  test('should return 404 if no articles found with provided id ', () => { 
    return query(app)
      .get('/api/articles/10000')
      .expect(404)
      .then((res) => {
          const {errorMessage} = res.body;
          expect(errorMessage).toBe('Not found');
      });
  });
  test('should return 400 if provided id is not a number ', () => { 
    return query(app)
      .get('/api/articles/5d')
      .expect(400)
      .then((res) => {
          const {errorMessage} = res.body;
          expect(errorMessage).toBe('Bad request');
      });
  });

  test('should return array of articles sorted by created_at DESC', () => { 
    return query(app)
    .get('/api/articles/')
    .expect(200)
    .then((res) => {
        const {articles} = res.body;
        expect(articles.length).toBe(5);
        articles.forEach(article => {
          expect(articles).toBeSortedBy('created_at',{descending: true})
          expect(article).toEqual(expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number)
          })
          )
        });
    })
 })
})

// comments
//GET /api/articles/:article_id/comments
describe('GET /api/articles/:article_id/comments', () => { 
  test('should return array of comments for an article sorted by created_at DESC ', () => { 
    return query(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then((res) => {
        const {comments} = res.body;
        expect(comments.length).toBe(11);
        comments.forEach(comment => {
          expect(comments).toBeSortedBy('created_at',{descending: true})
          expect(comment).toEqual(expect.objectContaining({
            author: expect.any(String),
            comment_id: expect.any(Number),
            created_at: expect.any(String),
            votes: expect.any(Number),
            body: expect.any(String),
            article_id: expect.any(Number)
          })
          )
        });
    })
 })
 test('should return 404 if article with provided id not exist ', () => { 
  return query(app)
  .get('/api/articles/1000000/comments')
  .expect(404)
 })
 test('should return 400 if id not valid ', () => { 
  return query(app)
  .get('/api/articles/1d/comments')
  .expect(400)
 })
})