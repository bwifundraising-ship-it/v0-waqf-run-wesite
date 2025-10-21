import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, getEmailTemplate } from "@/lib/email-service"

interface RaceDayReminderRequest {
  participantName: string
  email: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RaceDayReminderRequest = await request.json()

    // Validate required fields
    if (!body.email || !body.participantName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get email template
    const emailHtml = getEmailTemplate("race_day_reminder", {
      participantName: body.participantName,
    })

    // Send email
    const emailSent = await sendEmail({
      to: body.email,
      subject: "WAQF RUN 2025 - Besok Hari H!",
      html: emailHtml,
    })

    if (!emailSent) {
      return NextResponse.json({ error: "Failed to send race day reminder email" }, { status: 500 })
    }

    console.log("[v0] Race day reminder email sent to:", body.email)

    return NextResponse.json({
      success: true,
      message: "Race day reminder email sent successfully",
    })
  } catch (error) {
    console.error("[v0] Race day reminder email error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
