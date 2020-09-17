const request = require("supertest");
const { User } = require("../../../models/user");

let server;

describe("/api/users", () => {
  let payload;

  beforeEach(() => {
    server = require("../../../index");
    payload = {
      firstName: "aaaaa",
      lastName: "bbbbb",
      email: "aaa@bbb.com",
      password: "12345",
    };
  });
  afterEach(async () => {
    await User.deleteMany({});
    await server.close();
  });

  describe("GET /me", () => {
    it("should return the user object without the password property if a valid authToken is provided", async () => {
      const user = new User(payload);
      await User.collection.insertOne(user);
      const token = user.generateAuthToken();

      const res = await request(server)
        .get("/api/users/me")
        .set("x-auth-token", token);

      expect(res.body).toHaveProperty("firstName", payload.firstName);
      expect(res.body).toHaveProperty("lastName", payload.lastName);
      expect(res.body).toHaveProperty("email", payload.email);
      expect(res.body).not.toHaveProperty("password");
    });
  });

  describe("POST /", () => {
    const exec = async () => {
      return await request(server).post("/api/users").send(payload);
    };

    it("should return 400 if the firstName is not provided", async () => {
      payload.firstName = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the firstName is more than 50 characters", async () => {
      payload.firstName = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the lastName is not provided", async () => {
      payload.lastName = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the lastName is more than 50 characters", async () => {
      payload.lastName = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

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

    it("should return 400 if the password is less than 5 characters", async () => {
      payload.password = "aaaa";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the password is more than 255 characters", async () => {
      payload.password = new Array(257).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the user with the email given has already registered", async () => {
      const user = new User(payload);
      await User.collection.insertOne(user);

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return the user object if the payload is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("firstName", payload.firstName);
      expect(res.body).toHaveProperty("lastName", payload.lastName);
      expect(res.body).toHaveProperty("email", payload.email);
      expect(res.body).toHaveProperty("imageUrl");
      expect(res.body).toHaveProperty("thumbnailUrl");
      expect(res.body).not.toHaveProperty("password");
    });
  });
});
