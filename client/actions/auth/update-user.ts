"use client";

import { z } from "zod";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import axios from "@/lib/axios";
import { UpdateUserShema } from "@/schemas/account";

export const updateUser = (values: z.infer<typeof UpdateUserShema>) => {
  const { data: session } = useSession();

  const update = async () => {
    if (session) {
      try {
        await axios.patch("auth/users/me/", values, {
          headers: {
            Authorization: `Bearer ${session?.user.access}`,
          },
        });
      } catch (error) {}
    }
  };

  useEffect(() => {
    update();
  }, [session]);
};
