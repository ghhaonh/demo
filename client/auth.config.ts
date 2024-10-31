import axios from "axios";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "@/schemas/account";

export default {
  providers: [
    GitHub,
    Credentials({
      authorize: async (credentials) => {
        let user = null;

        const { email, password } = await LoginSchema.parseAsync(credentials);

        user = await axios.post(
          `${process.env.BACKEND_HOST_URL}auth/jwt/create/`,
          {
            email,
            password,
          }
        );

        if (!user.data) return null;

        return user.data;
      },
    }),
  ],
} satisfies NextAuthConfig;
