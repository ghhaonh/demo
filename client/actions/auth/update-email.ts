"use server";

import { z } from "zod";

import axios from "@/lib/axios";
import { auth } from "@/auth";

import { UpdateEmailShema } from "@/schemas/account";

export const updateEmail = async (values: z.infer<typeof UpdateEmailShema>) => {
  const session = await auth();
  try {
    await axios.post("auth/users/set_email/", values, {
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
