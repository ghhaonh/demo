"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

import { UpdateUsernameShema } from "@/schemas/account";
import { updateUser } from "@/actions/auth/update-user";

interface Props {
  initialData?: {
    username: string;
  };
}

export const UpdateUsernameForm = ({ initialData }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof UpdateUsernameShema>>({
    resolver: zodResolver(UpdateUsernameShema),
    defaultValues: initialData || {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateUsernameShema>) => {
    startTransition(() => {
      // updateUser(values).then((res) => {
      //   if (res.success) {
      //     toast.success(res.success);
      //     router.refresh();
      //   } else if (res.error) {
      //     setError(res.error);
      //   }
      // });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tên người dùng</CardTitle>
        <CardDescription>
          Thực hiện thay đổi tên người dùng tài khoản của bạn tại đây. Nhấn hoàn
          thành khi bạn đã hoàn tất.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ</FormLabel>
                  <FormControl>
                    <Input placeholder="nguyenvana" {...field} type="text" />
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
