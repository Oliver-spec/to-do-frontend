import { useState } from "react";

export default function FilterButton({ loading, setFilter }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      className="border-2 border-black rounded-xl p-2 hover:bg-white"
      type="button"
      onClick={() => {
        if (isClicked) {
          setFilter("");
        } else {
          setFilter("notDone");
        }

        setIsClicked(!isClicked);
      }}
      disabled={loading}
    >
      {isClicked ? "SHOW ALL" : "NOT DONE"}
    </button>
  );
}
