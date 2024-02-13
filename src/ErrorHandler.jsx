import { useEffect } from "react";

export default function ErrorHandler({ error, setError }) {
  useEffect(() => {
    setTimeout(() => setError(""), 3000);
  }, []);

  return (
    <div className="flex gap-16 p-3 bg-rose-200 text-xl">
      <div>{error}</div>
    </div>
  );
}
