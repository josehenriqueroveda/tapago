import orchestrator from "tests/orchestrator.js";

let exerciseId;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.waitForTable("exercises");
  await orchestrator.waitForTable("workouts");
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

describe("POST /api/v1/workouts", () => {
  describe("Anonymous user", () => {
    test("Creating a workout", async () => {
      const response = await fetch("http://localhost:3000/api/v1/workouts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Treino de Perna",
          description: "Foco em quadriceps",
          exercise_ids: [exerciseId],
        }),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();

      expect(typeof responseBody).toBe("object");
      expect(responseBody.name).toBe("Treino de Perna");
    }, 5000);
  });
});
