import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, getEmailTemplate } from "@/lib/email-service"
import { generateParticipantQRCode } from "@/lib/qr-code-service"

interface ConfirmationEmailRequest {
  participantId: string
  participantName: string
  email: string
  tshirtSize: string
  participantNumber: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ConfirmationEmailRequest = await request.json()

    // Validate required fields
    if (!body.email || !body.participantName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("[v0] Generating QR code for participant:", body.participantId)

    // Generate QR code
    const qrCodeDataUrl = await generateParticipantQRCode(body.participantId, body.participantName)

    // Get email template
    const emailHtml = getEmailTemplate("registration_confirmation", {
      participantName: body.participantName,
      email: body.email,
      tshirtSize: body.tshirtSize,
      participantNumber: body.participantNumber,
      dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
    })

    // Send email
    const emailSent = await sendEmail({
      to: body.email,
      subject: "Konfirmasi Pendaftaran WAQF RUN 2025",
      html: emailHtml,
    })

    if (!emailSent) {
      return NextResponse.json({ error: "Failed to send confirmation email" }, { status: 500 })
    }

    // TODO: Save QR code to database or storage
    console.log("[v0] Confirmation email sent to:", body.email)

    return NextResponse.json({
      success: true,
      message: "Confirmation email sent successfully",
      qrCode: qrCodeDataUrl,
    })
  } catch (error) {
    console.error("[v0] Confirmation email error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
