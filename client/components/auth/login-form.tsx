"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/common/form-error";
import { Spinner } from "@/components/common/spinner";
import { LoginSchema } from "@/schemas/account";
import { login } from "@/actions/auth/login";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((res) => {
        if (res?.success) {
          console.log(res.success);
        }
        setError(res?.error);
      });
    });
  };

  return (
    <div>
      <CardWrapper
        headerTitle="Đăng nhập"
        headerDescription="Chào mừng trở lại"
        backButtonLabel="Bạn chưa có tài khoản? Đăng ký"
        backButtonHref="/auth/register"
        className="mt-10"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nguyenvana@example.com"
                      {...field}
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />

            <Button
              className="w-full flex items-center space-x-2"
              type="submit"
              disabled={isPending}
            >
              <span>Đăng nhập</span>
              {isPending && <Spinner />}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
