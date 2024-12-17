import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    async function getLoader() {
      const { dotWave } = await import("ldrs");
      dotWave.register();
    }
    getLoader();
  }, []);
  return <l-dot-wave size="47" speed="1" color="#f3f4f6"></l-dot-wave>;
}
