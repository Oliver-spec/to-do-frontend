import { useState, useEffect } from "react";
import {
  deleteEvent,
  fetchEvents,
  flipStatus,
  postEvent,
} from "../services/functions";
import { Navigate } from "react-router-dom";

function App() {
  const [events, setEvents] = useState([]);
  const [input, setInput] = useState({
    name: "",
    date: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents(setEvents, setError);
  }, []);

  return (
    <>
      {events.map((event) => (
        <div key={event.id}>
          <div>{event.name}</div>
          <div>{event.date}</div>
          <div>{event.status}</div>
          <button
            type="button"
            onClick={() => deleteEvent(event.id, setEvents, setError)}
          >
            DELETE
          </button>
          <button
            type="button"
            onClick={() => flipStatus(event.id, setEvents, setError)}
          >
            DONE
          </button>
        </div>
      ))}
      <input
        type="text"
        placeholder="Name"
        value={input.name}
        onChange={(event) => {
          const newInput = { ...input, name: event.target.value };
          setInput(newInput);
        }}
      />
      <input
        type="date"
        value={input.date}
        onChange={(event) => {
          const newInput = { ...input, date: event.target.value };
          setInput(newInput);
        }}
      />
      <button
        type="button"
        onClick={() => {
          postEvent(input, setEvents, setError);
          setInput({
            name: "",
            date: "",
          });
        }}
      >
        ADD
      </button>
      <div>
        {error}
        {error ? (
          <button type="button" onClick={() => setError("")}>
            CLOSE
          </button>
        ) : null}
      </div>
      {error === "Invalid Token - Please Login" ? (
        <Navigate to="/login" />
      ) : null}
    </>
  );
}

export default App;
