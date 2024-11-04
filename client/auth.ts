import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import authConfig from "@/auth.config";

declare module "next-auth" {
  interface User {
    access: string;
    refresh: string;
    expires_at: string;
    username: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_superuser: boolean;
    error: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    access: string;
    is_staff: boolean;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access = user.access;
        token.refresh = user.refresh;
        token.username = user.username;
        token.expires_at = user.expires_at;
        token.is_staff = user.is_staff;
        token.is_superuser = user.is_superuser;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.name = user.first_name + " " + user.last_name;

        return {
          ...token,
          ...user,
        };
      } else if (Math.floor(Date.now() / 1000) < (token.expires_at as number)) {
        return token;
      } else {
        if (!token.refresh) throw new TypeError("Missing refresh_token");

        try {
          const response = await fetch(
            "http://127.0.0.1:8000/auth/jwt/refresh/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                refresh: token.refresh,
              }),
            }
          );

          const tokensOrError = await response.json();

          if (!response.ok) {
            token.error = "RefreshTokenError";
            throw tokensOrError;
          }

          token.access = tokensOrError.access;
          token.expires_at = tokensOrError.expires_at;

          return token;
        } catch (error) {
          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.access = token.access as string;
        session.user.username = token.username as string;
        session.user.first_name = token.first_name as string;
        session.user.last_name = token.last_name as string;
        session.user.is_staff = token.is_staff as boolean;
        session.user.is_superuser = token.is_superuser as boolean;
        session.user.error = token.error as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
