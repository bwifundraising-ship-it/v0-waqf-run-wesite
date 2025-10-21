import { type NextRequest, NextResponse } from "next/server"

interface XenditWebhookPayload {
  id: string
  external_id: string
  user_id: string
  is_high: boolean
  payment_method: string
  status: string
  merchant_name: string
  amount: number
  paid_amount: number
  bank_code: string
  paid_at: string
  email: string
  phone_number: string
  description: string
  updated: string
  created: string
  currency: string
  payer_email: string
  success_redirect_url: string
  failure_redirect_url: string
  should_send_email: boolean
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

export async function POST(request: NextRequest) {
  try {
    const payload: XenditWebhookPayload = await request.json()

    console.log("[v0] Webhook received:", {
      invoiceId: payload.id,
      externalId: payload.external_id,
      status: payload.status,
      amount: payload.amount,
    })

    // Verify webhook signature (optional but recommended)
    const webhookToken = process.env.XENDIT_WEBHOOK_TOKEN
    const xInvoiceToken = request.headers.get("x-invoice-token")

    if (webhookToken && xInvoiceToken !== webhookToken) {
      console.warn("[v0] Invalid webhook token")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Handle payment status
    if (payload.status === "PAID") {
      // TODO: Update registration status in database
      // TODO: Send confirmation email with QR code
      console.log("[v0] Payment confirmed for:", payload.external_id)
    } else if (payload.status === "EXPIRED") {
      // TODO: Mark registration as expired
      console.log("[v0] Payment expired for:", payload.external_id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
