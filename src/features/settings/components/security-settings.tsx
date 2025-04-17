"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LaptopIcon, Loader2Icon, PhoneIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { UAParser } from "ua-parser-js";

import { GenericForm } from "~/components/form/generic-form";
import { GenericInput } from "~/components/form/generic-input";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { authClient } from "~/lib/auth-client";

import { useChangePassword } from "../api/change-password";
import { useListSessions } from "../api/list-sessions";
import { useRevokeSession } from "../api/revoke-session";
import { type UpdatePasswordPayload, updatePasswordSchema } from "../schemas";

export default function SecuritySettings() {
  const { data: currentSession } = authClient.useSession();
  const { data: sessions, isPending } = useListSessions();

  const { mutate: revokeSession, isPending: isTerminating } =
    useRevokeSession();
  const { mutate: changePassword, isPending: isUpdatingPass } =
    useChangePassword();

  const form = useForm<UpdatePasswordPayload>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "12345678",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Update your current password</CardDescription>
        </CardHeader>
        <CardContent>
          <GenericForm
            {...form}
            onSubmit={(v) =>
              changePassword({
                currentPassword: v.currentPassword,
                newPassword: v.password,
              })
            }
          >
            <GenericInput
              form={form}
              name="currentPassword"
              label="Current Password"
              type="password"
              isPending={isUpdatingPass}
            />
            <GenericInput
              form={form}
              name="password"
              label="New Password"
              type="password"
              isPending={isUpdatingPass}
            />
            <GenericInput
              form={form}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              isPending={isUpdatingPass}
            />
            <ButtonLoading type="submit" loading={isUpdatingPass}>
              Update
            </ButtonLoading>
          </GenericForm>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {isPending ? (
            <div className="flex min-h-20 items-center justify-center">
              <Loader2Icon className="size-10 animate-spin" />
            </div>
          ) : (
            sessions?.map((session) => {
              const ua = new UAParser(session.userAgent || "");
              return (
                <div key={session.id}>
                  <div className="flex gap-4">
                    {ua.getDevice().type === "mobile" ? (
                      <PhoneIcon className="size-10" />
                    ) : (
                      <LaptopIcon className="size-10" />
                    )}
                    <div className="space-y-1 text-sm">
                      <p className="flex gap-2 text-base font-semibold">
                        {ua.getOS().name} ({ua.getCPU().toString()})
                        {session.id === currentSession?.session.id && (
                          <Badge>This Device</Badge>
                        )}
                      </p>
                      <p> {ua.getBrowser().toString()} </p>
                      <p> {session.createdAt.toLocaleString()}</p>
                      <p> {ua.getUA()} </p>
                      {session.id !== currentSession?.session.id && (
                        <ButtonLoading
                          loading={isTerminating}
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            revokeSession({ token: session.token })
                          }
                        >
                          Sign out
                        </ButtonLoading>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
