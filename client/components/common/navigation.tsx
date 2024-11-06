import { headerRoutes } from "@/routes";

import NavItem from "@/components/common/nav-item";

export const Navigation = () => {
  return (
    <nav className="flex items-center space-x-4">
      {headerRoutes.map((item) => {
        return <NavItem key={item.href} title={item.title} href={item.href} />;
      })}
    </nav>
  );
};
