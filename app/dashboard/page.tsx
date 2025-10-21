import Header from "@/components/header"
import Footer from "@/components/footer"
import DashboardContent from "@/components/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <DashboardContent />
      <Footer />
    </main>
  )
}
