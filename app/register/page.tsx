import RegisterForm from "@/components/auth/register-form"
import AuthLayout from "@/components/auth/auth-layout"

export default function RegisterPage() {
  return (
    <AuthLayout title="Register" subtitle="Buat akun baru untuk WAQF RUN 2025">
      <RegisterForm />
    </AuthLayout>
  )
}
