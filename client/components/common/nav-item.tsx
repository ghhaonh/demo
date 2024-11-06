"use client";

import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  title: string;
  href: string;
}

const NavItem = ({ title, href }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "text-base font-medium text-gray-500 transition-colors duration-200 hover:text-primary hover:font-semibold active:text-primary",
        isActive && "text-primary font-semibold"
      )}
    >
      {title}
    </button>
  );
};

export default NavItem;
