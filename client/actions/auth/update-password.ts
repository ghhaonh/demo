"use server";

import { z } from "zod";

import axios from "@/lib/axios";
import { auth } from "@/auth";

import { UpdatePasswordShema } from "@/schemas/account";

export const updatePassword = async (
  values: z.infer<typeof UpdatePasswordShema>
) => {
  const session = await auth();
  try {
    await axios.post("auth/users/set_password/", values, {
      headers: {
        Authorization: `Bearer ${session?.user.access}`,
      },
    });
  } catch (error) {
    return {
      error: "Mật khẩu hiện tại không đúng",
    };
  }

  return {
    success: "Cập nhật thành công",
  };
};
