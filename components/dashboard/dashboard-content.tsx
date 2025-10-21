"use client"

import { useState } from "react"
import DashboardNav from "./dashboard-nav"
import ProfileSection from "./profile-section"
import RegistrationDetails from "./registration-details"
import QRCodeSection from "./qr-code-section"
import RaceInformation from "./race-information"

type DashboardTab = "overview" | "profile" | "qr-code" | "race-info"

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview")

  // Mock user data - TODO: Replace with actual data from database
  const userData = {
    id: "WAQF-2025-001",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+62 812 3456 7890",
    dateOfBirth: "1990-05-15",
    gender: "male",
    nationality: "Indonesia",
    address: "Jl. Merdeka No. 123",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12345",
    tshirtSize: "L",
    bloodType: "O",
    medicalConditions: "None",
    emergencyContactName: "Jane Doe",
    emergencyContactPhone: "+62 812 9876 5432",
    emergencyContactRelation: "Sister",
    participantNumber: "WAQF-2025-001",
    registrationDate: "2025-10-15",
    paymentStatus: "Paid",
    paymentDate: "2025-10-15",
    waqfDonation: 500000,
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  }

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Dashboard Peserta</h1>
          <p className="text-lg text-foreground/70">Kelola informasi pendaftaran WAQF RUN 2025 Anda</p>
        </div>

        {/* Navigation */}
        <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div className="mt-8">
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-2 gap-8">
              <RegistrationDetails userData={userData} />
              <QRCodeSection userData={userData} />
            </div>
          )}

          {activeTab === "profile" && <ProfileSection userData={userData} />}

          {activeTab === "qr-code" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <QRCodeSection userData={userData} fullPage />
            </div>
          )}

          {activeTab === "race-info" && <RaceInformation />}
        </div>
      </div>
    </div>
  )
}
