import Link from "next/link"

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">WAQF RUN 2025</h3>
            <p className="text-primary-foreground/80 text-sm">
              Berlari Berwakaf  untuk Peduli Palestina
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about" className="hover:text-accent transition-colors">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="#race-pack" className="hover:text-accent transition-colors">
                  Race Pack
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-accent transition-colors">
                  Daftar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@waqfrun.id</li>
              <li>Phone: 089507221355</li>
              <li>Instagram: @waqfrun2025</li>
            </ul>
          </div>

          
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          <p>&copy; 2025 WAQF RUN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
