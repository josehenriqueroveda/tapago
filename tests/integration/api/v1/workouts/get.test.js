import orchestrator from "tests/orchestrator.js";

let workoutId;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.waitForTable("exercises");
  await orchestrator.waitForTable("workouts");
  workoutId = await dummyWorkout();
});

async function dummyWorkout() {
  const responsePost = await fetch("http://localhost:3000/api/v1/workouts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Treino de Perna",
      description: "Foco em quadriceps",
      exercise_ids: [],
    }),
  });

  const responseBodyPost = await responsePost.json();
  const dummyWorkoutId = responseBodyPost.id;
  return dummyWorkoutId;
}

describe("GET /api/v1/workouts", () => {
  describe("Anonymous user", () => {
    test("Retrieving workouts", async () => {
      const response = await fetch("http://localhost:3000/api/v1/workouts");

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    }, 5000);
  });
});

describe("GET /api/v1/workouts?id={workoutId}", () => {
  describe("Anonymous user", () => {
    test("Retrieving a workout", async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/workouts?id=${workoutId}`,
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(typeof responseBody).toBe("object");
      expect(responseBody.name).toBe("Treino de Perna");
    }, 5000);
  });
});
