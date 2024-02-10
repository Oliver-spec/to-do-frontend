import { useState, useEffect } from "react";
import {
  deleteEvent,
  fetchEvents,
  flipStatus,
  postEvent,
} from "../services/functions";
import { Navigate } from "react-router-dom";
import {
  VscArrowLeft,
  VscArrowRight,
  VscCheck,
  VscTrash,
  VscClose,
  VscPass,
} from "react-icons/vsc";

function App() {
  const [events, setEvents] = useState([]);
  const [input, setInput] = useState({
    name: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    fetchEvents(setEvents, setError, page, setMaxPage);
  }, [page]);

  return (
    <main className="flex flex-col">
      <div className="flex flex-row gap-10 p-3 bg-slate-200">
        <input
          className="border-2 border-black rounded-2xl p-2 outline-none text-lg w-1/5"
          type="text"
          placeholder="Name"
          value={input.name}
          onChange={(event) => {
            const newInput = { ...input, name: event.target.value };
            setInput(newInput);
          }}
        />
        <input
          className="border-2 border-black rounded-2xl p-2 outline-none text-lg w-1/5"
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
            postEvent(input, setEvents, setError, page, setMaxPage);
            setInput({
              name: "",
              date: "",
            });
          }}
        >
          ADD
        </button>
        {error && (
          <div className="flex gap-16 border-2 border-red-600 rounded-xl p-2 bg-rose-200 text-xl">
            <div>{error}</div>
            <button
              className="rounded-full hover:bg-white"
              type="button"
              onClick={() => setError("")}
            >
              <VscClose size="28px" />
            </button>
          </div>
        )}
      </div>

      <div className="ml-10">
        <div className="p-5 text-2xl font-bold">Events</div>
        {events.map((event) => (
          <div
            className="flex flex-row gap-10 border-2 border-black rounded-xl p-3 w-5/6 bg-slate-200 mb-5"
            key={event.id}
          >
            <div className="flex flex-col items-center justify-center text-xl">
              <div>{event.name}</div>
            </div>
            <div className="flex flex-col items-center justify-center text-xl">
              <div>{event.date}</div>
            </div>
            <div className="flex flex-col items-center justify-center text-xl">
              <div>
                {event.status === "done" ? <VscPass size="28px" /> : null}
              </div>
            </div>
            <div className="flex-1"></div>
            <button
              className="border-2 border-black rounded-xl p-2 hover:bg-white"
              type="button"
              onClick={() =>
                flipStatus(event.id, setEvents, setError, page, setMaxPage)
              }
            >
              <VscCheck size="28px" />
            </button>
            <button
              className="border-2 border-red-600 rounded-xl p-2 hover:bg-white"
              type="button"
              onClick={() =>
                deleteEvent(event.id, setEvents, setError, page, setMaxPage)
              }
            >
              <VscTrash size="28px" color="red" />
            </button>
          </div>
        ))}

        <div className="flex flex-row gap-3">
          <button
            className="border-none rounded-xl py-2 px-2 hover:bg-slate-200"
            type="button"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            <VscArrowLeft size="28px" />
          </button>
          <div className="text-xl border-2 border-black rounded-xl py-2 px-5">
            {page}
          </div>
          <button
            className="border-none rounded-xl py-2 px-2 hover:bg-slate-200"
            type="button"
            onClick={() => {
              if (page < maxPage) {
                setPage(page + 1);
              }
            }}
          >
            <VscArrowRight size="28px" />
          </button>
        </div>
      </div>

      {error === "Invalid Token - Please Login" ? (
        <Navigate to="/login" />
      ) : null}
    </main>
  );
}

export default App;
