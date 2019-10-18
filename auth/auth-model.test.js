const authModel = require("./auth-model.js");
const db = require("../database/dbConfig.js");


describe("adduser()", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("should add user to database", async () => {
    const records = await db("users");
    expect(records).toHaveLength(0);

    await authModel.addUser({ username: "Min", password: "123" });
    const usersRecord = await db("users");
    expect(usersRecord).toHaveLength(1);
  });
    afterAll(async () => {
      await db("users").truncate();
    });
});
