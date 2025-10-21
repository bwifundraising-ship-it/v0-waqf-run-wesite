import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-primary mb-2">Pembayaran Berhasil!</h1>
            <p className="text-lg text-foreground/70 mb-6">
              Terima kasih telah menyelesaikan pembayaran. Anda akan menerima email konfirmasi dengan detail race pack
              dan informasi penting lainnya.
            </p>

            <div className="bg-secondary/10 rounded-lg p-6 mb-8">
              <p className="text-sm text-foreground/70 mb-2">Nomor Referensi Pembayaran:</p>
              <p className="text-lg font-mono font-bold text-primary">
                WAQF-2025-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>

            <div className="space-y-3 text-left bg-background rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-primary mb-4">Langkah Selanjutnya:</h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">1.</span>
                  <span>Periksa email Anda untuk konfirmasi pendaftaran</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">2.</span>
                  <span>Download QR code dan barcode peserta Anda</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">3.</span>
                  <span>Ambil race pack Anda pada hari H acara</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">4.</span>
                  <span>Nikmati pengalaman berlari yang bermakna!</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full bg-secondary text-white hover:bg-secondary/90">Lihat Dashboard</Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-input text-foreground hover:bg-secondary/5 bg-transparent"
                >
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
