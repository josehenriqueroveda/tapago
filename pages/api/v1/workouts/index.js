import database from "infra/database";

async function workouts(request, response) {
  const allowedMethods = ["GET", "POST", "PUT", "DELETE"];

  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }

  try {
    switch (request.method) {
      case "GET":
        await handleGet(request, response);
        break;
      case "POST":
        await handlePost(request, response);
        break;
      case "PUT":
        await handlePut(request, response);
        break;
      case "DELETE":
        await handleDelete(request, response);
        break;
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGet(request, response) {
  const { id } = request.query;

  if (id) {
    const workout = await database.query({
      text: "SELECT * FROM workouts WHERE id = $1",
      values: [id],
    });

    if (workout.rows.length === 0) {
      return response.status(404).json({ error: "Workout not found" });
    }

    const exercises = await database.query({
      text: `
        SELECT e.* 
        FROM exercises e 
        INNER JOIN workouts_exercises we 
        ON e.id = we.exercise_id 
        WHERE we.workout_id = $1`,
      values: [id],
    });

    return response.status(200).json({
      ...workout.rows[0],
      exercises: exercises.rows,
    });
  } else {
    const workouts = await database.query({
      text: "SELECT * FROM workouts",
    });
    return response.status(200).json(workouts.rows);
  }
}

async function handlePost(request, response) {
  const { name, description, exercise_ids } = request.body;

  if (!name) {
    return response.staus(400).json({ error: "Name is required" });
  }

  const workout = await database.query({
    text: "INSERT INTO workouts (name, description) VALUES ($1, $2) RETURNING *",
    values: [name, description],
  });

  const workoutId = workout.rows[0].id;

  if (exercise_ids && exercise_ids.length > 0) {
    for (const exerciseId of exercise_ids) {
      await database.query({
        text: "INSERT INTO workouts_exercises (workout_id, exercise_id) VALUES ($1, $2)",
        values: [workoutId, exerciseId],
      });
    }
  }

  return response.status(201).json(workout.rows[0]);
}

async function handlePut(request, response) {
  const { id } = request.query;
  const { name, description, exercise_ids } = request.body;

  if (!id) {
    return response.status(400).json({ error: "ID is required" });
  }
  if (!request.body) {
    return response.status(400).json({ error: "No fields to update" });
  }
  if (name) {
    await database.query({
      text: "UPDATE workouts SET name = $1 WHERE id = $2",
      values: [name, id],
    });
  }

  if (description) {
    await database.query({
      text: "UPDATE workouts SET description = $1 WHERE id = $2",
      values: [description, id],
    });
  }

  if (exercise_ids) {
    await database.query({
      text: "DELETE FROM workouts_exercises WHERE workout_id = $1",
      values: [id],
    });

    for (const exerciseId of exercise_ids) {
      await database.query({
        text: "INSERT INTO workouts_exercises (workout_id, exercise_id) VALUES ($1, $2)",
        values: [id, exerciseId],
      });
    }
  }
  return response.status(200).json({ message: "Workout updated successfully" });
}

async function handleDelete(request, response) {
  const { id } = request.query;

  if (!id) {
    return response.status(400).json({ error: "ID is required" });
  }

  await database.query({
    text: "DELETE FROM workouts WHERE id = $1",
    values: [id],
  });

  await database.query({
    text: "DELETE FROM workouts_exercises WHERE workout_id = $1",
    values: [id],
  });

  return response
    .status(200)
    .json({ message: "Workout successfully deactivated" });
}

export default workouts;
