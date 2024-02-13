import { useDebouncedCallback } from "use-debounce";

export default function Search({ setSearchTerm }) {
  const debounced = useDebouncedCallback((searchTerm) => {
    setSearchTerm(searchTerm);
  }, 500);

  return (
    <div className="p-3 w-1/3">
      <input
        className="border-2 border-black rounded-2xl p-2 outline-none text-lg w-5/6"
        type="search"
        placeholder="SEARCH"
        onChange={(event) => debounced(event.target.value)}
      />
    </div>
  );
}
