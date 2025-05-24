"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormInput } from "~/components/form/form-input";
import { GenericForm } from "~/components/form/generic-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import { authClient } from "~/lib/auth-client";

import { useUpdateProfile } from "../api/update-profile";
import { type UpdateProfilePayload, updateProfileSchema } from "../schemas";
import DeleteAccountDialog from "./delete-account-dialog";

export default function ProfileSettings() {
  const { data: auth } = authClient.useSession();

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const form = useForm<UpdateProfilePayload>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: auth?.user?.name,
    },
  });

  const handleSubmit = (data: UpdateProfilePayload) => {
    updateProfile(data);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <GenericForm
            {...form}
            onSubmit={handleSubmit}
            className="grid gap-6 space-y-0 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <FormInput disabled={isPending} name="name" />
            </div>
            <div className="md:col-span-2">
              <ButtonLoading loading={isPending}>Update</ButtonLoading>
            </div>
          </GenericForm>
        </CardContent>
      </Card>
      <Card className="border-destructive border">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm">
            Account deletion is non-reversible. Please proceed with caution.
          </p>
          <DeleteAccountDialog />
        </CardContent>
      </Card>
    </div>
  );
}
