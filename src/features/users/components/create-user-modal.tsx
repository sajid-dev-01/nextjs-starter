"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  ModalTrigger,
} from "~/components/ui-ext/modal";

import { useCreateUser } from "../api/create-user";
import { CreateUserPayload, createUserSchema } from "../schemas";

export const CreateUserModal = () => {
  const [open, setOpen] = useState(false);

  const { mutate: createUser, isPending } = useCreateUser();

  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "Test",
      email: "test@test.com",
      password: "12345678",
      role: "user",
    },
  });

  const handleSubmit = (data: CreateUserPayload) => {
    createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button size="sm">
          <PlusIcon className="size-4" aria-hidden="true" />
          New user
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create user</ModalTitle>
          <ModalDescription>
            Fill in the details below to create a new user.
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
          <GenericInput
            form={form}
            isPending={form.formState.isSubmitting}
            name="password"
            type="password"
          />
          <GenericInput
            form={form}
            isPending={form.formState.isSubmitting}
            name="role"
          />
          <ModalFooter className="gap-2 pt-2 sm:space-x-0">
            <ModalClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </ModalClose>
            <ButtonLoading loading={isPending}>Create</ButtonLoading>
          </ModalFooter>
        </GenericForm>
      </ModalContent>
    </Modal>
  );
};
