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
  const [hasError, setHasError] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchEvents(setEvents, setHasError);
  }, []);

  function showError() {
    setTimeout(() => setHasError(false), 3000);

    return <div>Something Went Wrong!</div>;
  }

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
          login(password, setEvents, setHasError);
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
            onClick={() => deleteEvent(event.id, setEvents, setHasError)}
          >
            DELETE
          </button>
          <button
            type="button"
            onClick={() => flipStatus(event.id, setEvents, setHasError)}
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
          postEvent(input, setEvents, setHasError);
          setInput({
            name: "",
            date: "",
          });
        }}
      >
        ADD
      </button>
      {hasError ? showError() : null}
    </>
  );
}

export default App;
