import { Button } from "@/components/ui/button"

interface UserData {
  id: string
  fullName: string
  email: string
  phone: string
  tshirtSize: string
  participantNumber: string
  registrationDate: string
  paymentStatus: string
  paymentDate: string
  waqfDonation: number
}

interface RegistrationDetailsProps {
  userData: UserData
}

export default function RegistrationDetails({ userData }: RegistrationDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Detail Pendaftaran</h2>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <span className="text-foreground/70">Nama Peserta</span>
          <span className="font-semibold text-foreground">{userData.fullName}</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-border">
          <span className="text-foreground/70">Email</span>
          <span className="font-semibold text-foreground">{userData.email}</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-border">
          <span className="text-foreground/70">Nomor Telepon</span>
          <span className="font-semibold text-foreground">{userData.phone}</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-border">
          <span className="text-foreground/70">Nomor Peserta</span>
          <span className="font-mono font-bold text-secondary">{userData.participantNumber}</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-border">
          <span className="text-foreground/70">Ukuran Kaos</span>
          <span className="font-semibold text-foreground">{userData.tshirtSize}</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-border">
          <span className="text-foreground/70">Tanggal Pendaftaran</span>
          <span className="font-semibold text-foreground">{userData.registrationDate}</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-border">
          <span className="text-foreground/70">Status Pembayaran</span>
          <span
            className={`font-semibold px-3 py-1 rounded-full text-sm ${
              userData.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {userData.paymentStatus}
          </span>
        </div>

        {userData.waqfDonation > 0 && (
          <div className="flex justify-between items-center pb-4 border-b border-border">
            <span className="text-foreground/70">Donasi Waqf</span>
            <span className="font-semibold text-secondary">Rp {userData.waqfDonation.toLocaleString("id-ID")}</span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button className="flex-1 bg-secondary text-white hover:bg-secondary/90">Edit Profil</Button>
        <Button variant="outline" className="flex-1 border-input text-foreground hover:bg-secondary/5 bg-transparent">
          Download Bukti
        </Button>
      </div>
    </div>
  )
}
