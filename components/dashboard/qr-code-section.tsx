import { Button } from "@/components/ui/button"

interface UserData {
  participantNumber: string
  fullName: string
  qrCode: string
}

interface QRCodeSectionProps {
  userData: UserData
  fullPage?: boolean
}

export default function QRCodeSection({ userData, fullPage = false }: QRCodeSectionProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 ${fullPage ? "" : ""}`}>
      <h2 className="text-2xl font-bold text-primary mb-6">QR Code Peserta</h2>

      <div className="flex flex-col items-center">
        <p className="text-foreground/70 text-center mb-6">
          Gunakan QR code ini saat check-in di hari acara. Pastikan QR code terlihat jelas.
        </p>

        <div className="bg-white border-4 border-secondary rounded-lg p-6 mb-6">
          <img src={userData.qrCode || "/placeholder.svg"} alt="QR Code" className="w-64 h-64" />
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-foreground/70 mb-2">Nomor Peserta</p>
          <p className="text-2xl font-mono font-bold text-secondary">{userData.participantNumber}</p>
          <p className="text-sm text-foreground/70 mt-2">{userData.fullName}</p>
        </div>

        <div className="flex gap-3 w-full">
          <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">Download QR Code</Button>
          <Button variant="outline" className="flex-1 border-input text-foreground hover:bg-secondary/5 bg-transparent">
            Print
          </Button>
        </div>
      </div>
    </div>
  )
}
