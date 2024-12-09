import orchestrator from "tests/orchestrator.js";

let exerciseId;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.waitForTable("exercises");
  exerciseId = await dummyExercise();
});

async function dummyExercise() {
  const responsePost = await fetch("http://localhost:3000/api/v1/exercises", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Triceps Frances",
      reps: "12",
      rest_seconds: 45,
    }),
  });

  const responseBodyPost = await responsePost.json();
  exerciseId = responseBodyPost.id;
  return exerciseId;
}

describe("DELETE /api/v1/exercises", () => {
  describe("Anonymous user", () => {
    test("Deactivates an exercise", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/exercises?id=${exerciseId}`,
        {
          method: "DELETE",
        },
      );

      expect(response.status).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        message: "Exercise successfully deactivated",
      });

      const checkResponse = await fetch(
        `http://localhost:3000/api/v1/exercises?id=${exerciseId}`,
      );
      const checkBody = await checkResponse.json();
      expect(checkResponse.status).toBe(404);
      expect(checkBody.error).toBe("Exercise not found");
    }, 5000);
  });
});
