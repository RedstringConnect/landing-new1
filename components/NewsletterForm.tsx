"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/actions/newsletter";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    setMessage("");
    setFieldErrors(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const validationResult = newsletterSchema.safeParse({ email, firstName, lastName });
    
    if (!validationResult.success) {
      setFieldErrors(validationResult.error.flatten().fieldErrors);
      setStatus("error");
      return;
    }

    setStatus("loading");
    const result = await subscribeToNewsletter(formData);

    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage("Thanks for joining our newsletter!");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={onSubmit} className="border border-border rounded-xl p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1 w-full">
          <input 
            type="email" 
            name="email"
            placeholder="E-mail" 
            className="w-full bg-transparent border-b border-border pb-2 outline-none focus:border-foreground transition-colors placeholder:text-foreground/50 text-[15px]" 
            disabled={status === "loading" || status === "success"}
          />
          {fieldErrors?.email && <span className="text-xs text-red-500">{fieldErrors.email[0]}</span>}
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-full">
            <input 
              type="text" 
              name="firstName"
              placeholder="First name" 
              className="w-full bg-transparent border-b border-border pb-2 outline-none focus:border-foreground transition-colors placeholder:text-foreground/50 text-[15px]" 
              disabled={status === "loading" || status === "success"}
            />
            {fieldErrors?.firstName && <span className="text-xs text-red-500">{fieldErrors.firstName[0]}</span>}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <input 
              type="text" 
              name="lastName"
              placeholder="Last name" 
              className="w-full bg-transparent border-b border-border pb-2 outline-none focus:border-foreground transition-colors placeholder:text-foreground/50 text-[15px]" 
              disabled={status === "loading" || status === "success"}
            />
            {fieldErrors?.lastName && <span className="text-xs text-red-500">{fieldErrors.lastName[0]}</span>}
          </div>
        </div>
        <button 
          type="submit" 
          className="text-right mt-3 hover:opacity-70 transition-opacity font-medium text-[15px] flex items-center justify-end disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? (
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Join The community >>"
          )}
        </button>
      </form>

      {status === "success" && (
        <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
          {message}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400 mt-1">
          {message}
        </p>
      )}
    </div>
  );
}
