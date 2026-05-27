import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Baker Jones Holdings",
  description:
    "Read the Baker Jones Holdings Terms of Service to understand the conditions governing use of our website.",
};

export default function TermsOfServicePage() {
  return (
    <section className="bg-corporate-white min-h-screen py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-corporate-charcoal font-serif mb-4">
            Terms of Service
          </h1>
          <p className="text-corporate-charcoal/60 text-lg">
            Effective Date: May 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-corporate-charcoal/80 leading-relaxed text-[16px]">
          <p>
            Welcome to the website of Baker Jones Holdings Ltd
            (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
            &ldquo;us&rdquo;). By accessing or using this website, you agree to
            comply with and be bound by the following Terms of Service. If you do
            not agree with these terms, please do not use this website.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              1. Company Information
            </h2>
            <p className="mb-3">
              Baker Jones Holdings Ltd is a company registered in England and
              Wales.
            </p>
            <div className="bg-corporate-charcoal/5 rounded-xl p-6 mt-4">
              <p className="font-semibold text-corporate-charcoal mb-2">
                Registered Office:
              </p>
              <address className="not-italic leading-7">
                1 Andromeda House
                <br />
                Calleva Park
                <br />
                Aldermaston
                <br />
                Berkshire
                <br />
                England
                <br />
                RG7 8AP
              </address>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              2. Use of This Website
            </h2>
            <p className="mb-3">
              You agree to use this website only for lawful purposes and in a way
              that does not infringe the rights of others or restrict their use of
              the website.
            </p>
            <p className="mb-3">You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Attempt to gain unauthorised access to the website or servers
              </li>
              <li>Upload malicious software or harmful code</li>
              <li>Use the website for fraudulent or unlawful purposes</li>
              <li>Copy or reproduce website content without permission</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              3. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos,
              images, branding, and layout, is the property of Baker Jones
              Holdings Ltd unless otherwise stated.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute, modify, or commercially exploit
              any content without prior written consent.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              4. Information Disclaimer
            </h2>
            <p>
              The information provided on this website is for general
              informational purposes only. While we aim to keep all content
              accurate and up to date, we make no guarantees regarding
              completeness, reliability, or accuracy.
            </p>
            <p className="mt-3">
              Nothing on this website constitutes legal, financial, investment, or
              professional advice.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              5. Third-Party Links
            </h2>
            <p>
              This website may contain links to third-party websites for
              convenience or reference purposes. We are not responsible for the
              content, availability, or privacy practices of external websites.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Baker Jones Holdings Ltd
              shall not be liable for any direct, indirect, incidental, or
              consequential damages resulting from your use of this website.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              7. Privacy
            </h2>
            <p>
              Your use of this website is also governed by our{" "}
              <Link
                href="/privacy"
                className="text-corporate-charcoal font-semibold underline underline-offset-4 hover:text-corporate-gold transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              8. Changes to These Terms
            </h2>
            <p>
              We reserve the right to update or modify these Terms of Service at
              any time without prior notice. Updated versions will be published on
              this page.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              9. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and interpreted in accordance with
              the laws of England and Wales. Any disputes arising in connection
              with these Terms shall be subject to the exclusive jurisdiction of
              the courts of England and Wales.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              10. Contact Us
            </h2>
            <p>
              If you have any questions regarding these Terms of Service, please
              contact us through the contact information provided on our website.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
