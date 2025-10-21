import Link from "next/link"
import type { ReactNode } from "react"

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 to-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="text-3xl font-bold text-primary">WAQF RUN</div>
            <div className="text-sm text-secondary font-semibold">2025</div>
          </Link>
          <h1 className="text-2xl font-bold text-primary mb-2">{title}</h1>
          <p className="text-foreground/70">{subtitle}</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-border">{children}</div>

        {/* Footer Links */}
        <div className="text-center mt-6 text-sm text-foreground/70">
          {title === "Login" ? (
            <>
              Belum punya akun?{" "}
              <Link href="/register" className="text-secondary font-semibold hover:text-secondary/80 transition-colors">
                Daftar di sini
              </Link>
            </>
          ) : (
            <>
              Sudah punya akun?{" "}
              <Link href="/login" className="text-secondary font-semibold hover:text-secondary/80 transition-colors">
                Login di sini
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
