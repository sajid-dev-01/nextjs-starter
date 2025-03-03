import { HTMLInputTypeAttribute } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { InputPassword } from "../ui-ext/input-password";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T, any, undefined>;
  isPending: boolean;
  name: FieldPath<T>;
  label?: string;
  type?: HTMLInputTypeAttribute | "otp" | "phone";
  placeholder?: string;
}

export const GenericInput = <T extends FieldValues>({
  form,
  isPending,
  name,
  label,
  type = "text",
  placeholder,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label || name[0].toUpperCase() + name.slice(1)}
          </FormLabel>
          <FormControl>
            <div>
              {type === "password" && (
                <InputPassword
                  {...field}
                  disabled={isPending}
                  placeholder={placeholder}
                  type="password"
                />
              )}
              {type === "otp" && (
                <InputOTP {...field} disabled={isPending} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
              {type !== "password" && type !== "otp" && (
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder={placeholder || name}
                  type={type}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
