import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import Loader from "app/components/Loader";
import Header from "app/components/Header";
import fetcher from "app/utils/fetcher";
import "app/styles/globals.css";
import Link from "next/link";

const ViewExercise = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: exercise, error } = useSWR(
    id ? `/api/v1/exercises?id=${id}` : null,
    fetcher,
  );

  if (error)
    return (
      <p className="text-red-400">
        Erro ao carregar o exercício: {error.message}
      </p>
    );
  if (!exercise) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold">Detalhes do Exercício</h2>
          <p>
            <strong>Nome:</strong> {exercise.name}
          </p>
          <p>
            <strong>Repetições:</strong> {exercise.reps}
          </p>
          <p>
            <strong>Tempo de Descanso:</strong> {exercise.rest_seconds} segundos
          </p>
          {exercise.img_url && (
            <div>
              <strong>Imagem:</strong>
              <Image
                src={exercise.img_url}
                alt={exercise.name}
                width={512}
                height={512}
                layout="intrinsic"
                className="rounded shadow-lg max-w-full max-h-screen"
              />
            </div>
          )}
          <div className="flex justify-start">
            <Link
              href="/exercises"
              className="text-red-400 hover:text-red-500 font-medium transition-colors"
            >
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExercise;
