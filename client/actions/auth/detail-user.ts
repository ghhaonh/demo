"use client";

import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface User {
  username: string;
  first_name: string;
  last_name: string;
}

export const detailUser = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();

  const getUser = async () => {
    if (session) {
      try {
        const res = await axios.get("auth/users/me/", {
          headers: {
            Authorization: `Bearer ${session?.user.access}`,
          },
        });
        setUser(res.data);
      } catch (error) {}
    }
  };

  useEffect(() => {
    getUser();
  }, [session]);

  return user;
};
