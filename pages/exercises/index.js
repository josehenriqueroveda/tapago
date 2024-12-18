import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";
import fetcher from "app/utils/fetcher";
import Loader from "app/components/Loader";
import Header from "app/components/Header";
import { LuEye, LuPen, LuTrash } from "react-icons/lu";
import "app/styles/globals.css";

const ExercisesList = () => {
  const {
    data: exercises,
    error,
    mutate,
  } = useSWR("/api/v1/exercises", fetcher);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDelete = async (id) => {
    const confirmed = confirm(
      "Você tem certeza de que deseja excluir este exercício?",
    );
    if (!confirmed) return;

    const response = await fetch(`/api/v1/exercises?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      mutate();
    } else {
      alert("Erro ao excluir o exercício");
    }
  };

  const handleCloseModal = () => setSelectedImage(null);

  if (error)
    return (
      <p className="text-red-400">
        Erro ao carregar exercícios: {error.message}
      </p>
    );
  if (!exercises) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold">Lista de Exercícios</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-700 bg-gray-800 rounded-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-2 px-4 text-left text-gray-300">Imagem</th>
                  <th className="py-2 px-4 text-left text-gray-300">Nome</th>
                  <th className="py-2 px-4 text-left text-gray-300">
                    Repetições
                  </th>
                  <th className="py-2 px-4 text-left text-gray-300">
                    Tempo de Descanso
                  </th>
                  <th className="py-2 px-4 text-center text-gray-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise) => (
                  <tr
                    key={exercise.id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="py-2 px-4">
                      {exercise.img_url ? (
                        <Image
                          src={exercise.img_url}
                          alt={exercise.name}
                          width={12}
                          height={12}
                          className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-80"
                          onClick={() => setSelectedImage(exercise.img_url)}
                        />
                      ) : (
                        <span className="text-gray-400">Sem imagem</span>
                      )}
                    </td>
                    <td className="py-2 px-4">{exercise.name}</td>
                    <td className="py-2 px-4">{exercise.reps}</td>
                    <td className="py-2 px-4">
                      {exercise.rest_seconds} segundos
                    </td>
                    <td className="py-2 px-4 text-center">
                      <div className="flex items-center justify-center space-x-4">
                        <Link href={`/exercises/${exercise.id}`}>
                          <LuEye
                            className="text-green-400 cursor-pointer hover:text-green-500"
                            size={20}
                            title="Ver"
                          />
                        </Link>
                        <Link href={`/exercises/${exercise.id}/edit`}>
                          <LuPen
                            className="text-blue-400 cursor-pointer hover:text-blue-500"
                            size={20}
                            title="Editar"
                          />
                        </Link>
                        <LuTrash
                          className="text-red-500 cursor-pointer hover:text-red-600"
                          size={20}
                          title="Excluir"
                          onClick={() => handleDelete(exercise.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative">
              <button
                className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full p-2"
                onClick={handleCloseModal}
              >
                ✕
              </button>
              <Image
                src={selectedImage}
                alt="Imagem do Exercício"
                width={512}
                height={512}
                layout="intrinsic"
                className="rounded shadow-lg max-w-full max-h-screen"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesList;
