import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PaymentFailedPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">✕</div>
            <h1 className="text-3xl font-bold text-primary mb-2">Pembayaran Gagal</h1>
            <p className="text-lg text-foreground/70 mb-6">
              Maaf, pembayaran Anda tidak berhasil diproses. Silakan coba lagi atau hubungi customer support kami.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-red-700">
                Jika masalah terus berlanjut, silakan hubungi kami di support@waqfrun.id atau +62 (0)21 XXXX XXXX
              </p>
            </div>

            <div className="flex gap-4">
              <Link href="/register-event" className="flex-1">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Coba Lagi</Button>
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
