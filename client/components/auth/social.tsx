import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "github" | "google") => {
    signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      redirect: true,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline">
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => onClick("github")}
        type="submit"
        size="lg"
        className="w-full"
        variant="outline"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
