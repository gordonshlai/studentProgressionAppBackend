const request = require("supertest");
const { User } = require("../../../models/user");

let server;

describe("/api/users", () => {
  let payload;

  beforeEach(async () => {
    server = require("../../../index");
    payload = {
      email: "aaa@bbb.com",
      password: "12345",
    };
    await request(server).post("/api/users").send({
      firstName: "aaaaa",
      lastName: "bbbbb",
      email: payload.email,
      password: payload.password,
    });
  });
  afterEach(async () => {
    await User.deleteMany({});
    await server.close();
  });

  const exec = async () => {
    return await request(server).post("/api/auth").send(payload);
  };
  describe("POST /", () => {
    it("should return 400 if the email is is not provided", async () => {
      payload.email = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the email is more than 255 characters", async () => {
      payload.email = new Array(257).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the email is not a valid email", async () => {
      payload.email = "abc";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the password is not provided", async () => {
      payload.password = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the email does not match with any users saved in the database", async () => {
      payload.email = "ccc@ddd.com";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the email and password combination is incorrect", async () => {
      payload.password = "123456";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return the auth token if the payload is valid", async () => {
      const res = await exec();

      expect(res.text).toEqual(expect.stringMatching(/.*.*/));
    });
  });
});
