import { useEffect } from "react";

export default function ErrorHandler({ error, setError }) {
  useEffect(() => {
    setTimeout(() => setError(""), 3000);
  }, []);

  return (
    <div className="p-3 bg-rose-200 text-xl sticky bottom-0 opacity-85 font-bold">
      {error}
    </div>
  );
}
