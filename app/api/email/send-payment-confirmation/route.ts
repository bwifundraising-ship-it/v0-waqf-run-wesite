import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, getEmailTemplate } from "@/lib/email-service"

interface PaymentConfirmationRequest {
  participantName: string
  email: string
  amount: number
  referenceNumber: string
  paymentDate: string
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentConfirmationRequest = await request.json()

    // Validate required fields
    if (!body.email || !body.participantName || !body.amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get email template
    const emailHtml = getEmailTemplate("payment_confirmation", {
      participantName: body.participantName,
      amount: body.amount,
      referenceNumber: body.referenceNumber,
      paymentDate: body.paymentDate,
    })

    // Send email
    const emailSent = await sendEmail({
      to: body.email,
      subject: "Konfirmasi Pembayaran WAQF RUN 2025",
      html: emailHtml,
    })

    if (!emailSent) {
      return NextResponse.json({ error: "Failed to send payment confirmation email" }, { status: 500 })
    }

    console.log("[v0] Payment confirmation email sent to:", body.email)

    return NextResponse.json({
      success: true,
      message: "Payment confirmation email sent successfully",
    })
  } catch (error) {
    console.error("[v0] Payment confirmation email error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
