"use client"

import { Button } from "@/components/ui/button"

type DashboardTab = "overview" | "profile" | "qr-code" | "race-info"

interface DashboardNavProps {
  activeTab: DashboardTab
  setActiveTab: (tab: DashboardTab) => void
}

export default function DashboardNav({ activeTab, setActiveTab }: DashboardNavProps) {
  const tabs: { id: DashboardTab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "profile", label: "Profil", icon: "👤" },
    { id: "qr-code", label: "QR Code", icon: "📱" },
    { id: "race-info", label: "Info Acara", icon: "🏃" },
  ]

  return (
    <div className="flex flex-wrap gap-2 border-b border-border pb-4">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          variant={activeTab === tab.id ? "default" : "outline"}
          className={`${
            activeTab === tab.id
              ? "bg-secondary text-white hover:bg-secondary/90"
              : "border-input text-foreground hover:bg-secondary/5 bg-transparent"
          }`}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </Button>
      ))}
    </div>
  )
}
