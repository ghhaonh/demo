"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useTransition } from "react";
import { Spinner } from "@/components/common/spinner";

interface Props {
  initialData?: {
    new_email: string;
    re_new_email: string;
    current_password: string;
  };
}

export const UpdateEmailForm = ({ initialData }: Props) => {
  const [isPending, startTransition] = useTransition();
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
      console.log(values);
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
                    <Input placeholder="nguyenvana" {...field} type="text" />
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
                  <FormLabel>Nhập lại Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nguyenvana@example.com"
                      {...field}
                      type="text"
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
