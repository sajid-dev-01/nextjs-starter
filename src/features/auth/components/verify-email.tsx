"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { Heading } from "~/components/ui-ext/heading";
import { authClient } from "~/lib/auth-client";

import { AUTH_URI } from "../constants";
import { type VerifyEmailPayload, VerifyEmailSchema } from "../schemas";
import AuthCard from "./auth-card";

interface Props {
  email: string;
}

export const VerifyEmailForm = ({ email }: Props) => {
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<VerifyEmailPayload>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: { otp: "" },
  });

  const handleSubmit = async (data: VerifyEmailPayload) => {
    await authClient.emailOtp.verifyEmail(
      {
        email: email,
        otp: data.otp,
      },
      {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onSuccess: () => {
          setHasSucceeded(true);
        },
      }
    );
  };

  if (hasSucceeded) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-md">
        <CheckCircleIcon className="size-14 animate-bounce text-green-500" />
        <Heading>Email verification successfull</Heading>
        <Button asChild>
          <Link href={AUTH_URI.signIn}>
            Go to sign in
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <AuthCard
      headerTitle="Verify your email"
      headerDesc={
        <p className="text-center">
          Enter the verification code sent to your email <br /> {email}
        </p>
      }
      buttonLabel="Back to Sign Up"
      buttonHref={AUTH_URI.signUp}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col items-center"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col items-center justify-center">
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            size={"sm"}
            variant={"link"}
            onClick={() => {}}
            // disabled={isResending || isPending}
            className="mt-2 mb-6"
          >
            Didn't receive a code? Resend
          </Button>
          <ButtonLoading type="submit" loading={isPending} className="w-full">
            Verify
          </ButtonLoading>
        </form>
      </Form>
    </AuthCard>
  );
};
