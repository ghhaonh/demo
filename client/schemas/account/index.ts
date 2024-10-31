import existUserByEmail from "@/actions/api/account/exist/exist-user-by-email";
import existUserByUsername from "@/actions/api/account/exist/exist-user-by-username";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email không đúng định dạng",
    })
    .min(1, {
      message: "Email không được để trống",
    }),
  password: z
    .string()
    .min(8, {
      message: "Mật khẩu ít nhất 8 ký tự",
    })
    .max(24, {
      message: "Mật khẩu tối đa 24 ký tự",
    }),
});

export const RegisterSchema = z
  .object({
    first_name: z
      .string()
      .min(1, {
        message: "Không được để trống",
      })
      .max(32, {
        message: "Tối đa 32 ký tự",
      }),
    last_name: z
      .string()
      .min(1, {
        message: "Không được để trống",
      })
      .max(32, {
        message: "Tối đa 32 ký tự",
      }),
    username: z
      .string()
      .min(1, {
        message: "Không được để trống",
      })
      .refine(async (username) => {
        const exist = await existUserByUsername(username);
        return !exist;
      }, "Username không khả dụng"),
    email: z
      .string()
      .email({
        message: "Email không đúng định dạng",
      })
      .min(1, {
        message: "Email không được để trống",
      })
      .refine(async (email) => {
        const exist = await existUserByEmail(email);
        return !exist;
      }, "Email không khả dụng"),
    password: z
      .string()
      .min(8, {
        message: "Mật khẩu ít nhất 8 ký tự",
      })
      .max(24, {
        message: "Mật khẩu tối đa 24 ký tự",
      }),
    re_password: z
      .string()
      .min(8, {
        message: "Mật khẩu ít nhất 8 ký tự",
      })
      .max(24, {
        message: "Mật khẩu tối đa 24 ký tự",
      }),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["re_password"],
  });

export const UpdateUserShema = z.object({
  first_name: z
    .string()
    .min(1, {
      message: "Không được để trống",
    })
    .max(32, {
      message: "Tối đa 32 ký tự",
    }),
  last_name: z
    .string()
    .min(1, {
      message: "Không được để trống",
    })
    .max(32, {
      message: "Tối đa 32 ký tự",
    }),
  username: z
    .string()
    .min(1, {
      message: "Không được để trống",
    })
    .refine(async (username) => {
      const exist = await existUserByUsername(username);
      return !exist;
    }, "Username không khả dụng"),
});

export const UpdateEmailShema = z.object({
  new_email: z
    .string()
    .email({
      message: "Email không đúng định dạng",
    })
    .min(1, {
      message: "Email không được để trống",
    }),
  re_new_email: z
    .string()
    .email({
      message: "Email không đúng định dạng",
    })
    .min(1, {
      message: "Email không được để trống",
    }),
  current_password: z
    .string()
    .min(8, {
      message: "Mật khẩu ít nhất 8 ký tự",
    })
    .max(24, {
      message: "Mật khẩu tối đa 24 ký tự",
    }),
});
