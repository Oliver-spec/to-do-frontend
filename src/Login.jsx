import { useState } from "react";
import { login } from "../services/login";
import { Navigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <main className="h-screen flex items-center justify-center">
      <form
        className="flex flex-col gap-8 w-1/3 items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          login(password, setError, setLoggedIn);
          setPassword("");
        }}
      >
        <input
          className="border-2 border-black rounded-2xl p-3 outline-none w-full text-xl"
          autoFocus
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="border-2 border-black rounded-2xl p-2 w-1/2 hover:bg-slate-200"
          type="submit"
        >
          LOGIN
        </button>
        {error && (
          <div className="flex gap-16 border-4 border-red-600 rounded-xl p-3 bg-rose-200 text-xl">
            <div>{error}</div>
            <button type="button" onClick={() => setError("")}>
              <IoIosClose size="28px" />
            </button>
          </div>
        )}
      </form>

      {loggedIn ? <Navigate to={"/"} /> : null}
    </main>
  );
}
