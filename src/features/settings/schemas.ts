import * as z from "zod";

export const updateAccountSchema = z.object({});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const phoneSchema = z.object({
  phone: z.string().regex(phoneRegex, "Invalid number"),
});
export type PhonePayload = z.infer<typeof phoneSchema>;

export const updateAppearanceSchema = z.object({
  theme: z.string(),
  font: z.string(),
});
export type UpdateAppearancePayload = z.infer<typeof updateAppearanceSchema>;

export const updateNotificationSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
  mobile: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});
export type UpdateNotificationPayload = z.infer<
  typeof updateNotificationSchema
>;

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  image: z.string().optional(),
});
export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password not matched",
    path: ["confirmPassword"],
  });
export type UpdatePasswordPayload = z.infer<typeof updatePasswordSchema>;
