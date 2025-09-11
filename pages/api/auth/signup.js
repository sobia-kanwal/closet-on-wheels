import prisma from "../../../lib/db"
import bcrypt from "bcryptjs"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body

      // check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" })
      }

      // hash password
      const hashed = await bcrypt.hash(password, 10)

      // create new user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashed,
        },
      })

      return res.status(201).json({ success: true, user })
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" })
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" })
  }
}
