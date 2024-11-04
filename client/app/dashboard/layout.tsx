import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user.is_staff) {
    redirect("/");
  }
  return (
    <div className="flex flex-col md:flex-row px-4 lg:px-8">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
