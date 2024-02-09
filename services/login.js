import axios from "axios";
import { fetchEvents } from "./functions";

export async function login(password, setEvents, setHasError) {
  try {
    await axios.post("/api/login", { password: password });

    fetchEvents(setEvents, setHasError);
  } catch (err) {
    setHasError(true);
  }
}
