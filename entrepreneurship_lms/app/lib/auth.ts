import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./db"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("--- Authorize function called ---");

        if (!credentials?.email || !credentials?.password) {
          console.log("Authorize failed: Missing credentials.");
          return null
        }

        console.log(`Step 1: Finding user with email: ${credentials.email}`);
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          console.log("Authorize failed: User not found or user has no password.");
          return null
        }

        console.log("Step 2: User found. Comparing passwords.");
        // New detailed logging
        console.log(`Plain text password length being compared: ${credentials.password.length}`);
        console.log(`Hashed password from DB starts with: ${user.password.substring(0, 7)}`);

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )
        
        // New detailed logging
        console.log(`Result of bcrypt.compare: ${isPasswordValid}`);

        if (!isPasswordValid) {
          console.log("Authorize failed: Password comparison returned false.");
          return null
        }

        console.log("Step 3: Password is valid. Login successful.");
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin", 
  },
}
