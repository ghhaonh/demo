"use server";

import { z } from "zod";

import axios from "@/lib/axios";
import { auth } from "@/auth";

import { UpdateUserShema } from "@/schemas/account";

export const updateUser = async (values: z.infer<typeof UpdateUserShema>) => {
  const session = await auth();
  try {
    await axios.patch("auth/users/me/", values, {
      headers: {
        Authorization: `Bearer ${session?.user.access}`,
      },
    });
  } catch (error) {
    return {
      error: "Cập nhật không thành công",
    };
  }

  return {
    success: "Cập nhật thành công",
  };
};
