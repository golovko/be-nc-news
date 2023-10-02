const app = require("../app")
const query = require("supertest")
const seed = require('../db/seeds/seed')
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
        //.expect(200)
        .then((res) => {
            console.log(res.body);
            const {topics} = res.body;
            expect(topics.length).toBe(3);
            topics.forEach(topic => {
                expect(typeof topic.description).toBe('string');
                expect(typeof topic.slug).toBe('string');
            });
        })
     })
 })