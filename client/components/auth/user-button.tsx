"use server";

import Link from "next/link";
import { signOut, auth } from "@/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUser } from "@/actions/auth/get-user";

export const UserButton = async () => {
  const session = await auth();
  const user = await getUser();

  if (session && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex items-center space-x-3">
            <span className="font-semibold leading-none tracking-tight">
              {user.first_name} {user.last_name}
            </span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/auth/me">Tài khoản</Link>
          </DropdownMenuItem>
          {session?.user.is_staff && (
            <DropdownMenuItem>
              <Link href="/dashboard">Admin</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit">Đăng xuất</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <div className="flex items-center space-x-3">
      <Button variant={"outline"} asChild>
        <Link href="/auth/login">Đăng nhập</Link>
      </Button>
      <Button variant={"default"} asChild>
        <Link href="/auth/register">Đăng ký</Link>
      </Button>
    </div>
  );
};
