import { type NextRequest, NextResponse } from "next/server"

interface InvoiceItem {
  name: string
  quantity: number
  price: number
}

interface CreateInvoiceRequest {
  registrationId: string
  email: string
  amount: number
  description: string
  items: InvoiceItem[]
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateInvoiceRequest = await request.json()

    // Validate required fields
    if (!body.email || !body.amount || body.amount <= 0) {
      return NextResponse.json({ error: "Invalid payment data" }, { status: 400 })
    }

    // Get Xendit API key from environment
    const xenditApiKey = process.env.XENDIT_API_KEY
    if (!xenditApiKey) {
      console.error("[v0] XENDIT_API_KEY not configured")
      return NextResponse.json(
        { error: "Payment service not configured. Please add XENDIT_API_KEY to environment variables." },
        { status: 500 },
      )
    }

    // Create invoice with Xendit API
    const xenditResponse = await fetch("https://api.xendit.co/v2/invoices", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${xenditApiKey}:`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        external_id: `WAQF-${body.registrationId}-${Date.now()}`,
        amount: body.amount,
        payer_email: body.email,
        description: body.description,
        items: body.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        success_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment/success`,
        failure_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment/failed`,
        currency: "IDR",
      }),
    })

    if (!xenditResponse.ok) {
      const errorData = await xenditResponse.json()
      console.error("[v0] Xendit API error:", errorData)
      return NextResponse.json({ error: "Failed to create payment invoice" }, { status: xenditResponse.status })
    }

    const invoiceData = await xenditResponse.json()

    // TODO: Save invoice data to database for tracking
    console.log("[v0] Invoice created:", invoiceData.id)

    return NextResponse.json({
      invoiceUrl: invoiceData.invoice_url,
      invoiceId: invoiceData.id,
      externalId: invoiceData.external_id,
    })
  } catch (error) {
    console.error("[v0] Payment creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
