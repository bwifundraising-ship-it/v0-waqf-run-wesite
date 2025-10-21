import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RacePackInfo() {
  return (
    <section id="race-pack" className="py-16 md:py-24 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Race Pack Information</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Setiap peserta akan menerima race pack eksklusif dengan berbagai item menarik
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-primary mb-3">Apa yang Anda Dapatkan?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold text-lg">✓</span>
                  <span className="text-foreground/80">Kaos WAQF RUN 2025 eksklusif</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold text-lg">✓</span>
                  <span className="text-foreground/80">Nomor dada dan timing chip</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold text-lg">✓</span>
                  <span className="text-foreground/80">Medali finisher</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold text-lg">✓</span>
                  <span className="text-foreground/80">Goodie bag dengan merchandise pilihan</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary font-bold text-lg">✓</span>
                  <span className="text-foreground/80">Sertifikat partisipasi</span>
                </li>
              </ul>
            </div>

            <Link href="/register">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6">
                Daftar dan Pilih Ukuran Kaos
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <img src="/images/design-mode/merchandise%20waqf%20run.JPG.jpeg" alt="Race Pack Items" className="w-full rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
