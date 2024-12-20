"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/common/spinner";
import { FormError } from "@/components/common/form-error";

import { UpdatePasswordShema } from "@/schemas/account";
import { updatePassword } from "@/actions/auth/update-password";

interface Props {
  initialData?: {
    new_email: string;
    re_new_email: string;
    current_password: string;
  };
}

export const UpdatePasswordForm = ({ initialData }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof UpdatePasswordShema>>({
    resolver: zodResolver(UpdatePasswordShema),
    defaultValues: initialData || {
      new_password: "",
      re_new_password: "",
      current_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UpdatePasswordShema>) => {
    startTransition(() => {
      updatePassword(values).then((res) => {
        if (res.success) {
          toast.success(res.success);
          router.refresh();
        } else if (res.error) {
          setError(res.error);
        }
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mật khẩu</CardTitle>
        <CardDescription>
          Thực hiện thay đổi mật khẩu của bạn tại đây. Nhấn hoàn thành khi bạn
          đã hoàn tất.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="re_new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu hiện tại</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />

            <Button className="" type="submit" disabled={isPending}>
              <span>Lưu thay đổi</span>
              {isPending && <Spinner />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
