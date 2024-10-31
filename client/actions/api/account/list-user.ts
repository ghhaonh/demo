"use server";

import { auth } from "@/auth";
import axios from "@/lib/axios";

export const listUser = async () => {
  const session = await auth();
  try {
    const res = await axios.get("api/account/", {
      headers: {
        Authorization: `Bearer ${session?.user.access}`,
      },
    });
    return res.data;
  } catch (error) {}
};
