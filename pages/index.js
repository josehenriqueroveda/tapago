import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { LuPlus, LuDumbbell, LuSearch } from "react-icons/lu";
import Loader from "app/components/Loader";
import Header from "app/components/Header";
import fetcher from "app/utils/fetcher";
import "app/styles/globals.css";

const Options = () => (
  <section className="mb-12">
    <h2 className="text-xl md:text-2xl font-semibold mb-6">Menu</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Link
        href="/workouts/new"
        className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors flex flex-col items-center gap-3"
      >
        <LuPlus className="h-8 w-8 text-blue-400" />
        <span className="font-medium">Adicionar Treino</span>
      </Link>

      <Link
        href="/exercises/new"
        className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors flex flex-col items-center gap-3"
      >
        <LuPlus className="h-8 w-8 text-green-400" />
        <span className="font-medium">Adicionar Exercício</span>
      </Link>

      <Link
        href="/exercises"
        className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors flex flex-col items-center gap-3"
      >
        <LuSearch className="h-8 w-8 text-green-400" />
        <span className="font-medium">Ver Exercícios</span>
      </Link>
    </div>
  </section>
);

const AvailableWorkouts = () => {
  const { data, error, isLoading } = useSWR("/api/v1/workouts", fetcher);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-400">Erro ao carregar treinos: {error.message}</p>
    );
  }

  if (data && data.length === 0) {
    return <p className="text-gray-400">Não há treinos cadastrados.</p>;
  }

  return (
    <section>
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        Treinos Disponíveis
      </h2>
      <div className="max-h-96 overflow-y-auto pr-2">
        <div className="space-y-4">
          {data.map((workout) => (
            <button
              key={workout.id}
              className="w-full bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-2">{workout.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {workout.exercises ? workout.exercises.length : 0}{" "}
                    exercícios • {workout.description}
                  </p>
                </div>
                <LuDumbbell className="h-6 w-6 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Options />
        <AvailableWorkouts />
      </main>
    </div>
  );
};

export default Home;
