"use client";

import { signOut, useSession } from "next-auth/react";

const AutoSignOutRefreshExpires = () => {
  const { data: session } = useSession();
  if (session?.user.error === "RefreshTokenError") {
    signOut();
  }
  return <div></div>;
};

export default AutoSignOutRefreshExpires;
