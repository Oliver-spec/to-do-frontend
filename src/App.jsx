import { useState, useEffect } from "react";
import {
  deleteEvent,
  fetchEvents,
  flipStatus,
  postEvent,
} from "../services/functions";
import "./App.css";
import { login } from "../services/login";

function App() {
  const [events, setEvents] = useState([]);
  const [input, setInput] = useState({
    name: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchEvents(setEvents, setError);
  }, []);

  return (
    <>
      <input
        type="password"
        placeholder="PASSWORD"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          login(password, setEvents, setError);
          setPassword("");
        }}
      >
        LOGIN
      </button>
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
    </>
  );
}

export default App;
