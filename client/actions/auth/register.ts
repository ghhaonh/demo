"use server";

import { z } from "zod";
import { RegisterSchema } from "@/schemas/account";
import aixos from "@/lib/axios";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const { first_name, last_name, username, email, password, re_password } =
    await RegisterSchema.parseAsync(values);

  try {
    await aixos.post("auth/users/", {
      first_name,
      last_name,
      username,
      email,
      password,
      re_password,
    });
  } catch (error) {
    return {
      error: "Đăng ký không thành công",
    };
  }
  return { success: "Đăng ký thành công" };
};
