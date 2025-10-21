"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RegistrationData {
  // Personal Information
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  nationality: string

  // Address
  address: string
  city: string
  province: string
  postalCode: string

  // T-Shirt Size
  tshirtSize: string

  // Emergency Contact
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelation: string

  // Health Information
  bloodType: string
  medicalConditions: string

  // Waqf Donation
  waqfDonation: boolean
  waqfAmount: string

  // Terms
  agreeTerms: boolean
}

export default function ParticipantRegistrationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    nationality: "Indonesia",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    tshirtSize: "M",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    bloodType: "",
    medicalConditions: "",
    waqfDonation: false,
    waqfAmount: "0",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    if (!formData.agreeTerms) {
      setError("Anda harus menyetujui syarat dan ketentuan")
      return
    }

    setIsLoading(true)

    try {
      // TODO: Integrate with backend API
      console.log("Registration data:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError("Pendaftaran gagal. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-primary mb-4">Pendaftaran Berhasil!</h2>
          <p className="text-lg text-foreground/70 mb-6">
            Terima kasih telah mendaftar untuk WAQF RUN 2025. Anda akan menerima email konfirmasi dengan detail lebih
            lanjut.
          </p>
          <div className="bg-secondary/10 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-primary mb-3">Informasi Pendaftaran Anda:</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Nama:</span> {formData.fullName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {formData.email}
              </p>
              <p>
                <span className="font-medium">Ukuran Kaos:</span> {formData.tshirtSize}
              </p>
              {formData.waqfDonation && (
                <p>
                  <span className="font-medium">Donasi Waqf:</span> Rp{" "}
                  {Number.parseInt(formData.waqfAmount).toLocaleString("id-ID")}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Kembali ke Beranda
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Lihat Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Daftar WAQF RUN 2025</h1>
        <p className="text-lg text-foreground/70">Lengkapi formulir pendaftaran untuk mengikuti acara lari amal kami</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  s <= step ? "bg-secondary text-white" : "bg-border text-foreground/50"
                }`}
              >
                {s}
              </div>
              {s < 4 && <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-secondary" : "bg-border"}`}></div>}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-foreground/60">
          <span>Data Pribadi</span>
          <span>Alamat & Kontak</span>
          <span>Kaos & Kesehatan</span>
          <span>Donasi & Konfirmasi</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>
        )}

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Data Pribadi</h2>

            <div className="grid md:grid-cols-2 gap-6">
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
                  placeholder="Nama Lengkap"
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

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Nomor Telepon *
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+62 8XX XXXX XXXX"
                  required
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                />
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-foreground mb-2">
                  Tanggal Lahir *
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                />
              </div>

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
                <label htmlFor="nationality" className="block text-sm font-medium text-foreground mb-2">
                  Kewarganegaraan
                </label>
                <input
                  id="nationality"
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Address & Emergency Contact */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Alamat & Kontak Darurat</h2>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                Alamat *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Jalan, No. Rumah"
                required
                rows={3}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
              ></textarea>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                  Kota *
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Kota"
                  required
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                />
              </div>

              <div>
                <label htmlFor="province" className="block text-sm font-medium text-foreground mb-2">
                  Provinsi *
                </label>
                <input
                  id="province"
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="Provinsi"
                  required
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-foreground mb-2">
                  Kode Pos *
                </label>
                <input
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="12345"
                  required
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                />
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Kontak Darurat</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="emergencyContactName" className="block text-sm font-medium text-foreground mb-2">
                    Nama Kontak Darurat *
                  </label>
                  <input
                    id="emergencyContactName"
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    placeholder="Nama"
                    required
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-foreground mb-2">
                    Nomor Telepon Darurat *
                  </label>
                  <input
                    id="emergencyContactPhone"
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    placeholder="+62 8XX XXXX XXXX"
                    required
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="emergencyContactRelation" className="block text-sm font-medium text-foreground mb-2">
                    Hubungan *
                  </label>
                  <input
                    id="emergencyContactRelation"
                    type="text"
                    name="emergencyContactRelation"
                    value={formData.emergencyContactRelation}
                    onChange={handleChange}
                    placeholder="Contoh: Orang Tua, Saudara, Teman"
                    required
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: T-Shirt & Health */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Ukuran Kaos & Informasi Kesehatan</h2>

            <div>
              <label htmlFor="tshirtSize" className="block text-sm font-medium text-foreground mb-4">
                Pilih Ukuran Kaos *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <label key={size} className="cursor-pointer">
                    <input
                      type="radio"
                      name="tshirtSize"
                      value={size}
                      checked={formData.tshirtSize === size}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`p-3 text-center rounded-lg border-2 transition-colors ${
                        formData.tshirtSize === size
                          ? "border-secondary bg-secondary/10 font-bold text-secondary"
                          : "border-border text-foreground hover:border-secondary/50"
                      }`}
                    >
                      {size}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Informasi Kesehatan</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="bloodType" className="block text-sm font-medium text-foreground mb-2">
                    Golongan Darah
                  </label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                  >
                    <option value="">Pilih Golongan Darah</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="medicalConditions" className="block text-sm font-medium text-foreground mb-2">
                  Kondisi Medis / Alergi (jika ada)
                </label>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  placeholder="Tuliskan kondisi medis atau alergi yang perlu diketahui"
                  rows={3}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-background text-foreground"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Donation & Confirmation */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Donasi Waqf & Konfirmasi</h2>

            <div className="bg-secondary/5 rounded-lg p-6 border border-secondary/20">
              <h3 className="font-semibold text-primary mb-4">Donasi Waqf (Opsional)</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Setiap donasi Anda akan berkontribusi langsung untuk program-program waqaf nasional.
              </p>

              <label className="flex items-center gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  name="waqfDonation"
                  checked={formData.waqfDonation}
                  onChange={handleChange}
                  className="rounded border-input"
                />
                <span className="text-foreground font-medium">Saya ingin menambahkan donasi waqf</span>
              </label>

              {formData.waqfDonation && (
                <div>
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
                </div>
              )}
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-primary mb-4">Ringkasan Pendaftaran</h3>
              <div className="bg-background rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Nama:</span>
                  <span className="font-medium">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Ukuran Kaos:</span>
                  <span className="font-medium">{formData.tshirtSize}</span>
                </div>
                {formData.waqfDonation && (
                  <div className="flex justify-between border-t border-border pt-2 mt-2">
                    <span className="text-foreground/70">Donasi Waqf:</span>
                    <span className="font-medium text-secondary">
                      Rp {Number.parseInt(formData.waqfAmount).toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
              </div>
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
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            variant="outline"
            className="flex-1 border-input text-foreground hover:bg-secondary/5 bg-transparent disabled:opacity-50"
          >
            Kembali
          </Button>

          {step < 4 ? (
            <Button type="button" onClick={nextStep} className="flex-1 bg-secondary text-white hover:bg-secondary/90">
              Lanjutkan
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isLoading ? "Sedang memproses..." : "Selesaikan Pendaftaran"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
