"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl shadow-lg bg-white w-96 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Sign in</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Sign in
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="text-center">
          <button
            type="button"
            onClick={() => signIn("google")}
            className="mt-2 w-full border p-2 rounded hover:bg-gray-100"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => signIn("facebook")}
            className="mt-2 w-full border p-2 rounded hover:bg-gray-100"
          >
            Continue with Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
