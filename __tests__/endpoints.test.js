const app = require("../app");
const query = require("supertest");
const seed = require("../db/seeds/seed");
const db = require('../db/connection');
const data = require('../db/data/test-data')

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
