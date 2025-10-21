"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date("2025-12-22").getTime()
      const now = new Date().getTime()
      const difference = eventDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative bg-gradient-to-b from-secondary/20 to-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">WAQF RUN 2025</h1>
              <p className="text-xl font-semibold text-[rgba(45,30,96,1)]">Berlari, Berwakaf, Peduli Palestina   </p>
            </div>

            <p className="text-lg text-foreground/80">
              Bergabunglah dengan ribuan peserta dalam acara lari amal yang bermakna. Setiap langkah Anda berkontribusi
              untuk kebaikan bersama.
            </p>

            {/* Countdown Timer */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-sm font-semibold text-primary mb-4">Event dimulai dalam:</p>
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[rgba(45,30,96,1)]">{timeLeft.days}</div>
                  <div className="text-xs text-foreground/60 mt-1">Hari</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[rgba(45,30,96,1)]">{timeLeft.hours}</div>
                  <div className="text-xs text-foreground/60 mt-1">Jam</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[rgba(45,30,96,1)]">{timeLeft.minutes}</div>
                  <div className="text-xs text-foreground/60 mt-1">Menit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[rgba(45,30,96,1)]">{timeLeft.seconds}</div>
                  <div className="text-xs text-foreground/60 mt-1">Detik</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="flex-1">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6">
                  Daftar Sekarang
                </Button>
              </Link>
              <Link href="#about" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full text-lg py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-secondary/10 rounded-lg p-4">
                <p className="text-sm text-foreground/60">Tanggal</p>
                <p className="text-lg font-semibold text-primary">14 Desember 2025</p>
              </div>
              <div className="bg-secondary/10 rounded-lg p-4">
                <p className="text-sm text-foreground/60">Jarak</p>
                <p className="text-lg font-semibold text-primary">5K Run</p>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-blue-500/30 rounded-lg overflow-hidden">
              <img
                src="/runners-jogging-event-marathon.jpg"
                alt="WAQF RUN 2025 Event"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
