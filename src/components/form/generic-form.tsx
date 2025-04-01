import {
  type FieldValues,
  FormProvider,
  type FormProviderProps,
  type SubmitHandler,
} from "react-hook-form";

import { cn } from "~/lib/utils";

interface Props<T extends FieldValues> extends FormProviderProps<T> {
  onSubmit: SubmitHandler<T>;
  className?: string;
}

export const GenericForm = <T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  className,
  ...props
}: Props<T>) => {
  return (
    <FormProvider {...props}>
      <form
        onSubmit={props.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
