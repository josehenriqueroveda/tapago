import database from "infra/database";

async function exercises(request, response) {
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
    const result = await database.query({
      text: "SELECT * FROM exercises WHERE id = $1 and is_active = true",
      values: [id],
    });

    if (result.rows.length === 0) {
      return response.status(404).json({ error: "Exercise not found" });
    }
    return response.status(200).json(result.rows[0]);
  } else {
    const result = await database.query({
      text: "SELECT * FROM exercises WHERE is_active = true",
    });
    return response.status(200).json(result.rows);
  }
}

async function handlePost(request, response) {
  const { name, reps, rest_seconds } = request.body;

  if (!name) {
    return response.status(400).json({ error: "Name is required" });
  }

  const result = await database.query({
    text: `INSERT INTO exercises (name, reps, rest_seconds) VALUES ($1, $2, $3) RETURNING *`,
    values: [name, reps || null, rest_seconds || null],
  });

  return response.status(201).json(result.rows[0]);
}

async function handlePut(request, response) {
  const { id } = request.query;
  const { name, reps, rest_seconds } = request.body;

  if (!id) {
    return response.status(400).json({ error: "ID is required" });
  }

  if (!request.body) {
    return response.status(400).json({ error: "No fields to update" });
  }

  if (name) {
    await database.query({
      text: "UPDATE exercises SET name = $1 WHERE id = $2",
      values: [name, id],
    });
  }

  if (reps) {
    await database.query({
      text: "UPDATE exercises SET reps = $1 WHERE id = $2",
      values: [reps, id],
    });
  }

  if (rest_seconds) {
    await database.query({
      text: "UPDATE exercises SET rest_seconds = $1 WHERE id = $2",
      values: [rest_seconds, id],
    });
  }

  return response
    .status(200)
    .json({ message: "Exercise updated successfully" });
}

async function handleDelete(request, response) {
  const { id } = request.query;
  console.log(id);
  if (!id) {
    return response.status(400).json({ error: "ID is required" });
  }

  const result = await database.query({
    text: `UPDATE exercises SET is_active = false WHERE id = $1 RETURNING *`,
    values: [id],
  });

  if (result.rows.length === 0) {
    return response.status(404).json({ error: "Exercise not found" });
  }
  return response
    .status(200)
    .json({ message: "Exercise successfully deactivated" });
}

export default exercises;
