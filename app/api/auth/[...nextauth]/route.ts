import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // TODO: Implement bcrypt hash comparison against the User table
        if (credentials?.email === "admin@opticrew.io" && credentials?.password === "password") {
          return { id: "1", name: "Admin", email: "admin@opticrew.io" }
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  }
})

export { handler as GET, handler as POST }
