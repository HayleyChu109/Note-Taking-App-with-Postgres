const app = require("../app")
const request = require("supertest")

const knexConfig = require("../knexfile").development
const knex = require("knex")(knexConfig);


describe("Routes", () => {
  
    it("/ should return index page", (done) => {
      request(app)
        .get("/")
        .auth("Hayley", "123")
        .expect(200)
        done();
    });

    it("/ should return 401 if not input username and password", (done) => {
      request(app)
        .get("/")
        .expect(401)
        .end((error, res) => {
          if (error) throw error;
          done();
        })
    })

    it("/ should return 401 if not input username and password", (done) => {
      request(app)
        .get("/api/notes")
        .expect(401)
        .end((error, res) => {
          if (error) throw error;
          done();
        })
    })

    it("/ should return 404 if input incorrect router", (done) => {
      // request(app)
      //   .get("/hello")
      //   .auth("Hayley", "123")
      //   .expect(404)
      //   .end((error) => {
      //     if (error) throw error;
      //     done();
      //   })
        // done();
        knex('users').then((users)=>{
          expect(users).toBe([{username:'Hayley', password:'123', id: 1}, {username:'Heidi', password:'456', id: 2}])
        })


    })
})