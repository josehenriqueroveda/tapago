import orchestrator from "tests/orchestrator.js";

let exerciseId;
let workoutId;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.waitForTable("exercises");
  await orchestrator.waitForTable("workouts");
  exerciseId = await dummyExercise({
    name: "Agachamento",
    reps: "8-10",
    rest_seconds: 60,
  });
  workoutId = await dummyWorkout(exerciseId);
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

async function dummyWorkout(dummyExerciseId) {
  const responsePost = await fetch("http://localhost:3000/api/v1/workouts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Treino de Perna",
      description: "Foco em quadriceps",
      exercise_ids: [dummyExerciseId],
    }),
  });

  const responseBodyPost = await responsePost.json();
  const dummyWorkoutId = responseBodyPost.id;
  return dummyWorkoutId;
}

describe("PUT /api/v1/workouts", () => {
  describe("Anonymous user", () => {
    test("Updating an exercise", async () => {
      const newExerciseId = await dummyExercise({
        name: "Cadeira Extensora",
        reps: "10-12",
        rest_seconds: 60,
      });
      const response = await fetch(
        `http://localhost:3000/api/v1/workouts?id=${workoutId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: "Pernas/Gluteos",
            exercise_ids: [exerciseId, newExerciseId],
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(typeof responseBody).toBe("object");
      expect(responseBody.message).toBe("Workout updated successfully");
    }, 5000);
  });
});
