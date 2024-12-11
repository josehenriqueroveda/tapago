import React from "react";
import "app/globals.css";
import useSWR from "swr";
import {
  LuPlus,
  LuSquarePen,
  LuDumbbell,
  LuClipboardList,
} from "react-icons/lu";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const Settings = () => (
  <section className="mb-12">
    <h2 className="text-xl md:text-2xl font-semibold mb-6">Settings</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <button className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors flex flex-col items-center gap-3">
        <LuPlus className="h-8 w-8 text-blue-400" />
        <span clanssName="font-medium">Add Workout</span>
      </button>

      <button className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors flex flex-col items-center gap-3">
        <LuPlus className="h-8 w-8 text-green-400" />
        <span className="font-medium">Add Exercise</span>
      </button>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-6 px-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <LuDumbbell className="h-8 w-8" />
            TÁ PAGO
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Settings />
      </main>
    </div>
  );
};

export default Home;
