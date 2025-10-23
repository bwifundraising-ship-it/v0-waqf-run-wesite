"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface PaymentData {
  registrationId: string
  participantName: string
  email: string
  amount: number
  tshirtSize: string
  waqfAmount: number
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [paymentUrl, setPaymentUrl] = useState("")

  useEffect(() => {
    const data = {
      registrationId: searchParams.get("registrationId") || "",
      participantName: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
      amount: Number(searchParams.get("amount")) || 0,
      tshirtSize: searchParams.get("tshirtSize") || "",
      waqfAmount: Number(searchParams.get("waqfAmount")) || 0,
    }
    setPaymentData(data)
  }, [])

  const handleCreateInvoice = async () => {
    if (!paymentData) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/payment/create-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationId: paymentData.registrationId,
          email: paymentData.email,
          amount: paymentData.amount,
          description: `WAQF RUN 2025 Registration - ${paymentData.participantName}`,
          items: [
            {
              name: "WAQF RUN 2025 Registration",
              quantity: 1,
              price: paymentData.amount - paymentData.waqfAmount,
            },
            ...(paymentData.waqfAmount > 0
              ? [
                  {
                    name: "Waqf Donation",
                    quantity: 1,
                    price: paymentData.waqfAmount,
                  },
                ]
              : []),
          ],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create invoice")
      }

      setPaymentUrl(data.invoiceUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create payment invoice")
    } finally {
      setIsLoading(false)
    }
  }

  if (paymentUrl) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="py-12 md:py-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h1 className="text-3xl font-bold text-primary mb-4">Lanjutkan ke Pembayaran</h1>
              <p className="text-lg text-foreground/70 mb-6">
                Anda akan diarahkan ke halaman pembayaran Xendit untuk menyelesaikan transaksi.
              </p>
              <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                  Bayar Sekarang
                </Button>
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!paymentData) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="py-12 md:py-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-foreground/70">Loading payment information...</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Konfirmasi Pembayaran</h1>
            <p className="text-foreground/70 mb-8">Periksa detail pembayaran Anda sebelum melanjutkan</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
                {error}
              </div>
            )}

            <div className="bg-secondary/5 rounded-lg p-6 mb-8 space-y-4">
              <div className="flex justify-between">
                <span className="text-foreground/70">Nama Peserta:</span>
                <span className="font-semibold text-foreground">{paymentData.participantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Email:</span>
                <span className="font-semibold text-foreground">{paymentData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Ukuran Kaos:</span>
                <span className="font-semibold text-foreground">{paymentData.tshirtSize}</span>
              </div>
              <div className="border-t border-secondary/20 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-foreground/70">Biaya Pendaftaran:</span>
                  <span className="font-semibold">
                    Rp {(paymentData.amount - paymentData.waqfAmount).toLocaleString("id-ID")}
                  </span>
                </div>
                {paymentData.waqfAmount > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground/70">Donasi Waqf:</span>
                    <span className="font-semibold text-secondary">
                      Rp {paymentData.waqfAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-secondary/20">
                  <span>Total:</span>
                  <span>Rp {paymentData.amount.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/register-event" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-input text-foreground hover:bg-secondary/5 bg-transparent"
                >
                  Kembali
                </Button>
              </Link>
              <Button
                onClick={handleCreateInvoice}
                disabled={isLoading}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isLoading ? "Memproses..." : "Lanjutkan Pembayaran"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
