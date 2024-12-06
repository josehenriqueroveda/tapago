async function exercises(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }

  if (request.method === "GET") {
    response.status(200).json([{}]);
  }

  if (request.method === "POST") {
    response.status(201).json({});
  }
}

export default exercises;
