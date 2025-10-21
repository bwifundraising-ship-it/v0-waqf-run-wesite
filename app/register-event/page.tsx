import ParticipantRegistrationForm from "@/components/registration/participant-registration-form"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function RegisterEventPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="py-12 md:py-16">
        <ParticipantRegistrationForm />
      </div>
      <Footer />
    </main>
  )
}
