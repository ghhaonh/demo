"use server";

import { auth } from "@/auth";
import axios from "@/lib/axios";

export const getUser = async () => {
  const session = await auth();
  try {
    const res = await axios.get("auth/users/me/", {
      headers: {
        Authorization: `Bearer ${session?.user.access}`,
      },
    });
    return res.data;
  } catch (error) {}
};
