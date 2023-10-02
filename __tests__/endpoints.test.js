const app = require("../app");
const query = require("supertest");
const seed = require("../db/seeds/seed");
const db = require('../db/connection');
const data = require('../db/data/test-data')

const endpointsJson = require("../endpoints.json");

beforeEach(()=>{
  return seed(data);
})

afterAll(()=>{
  db.end();
})

// GET /api
describe("GET /api", () => {
  test("should return an object describing all the available endpoints on API", () => {
    return query(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const { endpoints } = res.body;
        for(endpoint in endpoints){
          console.log(endpoints[endpoint]);
          expect(typeof endpoints[endpoint].description).toBe('string');
        }
      });
  });
});
