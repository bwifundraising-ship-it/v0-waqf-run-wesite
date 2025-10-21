"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // TODO: Integrate with authentication service
      console.log("Login attempt:", { email, password })
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
      setError("Login gagal. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded border-input" />
          <span className="text-foreground/70">Ingat saya</span>
        </label>
        <Link href="#" className="text-secondary hover:text-secondary/80 transition-colors">
          Lupa password?
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-2 font-semibold"
      >
        {isLoading ? "Sedang login..." : "Login"}
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
        Lanjutkan dengan Google
      </Button>
    </form>
  )
}
