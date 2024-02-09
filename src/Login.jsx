import { useState } from "react";
import { login } from "../services/login";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(password, setError, setLoggedIn);
          setPassword("");
        }}
      >
        <input
          autoFocus
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">LOGIN</button>
      </form>
      <div>
        {error}
        {error ? (
          <button type="button" onClick={() => setError("")}>
            CLOSE
          </button>
        ) : null}
      </div>
      {loggedIn ? <Navigate to={"/"} /> : null}
    </div>
  );
}
