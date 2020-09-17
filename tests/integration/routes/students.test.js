const request = require("supertest");
const { Student } = require("../../../models/student");

let server;

describe("/api/students", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    await Student.deleteMany({});
    await server.close();
  });

  describe("GET /", () => {
    it("should return all students", async () => {
      const students = [
        {
          firstName: "aaaaa",
          lastName: "bbbbb",
          email: "aaa@bbb.com",
          studentId: "1234567890",
          overallGrade: 1,
        },
        {
          firstName: "ccccc",
          lastName: "ddddd",
          email: "ccc@ddd.com",
          studentId: "0987654321",
          overallGrade: 1,
        },
      ];

      await Student.collection.insertMany(students);

      const res = await request(server).get("/api/students");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((s) => s.firstName === "aaaaa")).toBeTruthy();
      expect(res.body.some((s) => s.firstName === "ccccc")).toBeTruthy();
    });
  });
});
