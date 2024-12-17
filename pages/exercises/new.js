import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "app/styles/globals.css";

const ExerciseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    reps: "",
    rest_seconds: 0,
    img_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Cadastrar Exercício</h2>

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
              Tempo de Descanço (segundos)
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
              Link da Imagem do Exercício
            </label>
            <input
              type="url"
              id="img_url"
              name="img_url"
              value={formData.img_url}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.img_url && (
              <div className="mt-4">
                <p className="text-sm mb-2">Pré-visualização:</p>
                <Image
                  src={formData.img_url}
                  width={512}
                  height={512}
                  alt="Pré-visualização"
                  className="w-48 h-48 object-cover border border-gray-700 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Salvar
          </button>
          <Link
            href="/"
            className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
