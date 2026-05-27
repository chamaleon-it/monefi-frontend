import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Baker Jones Holdings",
  description:
    "Read the Baker Jones Holdings Privacy Policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-corporate-white min-h-screen py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-corporate-charcoal font-serif mb-4">
            Privacy Policy
          </h1>
          <p className="text-corporate-charcoal/60 text-lg">
            Effective Date: May 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-corporate-charcoal/80 leading-relaxed text-[16px]">
          <p>
            Baker Jones Holdings Ltd (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
            &ldquo;us&rdquo;) is committed to protecting your privacy and
            handling your personal information responsibly and transparently.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, and protect your
            information when you visit our website.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect and process the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact details</li>
              <li>Email address and phone number</li>
              <li>Company information</li>
              <li>IP address and browser information</li>
              <li>
                Information submitted through contact forms or email
                communications
              </li>
              <li>Website usage data through cookies and analytics tools</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to enquiries and communications</li>
              <li>Provide and improve our services</li>
              <li>Maintain website functionality and security</li>
              <li>Analyse website performance and user experience</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              3. Legal Basis for Processing
            </h2>
            <p className="mb-3">
              We process personal data under lawful bases including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your consent</li>
              <li>Legitimate business interests</li>
              <li>Performance of a contract</li>
              <li>Compliance with legal obligations</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              4. Cookies
            </h2>
            <p>
              Our website may use cookies and similar technologies to improve
              functionality and user experience.
            </p>
            <p className="mt-3">
              You can control or disable cookies through your browser settings.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              5. Sharing of Information
            </h2>
            <p>We do not sell your personal data.</p>
            <p className="mt-3">
              We may share information with trusted service providers,
              professional advisers, regulators, or legal authorities where
              necessary and permitted by law.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              6. Data Security
            </h2>
            <p>
              We implement reasonable technical and organisational measures to
              safeguard personal information against unauthorised access, misuse,
              disclosure, or loss.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              7. Data Retention
            </h2>
            <p>
              We retain personal information only for as long as necessary to
              fulfil the purposes outlined in this Privacy Policy or to comply
              with legal obligations.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              8. Your Rights
            </h2>
            <p className="mb-3">
              Under UK data protection laws, you may have rights to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Restrict or object to processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              9. Third-Party Services
            </h2>
            <p>
              Our website may include links or integrations with third-party
              services. We are not responsible for the privacy practices of those
              third parties.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              10. International Data Transfers
            </h2>
            <p>
              Where personal information is transferred outside the United
              Kingdom, appropriate safeguards will be implemented in accordance
              with applicable data protection laws.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              11. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically. Any updates will be
              published on this page with a revised effective date.
            </p>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              12. Contact Us
            </h2>
            <p>
              If you have questions regarding this Privacy Policy or wish to
              exercise your data rights, please contact us through the contact
              details available on our website.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
