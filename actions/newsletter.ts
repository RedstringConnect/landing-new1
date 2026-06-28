"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

const schema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const validatedData = schema.parse({
      email,
      firstName,
      lastName,
    });

    const AUDIENCE_ID = "6a172181-b9fe-4dbf-86f7-2557087a93a7";

    // 0. Check if user is already in contacts
    const { data: existingContact } = await resend.contacts.get({
      email: validatedData.email,
      audienceId: AUDIENCE_ID,
    });

    if (existingContact) {
      return { error: "You are already subscribed to the newsletter!" };
    }

    // 1. Create or update the contact globally
    const { data: contact, error: contactError } = await resend.contacts.create({
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });

    if (contactError) {
      console.error("Resend create contact error:", contactError);
      return { error: contactError.message };
    }

    // 2. Add contact to the "newsletter" topic
    // Topic ID: 6a172181-b9fe-4dbf-86f7-2557087a93a7
    if (contact && contact.id) {
       // Since the new Resend SDK doesn't expose a method for topics easily in docs yet,
       // we can use a direct fetch to the API.
       const response = await fetch(`https://api.resend.com/contacts/${contact.id}`, {
         method: "PATCH",
         headers: {
           "Authorization": `Bearer ${process.env.NEXT_RESEND_API_KEY}`,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           topics: ["6a172181-b9fe-4dbf-86f7-2557087a93a7"]
         })
       });

       if (!response.ok) {
           const errJson = await response.json();
           console.error("Failed to update contact topics:", errJson);
           // We might still consider this a success since the contact was created.
       }
    }

    // 3. Send a welcome email to the subscriber
    const { error: emailError } = await resend.emails.send({
      from: "RedString <onboarding@resend.dev>", // Replace with your verified domain (e.g., hello@redstring.in)
      to: validatedData.email,
      subject: "Welcome to the RedString Newsletter!",
      html: `<p>Hi ${validatedData.firstName},</p><p>Thanks for joining the RedString community! We're excited to have you on board and will keep you updated.</p><p>Best,<br>The RedString Team</p>`,
    });

    if (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Not failing the subscription if just the welcome email fails
    }

    return { success: true };
  } catch (error: any) {
    console.error("Subscription error:", error);
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}
