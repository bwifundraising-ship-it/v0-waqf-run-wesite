"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface RegistrationData {
  fullName: string
  email: string
  gender: string
  tshirtSize: string
  waqfDonation: boolean
  waqfAmount: string
  agreeTerms: boolean
}

export default function ParticipantRegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    email: "",
    gender: "",
    tshirtSize: "M",
    waqfDonation: false,
    waqfAmount: "0",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const REGISTRATION_FEE = 200000 // RP 200,000

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.fullName.trim()) {
      setError("Nama lengkap harus diisi")
      return
    }
    if (!formData.email.trim()) {
      setError("Email harus diisi")
      return
    }
    if (!formData.gender) {
      setError("Jenis kelamin harus dipilih")
      return
    }
    if (!formData.agreeTerms) {
      setError("Anda harus menyetujui syarat dan ketentuan")
      return
    }

    setIsLoading(true)

    try {
      // Calculate total amount
      const waqfAmount = formData.waqfDonation ? Number.parseInt(formData.waqfAmount) || 0 : 0
      const totalAmount = REGISTRATION_FEE + waqfAmount

      // Store registration data in session/localStorage for payment page
      const registrationData = {
        ...formData,
        registrationFee: REGISTRATION_FEE,
        waqfAmount: waqfAmount,
        totalAmount: totalAmount,
      }

      sessionStorage.setItem("registrationData", JSON.stringify(registrationData))

      // Redirect to payment page
      router.push("/payment")
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Daftar WAQF RUN 2025</h1>
        <p className="text-lg text-foreground/70">Lengkapi formulir pendaftaran untuk mengikuti acara lari amal kami</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>
        )}

        {/* Personal Information */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-primary">Informasi Pribadi</h2>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
              Nama Lengkap *
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap Anda"
              required
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-foreground mb-2">
                Jenis Kelamin *
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
                Ukuran Kaos *
              </label>
              <select
                id="tshirtSize"
                name="tshirtSize"
                value={formData.tshirtSize}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-secondary/5 rounded-lg p-6 border border-secondary/20 mb-8">
          <h3 className="font-semibold text-primary mb-4">Ringkasan Biaya</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/70">Biaya Pendaftaran:</span>
              <span className="font-medium">Rp {REGISTRATION_FEE.toLocaleString("id-ID")}</span>
            </div>

            <div className="border-t border-secondary/20 pt-3">
              <label className="flex items-center gap-3 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  name="waqfDonation"
                  checked={formData.waqfDonation}
                  onChange={handleChange}
                  className="rounded border-input"
                />
                <span className="text-sm font-medium text-foreground">Tambahkan Donasi Waqf (Opsional)</span>
              </label>

              {formData.waqfDonation && (
                <div className="mt-3">
                  <label htmlFor="waqfAmount" className="block text-sm font-medium text-foreground mb-2">
                    Jumlah Donasi (Rp)
                  </label>
                  <input
                    id="waqfAmount"
                    type="number"
                    name="waqfAmount"
                    value={formData.waqfAmount}
                    onChange={handleChange}
                    placeholder="100000"
                    min="0"
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-foreground/70">Donasi Waqf:</span>
                    <span className="font-medium text-secondary">
                      Rp {(Number.parseInt(formData.waqfAmount) || 0).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-secondary/20 pt-3 flex justify-between">
              <span className="font-semibold text-primary">Total Pembayaran:</span>
              <span className="font-bold text-lg text-secondary">
                Rp{" "}
                {(
                  REGISTRATION_FEE + (formData.waqfDonation ? Number.parseInt(formData.waqfAmount) || 0 : 0)
                ).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <label className="flex items-start gap-3 cursor-pointer mb-8">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mt-1 rounded border-input"
          />
          <span className="text-sm text-foreground/70">
            Saya setuju dengan{" "}
            <a href="#" className="text-secondary hover:text-secondary/80 transition-colors font-medium">
              syarat dan ketentuan
            </a>{" "}
            serta{" "}
            <a href="#" className="text-secondary hover:text-secondary/80 transition-colors font-medium">
              kebijakan privasi
            </a>{" "}
            WAQF RUN 2025 *
          </span>
        </label>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-lg font-semibold"
        >
          {isLoading ? "Memproses..." : "Lanjut ke Pembayaran"}
        </Button>
      </form>
    </div>
  )
}
