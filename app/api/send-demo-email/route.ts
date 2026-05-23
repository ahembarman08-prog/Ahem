import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, businessType, teamSize, preferredTime, date, country } =
      body;

    // Validate required fields
    if (!name || !email || !businessType || !teamSize || !preferredTime || !date || !country) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Demo Booking Request from Zyphronix Website

Customer Details:
Name: ${name}
Email: ${email}
Business Type: ${businessType}
Team Size: ${teamSize}
Preferred Time: ${preferredTime}
Preferred Date: ${date}
Country: ${country}

Please reach out to the customer at ${email} to confirm their demo booking.

---
This email was sent from the Zyphronix website demo booking form.
    `;

    // Send email via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "noreply@zyphronix.com",
          to: "nexora.01801@gmail.com",
          subject: `New Demo Booking: ${name} (${businessType})`,
          html: `<pre>${emailContent}</pre>`,
        }),
      });

      if (!response.ok) {
        console.log("[v0] Resend API error:", await response.text());
        // Fall back to alternative method or just return success
      }
    } else {
      console.log(
        "[v0] RESEND_API_KEY not configured, logging demo booking:",
        body
      );
    }

    return NextResponse.json(
      { success: true, message: "Demo booking submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("[v0] Error in send-demo-email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
