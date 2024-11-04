import { Logo } from "@/components/common/logo";
import { UserButton } from "@/components/auth/user-button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-background supports-backdrop-blur:bg-white/60">
      <div className="max-w-8xl mx-auto">
        <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
          <div className="flex items-center">
            <Logo href="/" />
            <div className="ml-10">navigation</div>
            <div className="ml-auto flex items-center space-x-4">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
