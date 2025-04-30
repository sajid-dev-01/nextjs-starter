import { type HTMLInputTypeAttribute } from "react";
import {
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  isPending: boolean;
  name: FieldPath<T>;
  label?: string;
  type?: HTMLInputTypeAttribute | "otp" | "phone";
  placeholder?: string;
  options: Array<{ key: string; value: any }>;
}

export const GenericSelect = <T extends FieldValues>({
  form,
  isPending,
  name,
  label,
  placeholder,
  options,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label || (name[0] && name[0].toUpperCase() + name.slice(1))}
          </FormLabel>
          <Select
            disabled={isPending}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map((item) => (
                  <SelectItem
                    key={item.key}
                    value={item.key}
                    className="capitalize"
                  >
                    {item.value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
