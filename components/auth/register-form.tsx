"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    tshirtSize: "",
    additionalWaqf: "",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.fullName || !formData.email || !formData.gender || !formData.tshirtSize) {
      setError("Semua field wajib diisi")
      return
    }

    if (!formData.agreeTerms) {
      setError("Anda harus menyetujui syarat dan ketentuan")
      return
    }

    setIsLoading(true)

    try {
      const registrationData = {
        fullName: formData.fullName,
        email: formData.email,
        gender: formData.gender,
        tshirtSize: formData.tshirtSize,
        registrationFee: 200000,
        additionalWaqf: formData.additionalWaqf ? Number.parseInt(formData.additionalWaqf) : 0,
        totalAmount: 200000 + (formData.additionalWaqf ? Number.parseInt(formData.additionalWaqf) : 0),
      }

      sessionStorage.setItem("registrationData", JSON.stringify(registrationData))
      router.push("/payment")
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
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
        <label htmlFor="gender" className="block text-sm font-medium text-foreground mb-2">
          Jenis Kelamin
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="male">Laki-laki</option>
          <option value="female">Perempuan</option>
        </select>
      </div>

      <div>
        <label htmlFor="tshirtSize" className="block text-sm font-medium text-foreground mb-2">
          Ukuran Kaos
        </label>
        <select
          id="tshirtSize"
          name="tshirtSize"
          value={formData.tshirtSize}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
        >
          <option value="">Pilih Ukuran Kaos</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>

      <div>
        <label htmlFor="additionalWaqf" className="block text-sm font-medium text-foreground mb-2">
          Donasi Waqf Tambahan (Opsional)
        </label>
        <input
          id="additionalWaqf"
          type="number"
          name="additionalWaqf"
          value={formData.additionalWaqf}
          onChange={handleChange}
          placeholder="Rp 0"
          min="0"
          step="10000"
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
        />
        <p className="text-xs text-foreground/60 mt-1">Biaya pendaftaran: Rp 200.000</p>
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
        {isLoading ? "Memproses..." : "Lanjut ke Pembayaran"}
      </Button>
    </form>
  )
}
