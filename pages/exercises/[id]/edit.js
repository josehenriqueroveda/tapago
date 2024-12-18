import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "app/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import Loader from "app/components/Loader";
import "app/styles/globals.css";

const EditExerciseForm = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: exercise,
    error,
    mutate,
  } = useSWR(id ? `/api/v1/exercises?id=${id}` : null, fetcher);

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    reps: "",
    rest_seconds: 0,
    img_url: "",
  });

  useEffect(() => {
    if (exercise) {
      setFormData(exercise);
    }
  }, [exercise]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/v1/exercises?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (error)
      return (
        <p className="text-red-400">
          Erro ao carregar o exercício: {error.message}
        </p>
      );
    if (!exercise) return <Loader />;

    if (response.ok) {
      await mutate();
      router.push("/exercises");
    } else {
      console.error("Failed to update exercise");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Editar Exercício</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nome do Exercício
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="reps" className="block text-sm font-medium mb-2">
              Repetições
            </label>
            <input
              type="text"
              id="reps"
              name="reps"
              value={formData.reps}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="rest_seconds"
              className="block text-sm font-medium mb-2"
            >
              Tempo de Descanso (segundos)
            </label>
            <input
              type="number"
              id="rest_seconds"
              name="rest_seconds"
              value={formData.rest_seconds}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="img_url" className="block text-sm font-medium mb-2">
              URL da Imagem
            </label>
            <input
              type="text"
              id="img_url"
              name="img_url"
              value={formData.img_url}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.img_url && (
              <Image
                src={formData.img_url}
                width={512}
                height={512}
                alt="Exercício"
                className="mt-4 max-h-48 mx-auto object-contain rounded-lg"
              />
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Salvar Alerações
          </button>
          <Link
            href="/exercises"
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditExerciseForm;
