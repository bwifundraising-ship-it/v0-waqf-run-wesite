import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// Initialize email transporter
// TODO: Configure with your email service (Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER) {
      console.warn("[v0] Email service not configured. Skipping email send.")
      console.log("[v0] Email would be sent to:", options.to)
      console.log("[v0] Subject:", options.subject)
      return true
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    console.log("[v0] Email sent successfully to:", options.to)
    return true
  } catch (error) {
    console.error("[v0] Failed to send email:", error)
    return false
  }
}

export function getEmailTemplate(templateName: string, data: Record<string, string | number>): string {
  const templates: Record<string, (data: Record<string, string | number>) => string> = {
    registration_confirmation: (data) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 18px; font-weight: bold; color: #1e3a8a; margin-bottom: 10px; }
            .info-box { background: white; padding: 15px; border-left: 4px solid #059669; margin: 10px 0; }
            .button { display: inline-block; background: #fbbf24; color: #1e3a8a; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0; }
            .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>WAQF RUN 2025</h1>
              <p>Berlari Berwakaf Berzakat</p>
            </div>
            <div class="content">
              <p>Halo ${data.participantName},</p>
              <p>Terima kasih telah mendaftar untuk WAQF RUN 2025! Kami sangat senang Anda akan bergabung dengan kami.</p>
              
              <div class="section">
                <div class="section-title">Detail Pendaftaran Anda</div>
                <div class="info-box">
                  <p><strong>Nama:</strong> ${data.participantName}</p>
                  <p><strong>Email:</strong> ${data.email}</p>
                  <p><strong>Ukuran Kaos:</strong> ${data.tshirtSize}</p>
                  <p><strong>Nomor Peserta:</strong> ${data.participantNumber}</p>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Informasi Penting</div>
                <div class="info-box">
                  <p><strong>Tanggal Acara:</strong> 22 Desember 2025</p>
                  <p><strong>Lokasi:</strong> Jakarta, Indonesia</p>
                  <p><strong>Waktu Mulai:</strong> 06:00 AM</p>
                  <p><strong>Jarak:</strong> 5K Run</p>
                </div>
              </div>

              <div class="section">
                <div class="section-title">QR Code Peserta</div>
                <p>Gunakan QR code di bawah ini saat check-in di hari acara:</p>
                <div style="text-align: center; margin: 20px 0;">
                  <img src="cid:qrcode" alt="QR Code" style="width: 200px; height: 200px;">
                </div>
              </div>

              <div class="section">
                <p style="text-align: center;">
                  <a href="${data.dashboardUrl}" class="button">Lihat Dashboard Saya</a>
                </p>
              </div>

              <p>Jika ada pertanyaan, jangan ragu untuk menghubungi kami di support@waqfrun.id</p>
              <p>Sampai jumpa di WAQF RUN 2025!</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 WAQF RUN. All rights reserved.</p>
              <p>Badan Wakaf Indonesia | Kementerian Agama | BAZNAS</p>
            </div>
          </div>
        </body>
      </html>
    `,

    payment_confirmation: (data) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .success-badge { background: #10b981; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 10px 0; }
            .info-box { background: white; padding: 15px; border-left: 4px solid #059669; margin: 10px 0; }
            .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Pembayaran Berhasil</h1>
            </div>
            <div class="content">
              <p>Halo ${data.participantName},</p>
              <p>Pembayaran Anda telah berhasil diproses. Terima kasih!</p>
              
              <div style="text-align: center;">
                <div class="success-badge">Pembayaran Dikonfirmasi</div>
              </div>

              <div class="info-box">
                <p><strong>Jumlah Pembayaran:</strong> Rp ${data.amount}</p>
                <p><strong>Nomor Referensi:</strong> ${data.referenceNumber}</p>
                <p><strong>Tanggal:</strong> ${data.paymentDate}</p>
              </div>

              <p>Anda sekarang terdaftar resmi untuk WAQF RUN 2025. Race pack Anda akan siap diambil pada hari acara.</p>
              
              <p>Terima kasih telah mendukung program waqaf dan zakat nasional!</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 WAQF RUN. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,

    race_day_reminder: (data) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .checklist { background: white; padding: 20px; border-left: 4px solid #fbbf24; margin: 10px 0; }
            .checklist-item { padding: 8px 0; }
            .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>WAQF RUN 2025 - Besok Hari H!</h1>
            </div>
            <div class="content">
              <p>Halo ${data.participantName},</p>
              <p>Kami sangat antusias! WAQF RUN 2025 akan dimulai besok. Berikut adalah checklist untuk mempersiapkan diri Anda:</p>
              
              <div class="checklist">
                <div class="checklist-item">✓ Siapkan nomor peserta dan QR code Anda</div>
                <div class="checklist-item">✓ Istirahat yang cukup malam ini</div>
                <div class="checklist-item">✓ Makan sarapan yang sehat</div>
                <div class="checklist-item">✓ Minum air yang cukup</div>
                <div class="checklist-item">✓ Pakai sepatu lari yang nyaman</div>
                <div class="checklist-item">✓ Tiba 30 menit sebelum acara dimulai</div>
              </div>

              <p><strong>Waktu & Lokasi:</strong></p>
              <p>Tanggal: 22 Desember 2025<br>
              Waktu: 06:00 AM<br>
              Lokasi: Jakarta, Indonesia</p>

              <p>Kami tunggu Anda di garis start! Mari bersama-sama berlari untuk kebaikan bersama.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 WAQF RUN. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  const template = templates[templateName]
  if (!template) {
    throw new Error(`Email template not found: ${templateName}`)
  }

  return template(data)
}
