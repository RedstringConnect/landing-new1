import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CopyEmail } from "@/components/ui/CopyEmail";

export const metadata: Metadata = {
  title: "Terms and Conditions | Redstring",
  description:
    "Terms and Conditions governing the use of Redstring's products and services, including the Landing Page and LoopX platform.",
  openGraph: {
    title: "Terms and Conditions | Redstring",
    description:
      "Read the Terms and Conditions for using Redstring and LoopX.",
    url: "/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-24 px-6 w-full max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-denton font-medium mb-6">
            Terms and Conditions
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: June 30, 2026
          </p>
        </div>

        <div className="prose dark:prose-invert text-left w-full max-w-none space-y-8">
          {/* Intro */}
          <section>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Redstring Technologies Private Limited (&quot;Redstring,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms and
              Conditions (&quot;Terms&quot;) govern your access to and use of the
              Redstring website at <strong>redstring.co.in</strong> (the
              &quot;Landing Page&quot;), the AI-powered hiring platform LoopX
              accessible at <strong>loopx.redstring.co.in</strong> (the
              &quot;Platform&quot;), and all related services, features,
              content, and functionality (collectively, the &quot;Services&quot;).
              By accessing or using our Services, you agree to be bound by these
              Terms. If you do not agree, please do not use our Services.
            </p>
          </section>

          {/* 1. Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                You must be at least 18 years of age to create an account and use
                the Platform.
              </li>
              <li>
                You must have the legal capacity to enter into these Terms. If you
                are using the Services on behalf of an organization, you represent
                and warrant that you have the authority to bind that organization
                to these Terms.
              </li>
              <li>
                By creating an account, you represent that all information you
                provide is accurate, current, and complete.
              </li>
            </ul>
          </section>

          {/* 2. Account Registration & Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Account Registration &amp; Security
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                You may register using your email address and password or through
                Google OAuth.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account.
              </li>
              <li>
                You must notify us immediately of any unauthorized use of your
                account or any other breach of security.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that violate
                these Terms or for security reasons.
              </li>
            </ul>
          </section>

          {/* 3. Description of Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Description of Services
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              LoopX is an AI-powered hiring and recruitment platform that provides
              the following core services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>AI Job Form Builder:</strong> Create customizable job
                application forms through natural language conversation with AI.
              </li>
              <li>
                <strong>AI Candidate Screening:</strong> Automated candidate
                screening with match scoring, highlights, summaries, and resume
                parsing powered by AI models.
              </li>
              <li>
                <strong>Hiring Pipeline:</strong> Visual Kanban board for
                managing candidates through hiring stages.
              </li>
              <li>
                <strong>Email Broadcast &amp; Outreach:</strong> Send personalized
                email campaigns to candidates with tracking and analytics.
              </li>
              <li>
                <strong>Real-Time Messaging:</strong> In-app messaging with
                email-chat bridging for candidate communication.
              </li>
              <li>
                <strong>Public Career Pages:</strong> Branded, SEO-optimized
                career pages with custom domains.
              </li>
              <li>
                <strong>Talent Sourcing:</strong> External candidate sourcing
                through ContactOut integration.
              </li>
              <li>
                <strong>Free Tools:</strong> Hiring Playbook, Hiring Planner, and
                other lead-generation tools available on the Landing Page.
              </li>
            </ul>
          </section>

          {/* 4. User Content */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The Platform allows users to upload, submit, and share various types
              of content, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Resumes, CVs, and cover letters</li>
              <li>Portfolio documents, project samples, and work examples</li>
              <li>Job descriptions and application forms</li>
              <li>Company branding materials (logos, images)</li>
              <li>Chat messages, email content, and attachments</li>
              <li>Video responses and audio recordings</li>
              <li>Career page content and custom configurations</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2 mt-6">
              4.1 License to User Content
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              By submitting content to the Platform, you grant Redstring a
              limited, non-exclusive, worldwide, royalty-free license to use,
              reproduce, modify, process (including AI analysis), store, and
              transmit your content solely for the purpose of providing and
              improving the Services. You retain all ownership rights to your
              content.
            </p>
            <h3 className="text-xl font-semibold mb-2 mt-6">
              4.2 User Representations
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You represent and warrant that: (a) you own or have the necessary
              rights and permissions to upload and share all content submitted to
              the Platform; (b) the content does not infringe, misappropriate, or
              violate any third party&apos;s intellectual property rights,
              privacy rights, or any other applicable law; (c) the content is
              accurate and not misleading.
            </p>
          </section>

          {/* 5. Copyright Infringement & DMCA Procedure */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Copyright Infringement &amp; Complaint Procedure
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Redstring respects the intellectual property rights of others and
              expects our users to do the same. If you believe that any content on
              the Platform infringes your copyright, please follow the procedure
              below.
            </p>

            <h3 className="text-xl font-semibold mb-2">
              5.1 Filing a Copyright Complaint
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To file a copyright infringement notice, please send a written
              notice to our designated copyright agent at{" "}
              <CopyEmail email="founders@redstring.co.in">founders@redstring.co.in</CopyEmail> containing the following
              information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Identification of the copyrighted work that you claim has been
                infringed (or, if multiple works, a representative list).
              </li>
              <li>
                Identification of the specific content on the Platform that you
                claim is infringing, with sufficient detail for us to locate it
                (e.g., URL, workspace ID, candidate record reference).
              </li>
              <li>
                Your contact information, including your full name, address, phone
                number, and email address.
              </li>
              <li>
                A statement that you have a good faith belief that the use of the
                content is not authorized by the copyright owner, its agent, or the
                law.
              </li>
              <li>
                A statement, made under penalty of perjury, that the information in
                your notice is accurate and that you are the copyright owner or
                authorized to act on behalf of the copyright owner.
              </li>
              <li>Your physical or electronic signature.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-6">
              5.2 Takedown Process
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Upon receiving a valid copyright infringement notice, we will:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                Acknowledge receipt of the notice within 2 business days.
              </li>
              <li>
                Review the notice and assess the claim for validity.
              </li>
              <li>
                Remove or disable access to the allegedly infringing content
                within 5 business days if the claim is valid.
              </li>
              <li>
                Notify the user who submitted or uploaded the content that it has
                been removed and provide them with an opportunity to file a
                counter-notification if they believe the removal was in error.
              </li>
            </ol>

            <h3 className="text-xl font-semibold mb-2 mt-6">
              5.3 Counter-Notification
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              If your content was removed and you believe it was done in error or
              that you have the right to use the content, you may file a
              counter-notification by contacting us at{" "}
              <CopyEmail email="founders@redstring.co.in">founders@redstring.co.in</CopyEmail> with: identification of the
              removed content, a statement under penalty of perjury that you have
              a good faith belief the removal was erroneous, your contact
              information, and a statement consenting to the jurisdiction of the
              courts in India. We will review counter-notifications and may
              restore the content within 10 business days if appropriate.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-6">
              5.4 Repeat Infringer Policy
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              In accordance with applicable law, we maintain a policy of
              terminating access for users or organizations that are repeat
              infringers of copyright. A user or organization will be considered a
              repeat infringer if they receive 3 or more valid copyright
              infringement notices. Upon the third valid notice, we reserve the
              right to immediately suspend or permanently terminate the
              infringer&apos;s account and remove all infringing content associated
              with that account without prior warning.
            </p>
          </section>

          {/* 6. Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Use the Services for any unlawful purpose or in violation of any
                applicable laws or regulations.
              </li>
              <li>
                Harass, abuse, threaten, or intimidate other users or candidates.
              </li>
              <li>
                Collect, store, or process personal data in a manner inconsistent
                with this Privacy Policy or applicable data protection laws.
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the
                Services, other user accounts, or our systems.
              </li>
              <li>
                Use automated means (bots, scrapers, etc.) to access the Services
                without our prior written consent.
              </li>
              <li>
                Interfere with or disrupt the integrity or performance of the
                Services.
              </li>
              <li>
                Reverse engineer, decompile, or disassemble any part of the
                Services.
              </li>
              <li>
                Upload malicious code, viruses, or any content that may damage or
                interfere with the Services.
              </li>
              <li>
                Use the Platform to send spam, unsolicited messages, or
                fraudulent communications.
              </li>
              <li>
                Misrepresent your identity, qualifications, or affiliations.
              </li>
            </ul>
          </section>

          {/* 7. AI & AI-Generated Content */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. AI &amp; AI-Generated Content
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                The Platform uses AI to screen candidates, generate match scores,
                extract information from resumes, draft emails, and provide hiring
                insights.
              </li>
              <li>
                AI-generated content (scores, highlights, summaries, suggested
                responses) is provided as辅助工具and should not be used as the sole
                basis for hiring decisions. Recruiters and hiring managers are
                responsible for their own evaluation of candidates.
              </li>
              <li>
                AI processing is performed through third-party AI providers (Groq
                API). User data sent to AI providers for processing is covered by
                our Privacy Policy.
              </li>
              <li>
                We do not guarantee the accuracy, completeness, or reliability of
                AI-generated outputs. Users should verify AI-generated content
                independently.
              </li>
            </ul>
          </section>

          {/* 8. Fees & Payment */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Fees &amp; Payment</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Certain features and plans may require payment. Pricing details
                will be communicated to you before you commit to a paid plan.
              </li>
              <li>
                All fees are quoted in Indian Rupees (INR) unless otherwise
                specified.
              </li>
              <li>
                Fees, once paid, are non-refundable except as expressly stated in
                these Terms or required by applicable law.
              </li>
              <li>
                We reserve the right to change our pricing with 30 days&apos;
                advance notice. Changes will not affect existing subscriptions
                until the end of the current billing period.
              </li>
            </ul>
          </section>

          {/* 9. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Intellectual Property
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The Services and all associated content, features, and functionality
              — including but not limited to software, text, graphics, logos,
              icons, images, audio clips, video clips, data compilations, page
              layout, underlying code, and the design, structure, and
              organization of the Services — are owned by Redstring and are
              protected by copyright, trademark, and other intellectual property
              laws.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                The &quot;Redstring&quot; name, logo, and all related marks are
                trademarks of Redstring Technologies Private Limited.
              </li>
              <li>
                The &quot;LoopX&quot; name and logo are trademarks of Redstring
                Technologies Private Limited.
              </li>
              <li>
                You may not use, reproduce, distribute, modify, or create
                derivative works from any part of the Services without our prior
                written consent.
              </li>
            </ul>
          </section>

          {/* 10. Third-Party Links & Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. Third-Party Links &amp; Services
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Platform may contain links to third-party websites, services, or
              integrations (e.g., Google, ContactOut, Cal.com) that are not
              operated or controlled by Redstring. We are not responsible for the
              content, privacy practices, or terms of service of any third-party
              services. Your use of third-party services is at your own risk and
              subject to their respective terms and policies.
            </p>
          </section>

          {/* 11. Data Processing & Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              11. Data Processing &amp; Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your use of the Services is also governed by our{" "}
              <a
                href="/privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </a>
              , which describes how we collect, use, store, and protect your
              personal data. By using the Services, you consent to the data
              processing practices described in the Privacy Policy, including the
              use of AI processing and cross-border data transfers.
            </p>
          </section>

          {/* 12. Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The Services are provided on an &quot;AS IS&quot; and &quot;AS
              AVAILABLE&quot; basis without warranties of any kind, either
              express or implied. To the fullest extent permitted by law, we
              disclaim all warranties, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Implied warranties of merchantability, fitness for a particular
                purpose, and non-infringement.
              </li>
              <li>
                Warranties that the Services will be uninterrupted, timely,
                secure, or error-free.
              </li>
              <li>
                Warranties that the results obtained from using the Services will
                be accurate or reliable.
              </li>
              <li>
                Warranties that any defects or errors in the Services will be
                corrected.
              </li>
            </ul>
          </section>

          {/* 13. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              13. Limitation of Liability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by applicable law, Redstring and its
              officers, directors, employees, agents, and affiliates shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to loss of profits, data,
              use, goodwill, or other intangible losses, resulting from: (a) your
              access to or use of or inability to access or use the Services; (b)
              any conduct or content of any third party; (c) any content obtained
              from the Services; or (d) unauthorized access, use, or alteration of
              your transmissions or content.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              In no event shall our total liability to you for all claims arising
              out of or relating to the Services exceed the amount you have paid to
              us in the 12 months preceding the claim, or INR 10,000 (whichever is
              greater).
            </p>
          </section>

          {/* 14. Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless Redstring and its
              officers, directors, employees, agents, and affiliates from and
              against any and all claims, damages, losses, liabilities, costs, and
              expenses (including reasonable legal fees) arising out of or
              relating to: (a) your use of the Services; (b) your violation of
              these Terms; (c) your violation of any applicable law or regulation;
              (d) your User Content; or (e) your infringement of any third
              party&apos;s intellectual property or other rights.
            </p>
          </section>

          {/* 15. Termination */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Termination</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>By You:</strong> You may terminate your account at any
                time by contacting us or using the account deletion feature in
                your settings. Upon termination, your right to use the Services
                will immediately cease.
              </li>
              <li>
                <strong>By Us:</strong> We may suspend or terminate your account
                and access to the Services at our sole discretion, with or without
                cause, and with or without notice. We may terminate accounts for
                violations of these Terms, fraudulent activity, abuse, or extended
                periods of inactivity (see our Privacy Policy for inactive account
                handling).
              </li>
              <li>
                <strong>Effect of Termination:</strong> Upon termination, Sections
                4 (License to User Content), 5 (Copyright), 9 (Intellectual
                Property), 12 (Disclaimers), 13 (Limitation of Liability), 14
                (Indemnification), and 16 (Dispute Resolution) will survive. We
                will delete your personal data in accordance with our Privacy
                Policy&apos;s retention and deletion provisions.
              </li>
            </ul>
          </section>

          {/* 16. Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              16. Dispute Resolution
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              These Terms are governed by and construed in accordance with the
              laws of India, without regard to its conflict of law principles. Any
              disputes arising out of or relating to these Terms shall be resolved
              as follows:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Informal Resolution:</strong> You agree to first attempt to
                resolve any dispute by contacting us at{" "}
                <CopyEmail email="founders@redstring.co.in">founders@redstring.co.in</CopyEmail>. We will attempt to resolve
                the dispute informally within 30 days.
              </li>
              <li>
                <strong>Jurisdiction:</strong> If the dispute is not resolved
                informally, you agree to submit to the exclusive jurisdiction of
                the courts of India, and you waive any objection to the
                inconvenience of such forum.
              </li>
              <li>
                <strong>Data Protection Disputes:</strong> Disputes relating to
                data protection rights may be escalated to the Data Protection
                Board of India as established under the DPDP Act.
              </li>
            </ol>
          </section>

          {/* 17. General Provisions */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              17. General Provisions
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Entire Agreement:</strong> These Terms, together with our
                Privacy Policy, constitute the entire agreement between you and
                Redstring regarding the Services.
              </li>
              <li>
                <strong>Severability:</strong> If any provision of these Terms is
                found to be unenforceable or invalid, that provision will be
                limited or eliminated to the minimum extent necessary, and the
                remaining provisions will remain in full force and effect.
              </li>
              <li>
                <strong>Waiver:</strong> Our failure to enforce any right or
                provision of these Terms will not be considered a waiver of that
                right or provision.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign or transfer these
                Terms or your rights under these Terms without our prior written
                consent. We may assign our rights and obligations without your
                consent.
              </li>
              <li>
                <strong>Modifications:</strong> We reserve the right to modify
                these Terms at any time. Material changes will be communicated by
                posting the updated Terms on this page with a revised &quot;Last
                updated&quot; date and, where appropriate, by sending
                notification to the email address associated with your account.
                Your continued use of the Services after the effective date of
                changes constitutes your acceptance of the modified Terms.
              </li>
            </ul>
          </section>

          {/* 18. Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              18. Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              For questions about these Terms, copyright complaints, or general
              inquiries, please contact us:
            </p>
            <div className="bg-card rounded-xl border border-border p-6 text-muted-foreground space-y-1">
              <p>
                <strong>Redstring Technologies Private Limited</strong>
              </p>
              <p>Email: <CopyEmail email="founders@redstring.co.in">founders@redstring.co.in</CopyEmail></p>
              <p>Website: <a href="https://www.redstring.co.in" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">redstring.co.in</a></p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
