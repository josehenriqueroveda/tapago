import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { dotWave } = await import("ldrs");
      dotWave.register();
    }
    getLoader();
  }, []);
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-100 text-lg font-medium">Carregando </span>
      <l-dot-wave size="32" speed="1" color="#f3f4f6"></l-dot-wave>
    </div>
  );
}
