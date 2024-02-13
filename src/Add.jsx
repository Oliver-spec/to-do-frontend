import axios from "axios";
import { useState } from "react";

export default function Add({ setError, setEvents, setMaxPage }) {
  const [input, setInput] = useState({
    name: "",
    date: "",
  });

  async function handlePost() {
    try {
      const formattedEvent = {
        eventName: input.name,
        eventDate: `${input.date}T00:00:00.000Z`,
      };

      const res = await axios.post("/api/events", formattedEvent);
      const { newEvents, maxPage } = res.data;

      setEvents(newEvents);
      setMaxPage(maxPage);
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="flex flex-row gap-10 p-3 w-5/6">
      <input
        className="border-2 border-black rounded-2xl p-2 outline-none text-lg w-1/3"
        type="text"
        placeholder="Name"
        value={input.name}
        onChange={(event) => {
          const newInput = { ...input, name: event.target.value };
          setInput(newInput);
        }}
      />
      <input
        className="border-2 border-black rounded-2xl p-2 outline-none text-lg w-1/6"
        type="date"
        value={input.date}
        onChange={(event) => {
          const newInput = { ...input, date: event.target.value };
          setInput(newInput);
        }}
      />
      <button
        className="border-2 border-black p-3 rounded-xl hover:bg-white"
        type="button"
        onClick={() => {
          handlePost();
          setInput({
            name: "",
            date: "",
          });
        }}
      >
        ADD
      </button>
    </div>
  );
}
