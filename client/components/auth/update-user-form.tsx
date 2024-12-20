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

import { UpdateUserShema } from "@/schemas/account";
import { updateUser } from "@/actions/auth/update-user";

interface Props {
  initialData?: {
    first_name: string;
    last_name: string;
  };
}

export const UpdateUserForm = ({ initialData }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof UpdateUserShema>>({
    resolver: zodResolver(UpdateUserShema),
    defaultValues: initialData || {
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateUserShema>) => {
    startTransition(() => {
      updateUser(values).then((res) => {
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
        <CardTitle>Tài khoản</CardTitle>
        <CardDescription>
          Thực hiện thay đổi thông tin tài khoản của bạn tại đây. nhấn hoàn
          thành khi bạn đã hoàn tất.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Văn A" {...field} type="text" />
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
