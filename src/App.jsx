import { useState, useEffect } from "react";
import { fetchEvents, postEvent } from "../api/functions";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [input, setInput] = useState({
    name: "",
    date: "",
  });

  useEffect(() => {
    fetchEvents(setEvents);
  }, []);

  return (
    <>
      {events.map((event) => (
        <div key={event.id}>
          <div>{event.name}</div>
          <div>{event.date}</div>
          <div>{event.status}</div>
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
      <button type="button" onClick={() => postEvent(input, setEvents)}>
        ADD
      </button>
    </>
  );
}

export default App;
