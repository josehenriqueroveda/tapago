import orchestrator from "tests/orchestrator.js";

let exerciseId;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.waitForTable("exercises");
  exerciseId = await dummyExercise({
    name: "Levantamento Terra",
    reps: "6-8",
    rest_seconds: 90,
  });
});

async function dummyExercise(exerciseObj) {
  const responsePost = await fetch("http://localhost:3000/api/v1/exercises", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exerciseObj),
  });

  const responseBodyPost = await responsePost.json();
  const dummyExerciseId = responseBodyPost.id;
  return dummyExerciseId;
}

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

describe("GET /api/v1/exercises?id={exerciseId}", () => {
  describe("Anonymous user", () => {
    test("Retrieving a exercise", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/exercises?id=${exerciseId}`,
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(typeof responseBody).toBe("object");
      expect(responseBody.name).toBe("Levantamento Terra");
      expect(responseBody.reps).toBe("6-8");
      expect(responseBody.rest_seconds).toBe(90);
    }, 5000);
  });
});
