"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import EventInfo from "@/components/event-info"
import RacePackInfo from "@/components/race-pack-info"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <EventInfo />
      <RacePackInfo />
      <Footer />
    </main>
  )
}
