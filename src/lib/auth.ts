import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRepository } from "@/src/repositories/UserRepository";
import bcrypt from "bcryptjs";
import { getClientIpFromHeaders, rateLimit } from "@/src/lib/rateLimit";

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
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.trim().toLowerCase();

        const headerLike = (req as any)?.headers;
        const ip = headerLike?.get ? getClientIpFromHeaders(headerLike) : null;

        if (ip) {
          const ipCheck = rateLimit(`auth:login:ip:${ip}`, { windowMs: 10 * 60 * 1000, max: 20 });
          if (!ipCheck.ok) return null;
        }

        const emailCheck = rateLimit(`auth:login:email:${email}`, { windowMs: 10 * 60 * 1000, max: 10 });
        if (!emailCheck.ok) return null;

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
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies:
    process.env.NODE_ENV === "production"
      ? {
          sessionToken: {
            name: "__Secure-next-auth.session-token",
            options: {
              httpOnly: true,
              sameSite: "lax",
              path: "/",
              secure: true,
            },
          },
          csrfToken: {
            name: "__Host-next-auth.csrf-token",
            options: {
              httpOnly: true,
              sameSite: "lax",
              path: "/",
              secure: true,
            },
          },
        }
      : undefined,
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
