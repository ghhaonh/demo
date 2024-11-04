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

import { UpdateEmailShema } from "@/schemas/account";
import { Spinner } from "@/components/common/spinner";
import { FormError } from "@/components/common/form-error";
import { updateEmail } from "@/actions/auth/update-email";

interface Props {
  initialData?: {
    new_email: string;
    re_new_email: string;
    current_password: string;
  };
}

export const UpdateEmailForm = ({ initialData }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof UpdateEmailShema>>({
    resolver: zodResolver(UpdateEmailShema),
    defaultValues: initialData || {
      new_email: "",
      re_new_email: "",
      current_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateEmailShema>) => {
    startTransition(() => {
      updateEmail(values).then((res) => {
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
        <CardTitle>Email</CardTitle>
        <CardDescription>
          Thực hiện thay đổi email của bạn tại đây. Nhấn hoàn thành khi bạn đã
          hoàn tất.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="new_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email mới</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nguyenvana@example.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="re_new_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nguyenvana@example.com"
                      {...field}
                      type="email"
                    />
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
