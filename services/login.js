import axios from "axios";

export async function login(password, setError, setLoggedIn) {
  try {
    await axios.post("/api/login", { password: password });
    setLoggedIn(true);
  } catch (err) {
    setError(err.response.data);
  }
}
