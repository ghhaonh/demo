"use server";

import aixos from "@/lib/axios";

const existUserByEmail = async (email: string) => {
  try {
    const res = await aixos.get(`api/account/exist-email/${email}/`);
    return res.data;
  } catch (error) {}
};

export default existUserByEmail;
