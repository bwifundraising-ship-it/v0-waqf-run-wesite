import QRCode from "qrcode"

export async function generateQRCode(data: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.95,
      margin: 1,
      width: 300,
      color: {
        dark: "#1e3a8a",
        light: "#ffffff",
      },
    })
    return qrCodeDataUrl
  } catch (error) {
    console.error("[v0] QR code generation error:", error)
    throw new Error("Failed to generate QR code")
  }
}

export async function generateParticipantQRCode(participantId: string, participantName: string): Promise<string> {
  const qrData = JSON.stringify({
    id: participantId,
    name: participantName,
    event: "WAQF RUN 2025",
    date: "2025-12-22",
  })

  return generateQRCode(qrData)
}
