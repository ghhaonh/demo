"use server";

import aixos from "@/lib/axios";

const existUserByUsername = async (username: string) => {
  try {
    const res = await aixos.get(`api/exist-username/${username}/`);
    return res.data;
  } catch (error) {}
};

export default existUserByUsername;
