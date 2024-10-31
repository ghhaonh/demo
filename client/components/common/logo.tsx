import Link from "next/link";

export const Logo = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 font-bold text-2xl"
    >
      <span>haonguyen.</span>
    </Link>
  );
};
