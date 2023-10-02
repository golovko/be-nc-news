const app = require("../app");
const query = require("supertest");
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const data = require('../db/data/test-data');

beforeEach(()=>{
    return seed(data);
})

afterAll(()=>{
    db.end();
})

 // general
describe('general', () => { 
    test('return 400 if requested endpoint not exist', () => { 
        return query(app)
        .get('/api/not-exist/')
        .expect(400)
    })
})