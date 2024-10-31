"use server";

import { signOut, auth } from "@/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "../ui/button";
import Link from "next/link";

export const UserButton = async () => {
  const session = await auth();
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex items-center space-x-3">
            <span>{session?.user.name}</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/auth/me">Quản lý tài khoản</Link>
          </DropdownMenuItem>
          {session?.user.is_staff && (
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>Team</DropdownMenuItem>
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
