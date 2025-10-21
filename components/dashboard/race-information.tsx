import { Button } from "@/components/ui/button"

export default function RaceInformation() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Event Details */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Detail Acara</h2>

        <div className="space-y-6">
          <div className="bg-secondary/10 rounded-lg p-4">
            <p className="text-sm text-foreground/70 mb-1">Nama Acara</p>
            <p className="text-xl font-bold text-primary">WAQF RUN 2025</p>
            <p className="text-sm text-secondary font-semibold">Berlari Berwakaf Berzakat</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-foreground/70 mb-2">Tanggal</p>
              <p className="font-bold text-primary">22 Desember 2025</p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-sm text-foreground/70 mb-2">Waktu Mulai</p>
              <p className="font-bold text-primary">06:00 AM</p>
            </div>
          </div>

          <div className="bg-background rounded-lg p-4">
            <p className="text-sm text-foreground/70 mb-2">Lokasi</p>
            <p className="font-bold text-primary">Jakarta, Indonesia</p>
            <p className="text-sm text-foreground/70 mt-1">Lokasi detail akan dikirim via email</p>
          </div>

          <div className="bg-background rounded-lg p-4">
            <p className="text-sm text-foreground/70 mb-2">Jarak</p>
            <p className="font-bold text-primary">5K Run</p>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Informasi Penting</h2>

        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-accent rounded p-4">
            <p className="font-semibold text-primary mb-2">Persiapan Hari H</p>
            <ul className="text-sm text-foreground/70 space-y-1">
              <li>• Tiba 30 menit sebelum acara dimulai</li>
              <li>• Bawa nomor peserta dan QR code</li>
              <li>• Pakai sepatu lari yang nyaman</li>
              <li>• Bawa air minum yang cukup</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-secondary rounded p-4">
            <p className="font-semibold text-primary mb-2">Race Pack</p>
            <ul className="text-sm text-foreground/70 space-y-1">
              <li>• Kaos WAQF RUN 2025</li>
              <li>• Nomor dada dan timing chip</li>
              <li>• Medali finisher</li>
              <li>• Goodie bag</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-primary rounded p-4">
            <p className="font-semibold text-primary mb-2">Kontak Bantuan</p>
            <p className="text-sm text-foreground/70">Email: support@waqfrun.id</p>
            <p className="text-sm text-foreground/70">Phone: +62 (0)21 XXXX XXXX</p>
          </div>
        </div>

        <Button className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
          Download Panduan Lengkap
        </Button>
      </div>
    </div>
  )
}
