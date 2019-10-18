const request = require("supertest");
const db = require("../database/dbConfig.js");
const server = require("./server.js");


describe("users model", () => {
  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("GET /", () => {
  it("should return 200", () => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});

describe("POST /api/auth/register", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it('should return 500 by missing req.body', () => {
        return request(server).post("/api/auth/register").then(res => {
            expect(res.status).toBe(500)
        })
    })
    it('should return 500 by missing req.body.password', () => {
        return request(server)
          .post("/api/auth/register")
          .send({ username: "Jenn" })
          .then(res => {
            expect(res.status).toBe(500);
          });
    })
    it("should return 200 ", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Kelly",password:"123" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
});
describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
    it("should return 200 ", () => {
        return request(server)
            .post("/api/auth/register")
            .send({ username: "MH", password: "123" })
            .then(res => {
                return request(server)
                    .post("/api/auth/login")
                    .send({ username: "MH", password: "123" })
                    .then(res => {
                        expect(res.status).toBe(200);
                    });
            })
    });
    it("should return 401 by passing wrong password ", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "MH", password: "123" })
        .then(res => {
          return request(server)
            .post("/api/auth/login")
            .send({ username: "MH", password: "321" })
            .then(res => {
              expect(res.status).toBe(401);
            });
        });
    });
    
});


describe("GET /api/jokes/", () => {
    beforeEach(async () => {
        await db("users").truncate();
    });
    it("should return 500 by authenticate", () => {
        return request(server)
            .get("/api/jokes/")
            .then(res => {
                expect(res.status).toBe(401);
            });
    });
    it("should return 200 ", () => {
        return request(server)
            .post("/api/auth/register")
            .send({ username: "MH", password: "123" })
            .then(res => {
                return request(server)
                    .post("/api/auth/login")
                    .send({ username: "MH", password: "123" })
                    .then(res => {
                        let token = res.body.token;
                        return request(server)
                            .get("/api/jokes/")
                            .set("Authorization", `${token}`)
                            .then(res => {
                                expect(res.status).toBe(200);
                            });
                    })
            });
    })
})