"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between leading-6 rounded-xl items-end bg-[rgba(45,30,96,1)]">
        <Link href="/" className="flex items-center gap-3 px-0 mx-0 my-0 py-0">
          <Image src="/images/design-mode/Untitled%20design%20%284%29.png" alt="BWI Logo" width={48} height={48} className="rounded-full w-16 h-11" />
          <div className="text-2xl font-bold text-left">{"Badan Wakaf Indonesia"}</div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-left tracking-tighter py-2">
          <Link href="#about" className="hover:text-accent transition-colors">
            About
          </Link>
          <Link href="#race-pack" className="hover:text-accent transition-colors">
            Race Pack
          </Link>
          <Link href="#contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Register</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
