export default function EventInfo() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Tentang WAQF RUN 2025</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Acara lari amal yang bermakna untuk mendukung program-program sosial dan keagamaan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-foreground">
            <div className="text-4xl font-bold mb-4 text-[rgba(45,30,96,1)]">5K</div>
            <h3 className="text-xl font-semibold text-primary mb-3">Jarak Lari</h3>
            <p className="text-foreground/70">
              Lari sejauh 5 kilometer dengan rute yang menyenangkan dan aman untuk semua tingkat kemampuan.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-foreground">
            <div className="text-4xl font-bold mb-4 text-[rgba(45,30,96,1)]">∞</div>
            <h3 className="text-xl font-semibold text-primary mb-3">Manfaat Sosial</h3>
            <p className="text-foreground/70">
              Setiap pendaftaran berkontribusi langsung untuk program-program wakaf nasional.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-foreground">
            <div className="text-4xl font-bold text-secondary mb-4 bg-transparent">🎁</div>
            <h3 className="text-xl font-semibold text-primary mb-3">Hadiah Menarik</h3>
            <p className="text-foreground/70">
              Dapatkan kesempatan memenangkan hadiah menarik dan merchandise eksklusif WAQF RUN.
            </p>
          </div>
        </div>

        {/* Organizers */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">Diselenggarakan Oleh</h3>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              
              <p className="text-sm text-foreground/60 mt-2">{""} </p>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary mx-0 border-0">Badan Wakaf Indonesia</div>
              
            </div>
            <div className="text-center">
              
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
