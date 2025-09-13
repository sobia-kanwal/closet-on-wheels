import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/db";
import bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account", // ✅ forces account selector
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isCorrectPassword) throw new Error("Invalid credentials");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image ?? null,
          role: (user as any).role ?? undefined,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
  async redirect({ url, baseUrl }) {
    // Always go home after login
    return baseUrl;
  },
  async jwt({ token, user }) {
    if (user) {
      token.id = (user as any).id;
      token.email = user.email;
      token.name = user.name;
      token.image = (user as any).image;
      token.role = (user as any).role;
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
      session.user.email = token.email as string | undefined;
      session.user.name = token.name as string | undefined;
      session.user.image = token.image as string | undefined;
      (session.user as any).role = token.role as string | undefined;
    }
    return session;
  },
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
