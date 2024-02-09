import axios from "axios";
import { fetchEvents } from "./functions";

export async function login(password, setEvents, setError) {
  try {
    await axios.post("/api/login", { password: password });

    fetchEvents(setEvents, setError);
  } catch (err) {
    setError(err.response.data);
  }
}
