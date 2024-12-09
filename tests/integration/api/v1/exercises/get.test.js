import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/exercises", () => {
  describe("Anonymous user", () => {
    test("Retrieving exercises", async () => {
      const response = await fetch("http://localhost:3000/api/v1/exercises");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
    }, 5000);
  });
});
