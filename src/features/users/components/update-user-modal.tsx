"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { GenericForm } from "~/components/form/generic-form";
import { GenericInput } from "~/components/form/generic-input";
import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui-ext/button-loading";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "~/components/ui-ext/modal";
import { handleActionError } from "~/lib/handle-action-error";

import { updateUserAction } from "../actions";
import { UpdateUserPayload, updateUserSchema } from "../schemas";

interface Props {
  open: boolean;
  onOpenChange: () => void;
  user: User;
}

export const UpdateUserModal = ({ open, onOpenChange, user }: Props) => {
  const form = useForm<UpdateUserPayload>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });

  const { execute: updateUser, isPending } = useAction(
    updateUserAction.bind(null, user.id),
    {
      onSuccess: () => {
        toast.success("User updated successfully");
        onOpenChange();
      },
      onError: ({ error }) => handleActionError(error, form),
    }
  );

  const handleSubmit = (data: UpdateUserPayload) => {
    updateUser({
      name: data.name,
      email: data.email,
      image: data.image,
    });
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Update user</ModalTitle>
          <ModalDescription>
            Fill in the details below to update a new user.
          </ModalDescription>
        </ModalHeader>
        <GenericForm {...form} onSubmit={handleSubmit}>
          <GenericInput
            form={form}
            isPending={form.formState.isSubmitting}
            name="name"
          />
          <GenericInput
            form={form}
            isPending={form.formState.isSubmitting}
            name="email"
            type="email"
          />
          <ModalFooter className="gap-2 pt-2 sm:space-x-0">
            <ModalClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </ModalClose>
            <ButtonLoading loading={isPending}>Update</ButtonLoading>
          </ModalFooter>
        </GenericForm>
      </ModalContent>
    </Modal>
  );
};
