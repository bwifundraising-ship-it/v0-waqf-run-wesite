import LoginForm from "@/components/auth/login-form"
import AuthLayout from "@/components/auth/auth-layout"

export default function LoginPage() {
  return (
    <AuthLayout title="Login" subtitle="Masuk ke akun WAQF RUN Anda">
      <LoginForm />
    </AuthLayout>
  )
}
