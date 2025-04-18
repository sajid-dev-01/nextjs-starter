import { ResetPasswordForm } from "~/features/auth/components/reset-password";

export const metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm email="test@test.com" />;
}
