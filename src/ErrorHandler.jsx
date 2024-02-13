import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ErrorHandler({ error, setError }) {
  useEffect(() => {
    setTimeout(() => setError(""), 3000);
  }, []);

  return (
    <div>
      <div className="flex gap-16 border-4 border-red-600 rounded-xl p-3 bg-rose-200 text-xl">
        <div>{error}</div>
      </div>
    </div>
  );
}
