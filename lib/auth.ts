// lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { getServerSession } from "next-auth"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("❌ Email atau password tidak diisi")
            return null
          }

          console.log("📩 CREDENTIALS:", credentials)

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          console.log("🔍 USER FOUND:", user)

          if (!user) {
            console.log("❌ User tidak ditemukan:", credentials.email)
            return null
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)
          console.log("🔐 PASSWORD VALID:", isValid)

          if (!isValid) {
            console.log("❌ Password salah untuk:", credentials.email)
            console.log("Input password:", credentials.password)
            console.log("Hashed password:", user.password)
            return null
          }

          console.log("✅ LOGIN BERHASIL:", user.email)
          return user
        } catch (error) {
          console.error("🔥 ERROR di authorize:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
