"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok")
      return
    }

    if (!formData.agreeTerms) {
      setError("Anda harus menyetujui syarat dan ketentuan")
      return
    }

    setIsLoading(true)

    try {
      // TODO: Integrate with authentication service
      console.log("Register attempt:", {
        fullName: formData.fullName,
        email: formData.email,
      })
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      })
    } catch (err) {
      setError("Pendaftaran gagal. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          Pendaftaran berhasil! Silakan login dengan akun Anda.
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
          Nama Lengkap
        </label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Nama Lengkap Anda"
          required
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="nama@email.com"
          required
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
          Konfirmasi Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          className="mt-1 rounded border-input"
        />
        <span className="text-sm text-foreground/70">
          Saya setuju dengan{" "}
          <a href="#" className="text-secondary hover:text-secondary/80 transition-colors">
            syarat dan ketentuan
          </a>{" "}
          serta{" "}
          <a href="#" className="text-secondary hover:text-secondary/80 transition-colors">
            kebijakan privasi
          </a>
        </span>
      </label>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-2 font-semibold"
      >
        {isLoading ? "Sedang mendaftar..." : "Daftar"}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-foreground/60">atau</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-input text-foreground hover:bg-secondary/5 bg-transparent"
      >
        Daftar dengan Google
      </Button>
    </form>
  )
}
