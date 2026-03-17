import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRepository } from "@/src/repositories/UserRepository";
import bcrypt from "bcryptjs";

const userRepository = new UserRepository();

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim() || undefined;

if (process.env.NODE_ENV === "production" && !NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET must be set in production.");
}

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET || "secret-fallback-for-dev",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.trim().toLowerCase();
        const user = await userRepository.findByEmail(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      token.isAdmin = Boolean(ADMIN_EMAIL && token.email && token.email === ADMIN_EMAIL);
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    }
  }
};
