import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/exercises", () => {
  describe("Anonymous user", () => {
    test("Creating exercise", async () => {
      const response = await fetch("http://localhost:3000/api/v1/exercises", {
        method: "POST",
      });
      expect(response.status).toBe(201);

      const responseBody = await response.json();

      expect(typeof responseBody).toBe("object");
    });
  });
});
