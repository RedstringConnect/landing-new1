import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CopyEmail } from "@/components/ui/CopyEmail";

export const metadata: Metadata = {
  title: "Privacy Policy | Redstring",
  description:
    "Redstring's Privacy Policy explains how we collect, use, store, and protect your personal data across our products, including LoopX, in compliance with the Digital Personal Data Protection Act, 2023 (India).",
  openGraph: {
    title: "Privacy Policy | Redstring",
    description:
      "Learn how Redstring collects, uses, and protects your personal data in compliance with DPDP Act, 2023.",
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-24 px-6 w-full max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-denton font-medium mb-6">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: June 30, 2026
          </p>
        </div>

        <div className="prose dark:prose-invert text-left w-full max-w-none space-y-8">
          {/* Intro */}
          <section>
            <p className="text-muted-foreground leading-relaxed">
              Redstring Technologies Private Limited (&quot;Redstring,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the
              website <strong>redstring.co.in</strong> (the &quot;Landing
              Page&quot;) and the AI-powered hiring platform LoopX accessible
              at <strong>loopx.redstring.co.in</strong> (the
              &quot;Platform&quot;). This Privacy Policy describes how we
              collect, use, disclose, store, and protect personal information
              when you visit our Landing Page or use the Platform. This policy
              is drafted in compliance with the Digital Personal Data Protection
              Act, 2023 (&quot;DPDP Act&quot;) of India and other applicable
              laws.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mb-2">
              1.1 Information You Provide Directly
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Account Information:</strong> Name, email address,
                password (hashed), role (Founder, Recruiter, Hiring Manager,
                etc.), and company details during onboarding.
              </li>
              <li>
                <strong>Candidate Information:</strong> When candidates submit
                applications through career pages or public forms — name, email,
                phone, resume, portfolio links, work experience, education,
                skills, availability, salary expectations, video responses, and
                answers to application form questions.
              </li>
              <li>
                <strong>Communication Data:</strong> Messages sent through the
                in-app inbox, email broadcasts, and email replies — including
                message content, attachments (images, PDFs, documents), and
                metadata (sender, recipient, timestamp).
              </li>
              <li>
                <strong>Career Page Data:</strong> Branding preferences, custom
                domain settings, social links, and page content configured by
                workspace owners.
              </li>
              <li>
                <strong>Newsletter &amp; Lead Forms:</strong> Email addresses and
                optionally name/company submitted through newsletter signup or
                free tools (Hiring Playbook, Hiring Planner, Waitlist).
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">
              1.2 Information Collected Automatically
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Device &amp; Browser Information:</strong> IP address,
                browser type and version, operating system, device type, screen
                resolution, and language preferences.
              </li>
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent on pages,
                click patterns, navigation paths, feature usage, and
                interaction events within the Platform.
              </li>
              <li>
                <strong>Cookies &amp; Tracking Technologies:</strong> We use
                essential cookies for authentication and session management
                (e.g., httpOnly session cookies with 7-day TTL). We use
                functional cookies to remember user preferences (theme, layout).
                We do not use advertising cookies or third-party tracking pixels.
                See Section 9 for full details on cookies.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">
              1.3 Information from Connected Third-Party Accounts
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Google OAuth:</strong> Email address, display name, and
                Google profile picture when you sign up or log in with Google.
              </li>
              <li>
                <strong>Gmail Integration:</strong> When recruiters connect their
                Gmail inbox to LoopX, we access email headers (From, Subject),
                email body text, Gmail message/thread IDs, timestamps, and
                attachment indicators. Binary attachment files are not downloaded
                or stored — only a boolean flag indicating the presence of
                attachments is recorded.
              </li>
              <li>
                <strong>ContactOut:</strong> Candidate profiles, LinkedIn
                enrichment data, and email addresses sourced through
                ContactOut integration for talent sourcing.
              </li>
            </ul>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We process personal information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Platform Operations:</strong> Providing, maintaining, and
                improving the LoopX platform, including account management,
                authentication, and customer support.
              </li>
              <li>
                <strong>Hiring &amp; Recruitment:</strong> Processing candidate
                applications, AI-powered screening and match scoring, resume
                parsing, pipeline management, and communication between
                recruiters and candidates.
              </li>
              <li>
                <strong>Email &amp; Communication:</strong> Sending transactional
                emails (OTP verification, magic links, notifications, workspace
                invitations), email broadcasts, and email-chat bridging
                messages.
              </li>
              <li>
                <strong>AI Processing:</strong> Analyzing resumes, application
                responses, and email content using AI models (via Groq API) to
                generate match scores, highlights, summaries, semantic
                embeddings, form suggestions, and hiring insights. AI requests
                are processed over HTTPS and are not retained by the AI provider
                beyond the request completion.
              </li>
              <li>
                <strong>Analytics &amp; Improvement:</strong> Tracking platform
                usage patterns to improve features, fix bugs, and enhance user
                experience. No analytics data is shared with third-party
                analytics services (Segment, Mixpanel, etc.).
              </li>
              <li>
                <strong>Security &amp; Fraud Prevention:</strong> Detecting
                unauthorized access, preventing abuse, enforcing rate limits,
                and maintaining platform integrity.
              </li>
              <li>
                <strong>Legal Compliance:</strong> Complying with applicable
                laws, regulations, legal processes, and enforcing our agreements.
              </li>
            </ul>
          </section>

          {/* 3. How We Share Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Share Your Information
            </h2>

            <h3 className="text-xl font-semibold mb-2">
              3.1 Third-Party Service Providers
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Groq API:</strong> Sender name/email, subject, email body
                text (limited to 2000 characters for classification, 800 for
                reply drafting), form responses, and job descriptions for AI
                processing. Groq does not retain data beyond request completion.
              </li>
              <li>
                <strong>Google (Gmail API &amp; OAuth):</strong> OAuth
                access/refresh tokens (stored encrypted), email messages for
                inbox sync, and reply emails. Tokens are encrypted at rest in a
                Postgres vault using encryption keys.
              </li>
              <li>
                <strong>Resend:</strong> Transactional emails, broadcast
                campaigns, and email tracking (open/click/bounce/complaint
                webhooks).
              </li>
              <li>
                <strong>Cloudinary:</strong> Uploaded files — resumes, images,
                logos, video responses, audio files, and document attachments.
              </li>
              <li>
                <strong>ContactOut:</strong> Candidate sourcing queries and
                enriched candidate profile data.
              </li>
              <li>
                <strong>Redis:</strong> Workspace and user identifiers for
                background job queue management (transient — removed on job
                completion).
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">
              3.2 What We Do NOT Share
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>No analytics or tracking services (Segment, Mixpanel, etc.)</li>
              <li>No advertising networks or data brokers</li>
              <li>No social media platforms</li>
              <li>No third-party cookies or tracking pixels in emails</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">
              3.3 Legal Disclosure
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We may disclose personal information if required by law, regulation,
              legal process, or government request, or to protect the rights,
              property, or safety of Redstring, our users, or the public.
            </p>
          </section>

          {/* 4. Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We retain personal information only as long as necessary to
              provide our services, comply with legal obligations, resolve
              disputes, and enforce our agreements. Specific retention periods
              are as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Active Account Data:</strong> Retained for the duration
                of your active account and for up to 30 days after account
                deletion to facilitate recovery.
              </li>
              <li>
                <strong>Email Contents &amp; Metadata:</strong> Incoming cold
                emails synced via Gmail are retained for the duration of your
                active Gmail connection and for 90 days after disconnection, after
                which they are permanently deleted from our systems.
              </li>
              <li>
                <strong>Resumes &amp; Uploaded Documents:</strong> Retained for
                the duration of the associated candidate record in the hiring
                pipeline, and for up to 1 year after the last activity on the
                record, unless earlier deletion is requested.
              </li>
              <li>
                <strong>Candidate Application Data:</strong> Retained for the
                duration of the associated job posting and for 1 year after the
                job posting is closed or archived, unless earlier deletion is
                requested.
              </li>
              <li>
                <strong>Inactive Accounts:</strong> Accounts with no login
                activity for 24 consecutive months are considered inactive. We
                will send a notification email 30 days before scheduled deletion.
                If no response is received, the account and associated personal
                data will be permanently deleted.
              </li>
              <li>
                <strong>OAuth Tokens:</strong> Encrypted tokens are retained
                while the Gmail connection is active and are permanently deleted
                within 24 hours of disconnection.
              </li>
              <li>
                <strong>Background Job Data (Redis):</strong> Automatically
                pruned — 50 completed jobs and 200 failed jobs retained.
              </li>
              <li>
                <strong>Newsletter Signups:</strong> Email addresses are retained
                until you unsubscribe or request deletion.
              </li>
            </ul>
            <h3 className="text-xl font-semibold mb-2 mt-6">
              Backup &amp; Recovery Retention
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We maintain encrypted backups of our databases for disaster
              recovery. When you request deletion of your personal data, it will
              be removed from our primary systems within 72 hours. Backup copies
              are overwritten on a rolling 30-day cycle. During this period, your
              deleted data may exist only in encrypted backup storage and is not
              accessible or usable in the Platform.
            </p>
          </section>

          {/* 5. Your Rights Under the DPDP Act */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Your Rights Under the DPDP Act
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              In accordance with the Digital Personal Data Protection Act, 2023,
              and applicable data protection laws, you have the following rights
              regarding your personal data:
            </p>

            <h3 className="text-xl font-semibold mb-2">
              5.1 Right to Access Your Data
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You may request a copy of all personal data we hold about you by
              contacting us at the email address provided in Section 11. We will
              respond to your request within 30 days and provide your data in a
              structured, commonly used, and machine-readable format.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              5.2 Right to Correct Your Data
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You may update or correct your personal information directly
              through your account settings within the Platform. For corrections
              that cannot be made through self-service, you may submit a request
              by contacting us at the email address in Section 11.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              5.3 Right to Delete Your Data
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You may request deletion of your personal data by contacting us or
              by deleting your account through the Platform settings. Upon
              receiving a verified deletion request, we will permanently delete
              your personal data from our primary systems within 72 hours and
              from backup storage within 30 days, except where retention is
              required by applicable law.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              5.4 Right to Withdraw Consent
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Where our processing of your data is based on your consent (e.g.,
              Gmail inbox connection, newsletter subscription), you may withdraw
              your consent at any time by disconnecting the integration through
              Platform settings or by unsubscribing from the newsletter.
              Withdrawal of consent will not affect the lawfulness of processing
              carried out prior to withdrawal.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              5.5 Right to Object to Marketing Communications
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You may opt out of marketing and promotional communications at any
              time by clicking the &quot;unsubscribe&quot; link in any marketing
              email, updating your communication preferences in account settings,
              or contacting us directly. Transactional communications (security
              alerts, account verification, service notifications) cannot be
              opted out of as they are necessary for Platform operations.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              5.6 Right to Nominate a Representative
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              In accordance with the DPDP Act, you have the right to nominate
              another individual to exercise your rights on your behalf in the
              event of your death or incapacity.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              5.7 Right to Grievance Redressal
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              If you believe your data protection rights have been violated, you
              may file a grievance with us. We will acknowledge your complaint
              within 3 business days and resolve it within 30 days. If you are
              unsatisfied with our resolution, you may appeal to the Data
              Protection Board of India established under the DPDP Act.
            </p>
          </section>

          {/* 6. Data Storage & Cross-Border Transfers */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Data Storage &amp; Cross-Border Transfers
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your personal information may be processed and stored on servers
              located in countries outside your jurisdiction. Our infrastructure
              providers (MongoDB Atlas, Cloudinary, Google Cloud, Vercel) operate
              data centers globally. We ensure that all transfers are protected
              by appropriate security measures, including encryption in transit
              (TLS 1.2+) and at rest (AES-256 encryption), and that our
              third-party service providers maintain adequate data protection
              standards consistent with the requirements of the DPDP Act.
            </p>
          </section>

          {/* 7. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Children&apos;s Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Platform is not directed at individuals under the age of 18. We
              take reasonable measures to protect the privacy and security of all
              users, including minors, and apply the same security safeguards to
              information provided by young users as we do to information provided
              by adults. We do not knowingly collect personal data from children
              under 18. If we become aware that we have collected personal data
              from a child under 18, we will take steps to delete that
              information promptly. If you are a parent or guardian and believe
              your child has provided us with personal data, please contact us at
              the address in Section 11.
            </p>
          </section>

          {/* 8. Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Data Security</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Encryption at Rest:</strong> OAuth tokens are encrypted in
                a Postgres vault using encryption keys. Databases are encrypted at
                rest via provider-level encryption.
              </li>
              <li>
                <strong>Encryption in Transit:</strong> All data is transmitted
                over HTTPS (TLS 1.2+). API routes require authenticated sessions
                (cookie-based with httpOnly and sameSite flags).
              </li>
              <li>
                <strong>No Plaintext Passwords:</strong> Passwords are never
                stored in plaintext; they are hashed using industry-standard
                algorithms.
              </li>
              <li>
                <strong>Workspace Isolation:</strong> All data queries are scoped
                by workspace ID, ensuring data separation between organizations.
              </li>
              <li>
                <strong>Access Controls:</strong> Role-based access control (RBAC)
                with Owner and Member roles and 16 granular permissions. All API
                routes require authentication.
              </li>
              <li>
                <strong>CORS Restrictions:</strong> API access is restricted to
                configured frontend origins.
              </li>
              <li>
                <strong>Rate Limiting:</strong> Sensitive endpoints are
                rate-limited to prevent abuse.
              </li>
              <li>
                <strong>Secure Invitations:</strong> Workspace invitation tokens
                are SHA-256 hashed with 7-day expiry.
              </li>
            </ul>
          </section>

          {/* 9. Cookies & Tracking Technologies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Cookies &amp; Tracking Technologies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use the following categories of cookies and similar
              technologies on our Landing Page and Platform:
            </p>

            <h3 className="text-xl font-semibold mb-2">
              9.1 Essential Cookies (Required)
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              These cookies are necessary for the Platform to function. They
              include session cookies (httpOnly, sameSite, 7-day TTL) for
              authentication, CSRF protection tokens, and load-balancing cookies.
              These cannot be disabled as the Platform will not function without
              them.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              9.2 Functional Cookies
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              These cookies remember your preferences and settings, such as your
              selected theme (light/dark mode), layout preferences, and language.
              They enhance your experience but are not strictly required for
              Platform operation.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              9.3 Third-Party Cookies
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We do not use third-party advertising cookies, analytics tracking
              cookies (such as those from Google Analytics, Facebook Pixel, or
              similar services), or tracking pixels in our emails. If we
              introduce any third-party cookies in the future, we will update this
              policy accordingly and seek your consent where required.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              9.4 Managing Cookies
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You can manage or delete cookies through your browser settings. Most
              browsers allow you to refuse or delete cookies. Please note that
              disabling essential cookies may affect the functionality of the
              Platform. For more information about cookies and how to manage
              them, visit <strong>allaboutcookies.org</strong>.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              9.5 Do Not Track
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Some browsers support a &quot;Do Not Track&quot; (DNT) feature that
              signals to websites that you do not want to be tracked. Since we do
              not use tracking cookies or analytics services, DNT signals do
              not change our data practices, but we respect your preference.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">
              9.6 Local Storage &amp; Similar Technologies
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We may use browser local storage to store non-sensitive preferences
              (theme, recently viewed items, UI state) and client-side
              application data. This data is not transmitted to our servers and
              can be cleared through your browser settings.
            </p>
          </section>

          {/* 10. Data Breach Notification */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. Data Breach Notification
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              In the event of a personal data breach that is likely to result in
              harm to any data principal, we will notify the affected individuals
              and the Data Protection Board of India without unreasonable delay,
              in accordance with the requirements of the DPDP Act. Our
              notification will include the nature of the breach, the personal
              data affected, the likely consequences, and the measures we have
              taken or propose to take to address the breach.
            </p>
          </section>

          {/* 11. How to Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              11. How to Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              For any questions, concerns, or requests related to this Privacy
              Policy or your personal data, please contact us:
            </p>
            <div className="bg-card rounded-xl border border-border p-6 text-muted-foreground space-y-1">
              <p>
                <strong>Redstring Technologies Private Limited</strong>
              </p>
              <p>Email: <CopyEmail email="founders@redstring.co.in">founders@redstring.co.in</CopyEmail></p>
              <p>Website: <a href="https://www.redstring.co.in" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">redstring.co.in</a></p>
            </div>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              12. Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify
              you of material changes by posting the updated policy on this page
              with a revised &quot;Last updated&quot; date and, for significant
              changes, by sending a notification to the email address associated
              with your account. We encourage you to review this policy
              periodically.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
