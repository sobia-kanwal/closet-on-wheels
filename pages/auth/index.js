import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { FaGoogle, FaFacebook } from "react-icons/fa"   // ✅ No missing icons

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login") // login | signup
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [message, setMessage] = useState({ type: "", text: "" }) // ✅ success/error
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: "", text: "" }) // clear old messages

    if (activeTab === "login") {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      })

      if (res?.error) {
        setMessage({ type: "error", text: res.error })
      } else {
        setMessage({ type: "success", text: "Login successful! Redirecting..." })
        setTimeout(() => router.push("/"), 1000)
      }
    } else {
      // SIGNUP API
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setMessage({ type: "success", text: "Signup successful! Please log in." })
        setActiveTab("login")
      } else {
        const data = await res.json()
        setMessage({ type: "error", text: data.error || "Signup failed" })
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        {/* Tabs */}
        <div className="flex justify-around border-b mb-6">
          <button
            className={`pb-2 font-semibold ${
              activeTab === "login"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`pb-2 font-semibold ${
              activeTab === "signup"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Alert Messages */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              message.type === "error"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {activeTab === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            {activeTab === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <span className="flex-1 h-px bg-gray-200"></span>
          <span className="text-gray-500 text-sm">OR</span>
          <span className="flex-1 h-px bg-gray-200"></span>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button onClick={() => signIn("google", { prompt: "select_account" })}
            className="w-full border py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-100"
          >
            <FaGoogle className="w-5 h-5 text-red-500" />
            Continue with Google
          </button>
          <button
            onClick={() => signIn("facebook")}
            className="w-full border py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-100"
          >
            <FaFacebook className="w-5 h-5 text-blue-600" />
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  )
}
