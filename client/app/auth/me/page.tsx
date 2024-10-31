import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UpdateUserForm } from "@/components/auth/update-user-form";
import { UpdateEmailForm } from "@/components/auth/update-email-form";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";
import { getUser } from "@/actions/auth/get-user";

export default async function UserDetailPage() {
  const user = await getUser();
  return (
    <div className="w-full flex items-center justify-center mt-10">
      <Tabs defaultValue="account" className="w-[500px] space-y-3">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Tài khoản</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="password">Mật khẩu</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <UpdateUserForm initialData={user} />
        </TabsContent>
        <TabsContent value="email">
          <UpdateEmailForm />
        </TabsContent>
        <TabsContent value="password">
          <UpdatePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
