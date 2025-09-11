import prisma from "../../../lib/db"
import User from "../../../models/User"
import bcrypt from "bcryptjs"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body
      const existingUser = await prisma.user.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" })
      }

      const hashed = await bcrypt.hash(password, 10)
      const user = await prisma.user.create({ name, email, password: hashed })

      return res.status(201).json({ success: true, user })
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" })
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" })
  }
}
