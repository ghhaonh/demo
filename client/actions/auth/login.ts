"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

import { LoginSchema } from "@/schemas/account";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Dữ liệu không hợp lệ" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Tài khoản hoặc mật khẩu không",
          };
        default:
          return {
            error: "Đăng nhập không thành công",
          };
      }
    }
    throw error;
  }
  return { success: "Đăng nhập thành công" };
};
