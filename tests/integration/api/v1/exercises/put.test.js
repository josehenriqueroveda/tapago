import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.waitForTable("exercises");
});

describe("PUT /api/v1/exercises", () => {
  describe("Anonymous user", () => {
    test("Updating an exercise", async () => {
      const responsePost = await fetch(
        "http://localhost:3000/api/v1/exercises",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Supino Reto",
            reps: "8-10",
            rest_seconds: 60,
          }),
        },
      );

      const responseBodyPost = await responsePost.json();
      const id = responseBodyPost.id;

      const response = await fetch(
        `http://localhost:3000/api/v1/exercises?id=${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reps: "16-13-10-7",
            rest_seconds: 90,
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(typeof responseBody).toBe("object");
      expect(responseBody.reps).toBe("16-13-10-7");
      expect(responseBody.rest_seconds).toBe(90);
    }, 5000);
  });
});
