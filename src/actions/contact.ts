"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMessage(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!firstName || !lastName || !email || !message) {
    return { error: "All fields are required." };
  }

  try {
    const data = await resend.emails.send({
      from: "ServerNetwork Contact <onboarding@resend.dev>",
      to: ["docharker@gmail.com"],
      subject: `New Contact Message from ${firstName} ${lastName}`,
      html: `
        <h2>New Message via ServerNetwork Contact Form</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
      replyTo: email,
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return { error: data.error.message || "Failed to send message." };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
