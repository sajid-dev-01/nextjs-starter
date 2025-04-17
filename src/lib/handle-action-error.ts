import { type SafeActionResult } from "next-safe-action";
import { type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { type ValidationError } from "~/server/exceptions";

export function handleActionError(
  err: SafeActionResult<any, any, any>,
  form: UseFormReturn<any>
) {
  if (err.validationErrors) {
    if (err.validationErrors.fieldErrors) {
      Object.keys(err.validationErrors.fieldErrors ?? {}).forEach((key) => {
        form.setError(key as any, {
          message: (err.validationErrors.fieldErrors as any)[key][0],
        });
      });
    }
  } else if (err.serverError) {
    if (err.serverError.name === "ValidationError") {
      const e = err.serverError as ValidationError;

      if (e.fieldErrors) {
        Object.keys(e.fieldErrors || {}).forEach((key) => {
          form.setError(key as any, {
            message: (e.fieldErrors as any)[key][0],
          });
        });
      }
    } else {
      toast.error(err.serverError.message);
    }
  }
}
