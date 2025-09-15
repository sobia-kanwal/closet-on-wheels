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
  {/* Google Button */}
  <button
    onClick={() =>
      signIn("google", { prompt: "select_account" }, { callbackUrl: "/" })
    }
    className="w-full border py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-100 transition"
  >
    {/* Multicolor Google G Logo */}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="w-6 h-6">
  <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272v95.4h146.9c-6.3 34.2-25 63.1-53.6 82.4l86.5 67.2c50.7-46.7 81.7-115.6 81.7-194.6z"/>
  <path fill="#34A853" d="M272 544.3c72.9 0 134.1-24.1 178.8-65.1l-86.5-67.2c-24.1 16.2-55 25.9-92.3 25.9-70.8 0-130.7-47.7-152.2-111.8l-89 68.4C72.6 482.7 165.3 544.3 272 544.3z"/>
  <path fill="#FBBC05" d="M119.8 325.9c-5.6-16.2-8.8-33.6-8.8-51.9s3.2-35.7 8.8-51.9l-89-68.4C10.8 190.5 0 225.5 0 274c0 48.5 10.8 83.5 30.8 120.3l89-68.4z"/>
  <path fill="#EA4335" d="M272 107.7c39.7 0 75.4 13.7 103.5 40.7l77.4-77.4C406.1 24.2 344.9 0 272 0 165.3 0 72.6 61.6 30.8 153.7l89 68.4c21.6-64.1 81.5-111.8 152.2-111.8z"/>
</svg>
    <span className="font-medium text-gray-700">Continue with Google</span>
  </button>

  {/* Facebook Button */}
  <button
    onClick={() => signIn("facebook")}
    className="w-full border py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-gray-100 transition"
  >
    <FaFacebook className="w-5 h-5 text-blue-600" />
    <span className="font-medium text-gray-700">Continue with Facebook</span>
  </button>
</div>
      </div>
    </div>
  )
}
