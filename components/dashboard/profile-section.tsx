import { Button } from "@/components/ui/button"

interface UserData {
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  nationality: string
  address: string
  city: string
  province: string
  postalCode: string
  bloodType: string
  medicalConditions: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelation: string
}

interface ProfileSectionProps {
  userData: UserData
}

export default function ProfileSection({ userData }: ProfileSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-primary mb-8">Profil Peserta</h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-border">Data Pribadi</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground/70">Nama Lengkap</p>
              <p className="font-semibold text-foreground">{userData.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Email</p>
              <p className="font-semibold text-foreground">{userData.email}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Nomor Telepon</p>
              <p className="font-semibold text-foreground">{userData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Tanggal Lahir</p>
              <p className="font-semibold text-foreground">{userData.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Jenis Kelamin</p>
              <p className="font-semibold text-foreground capitalize">{userData.gender}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Kewarganegaraan</p>
              <p className="font-semibold text-foreground">{userData.nationality}</p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-border">Alamat</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground/70">Alamat</p>
              <p className="font-semibold text-foreground">{userData.address}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Kota</p>
              <p className="font-semibold text-foreground">{userData.city}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Provinsi</p>
              <p className="font-semibold text-foreground">{userData.province}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Kode Pos</p>
              <p className="font-semibold text-foreground">{userData.postalCode}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Health Information */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-border">Informasi Kesehatan</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground/70">Golongan Darah</p>
              <p className="font-semibold text-foreground">{userData.bloodType}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Kondisi Medis / Alergi</p>
              <p className="font-semibold text-foreground">{userData.medicalConditions || "Tidak ada"}</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-border">Kontak Darurat</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground/70">Nama</p>
              <p className="font-semibold text-foreground">{userData.emergencyContactName}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Nomor Telepon</p>
              <p className="font-semibold text-foreground">{userData.emergencyContactPhone}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Hubungan</p>
              <p className="font-semibold text-foreground">{userData.emergencyContactRelation}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1 bg-secondary text-white hover:bg-secondary/90">Edit Profil</Button>
        <Button variant="outline" className="flex-1 border-input text-foreground hover:bg-secondary/5 bg-transparent">
          Batal
        </Button>
      </div>
    </div>
  )
}
