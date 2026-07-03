import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Baker Jones Holdings",
  description:
    "Read the Baker Jones Holdings Cookie Policy to understand how we use cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <section className="bg-corporate-white min-h-screen py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-corporate-charcoal font-serif mb-4">
            Cookie Policy
          </h1>
          <p className="text-corporate-charcoal/60 text-lg">
            Effective Date: May 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-corporate-charcoal/80 leading-relaxed text-[16px]">
          <p>
            Baker Jones Holdings Ltd (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
            &ldquo;us&rdquo;) uses cookies and similar technologies to enhance
            your experience on our website. This Cookie Policy explains what
            cookies are, how we use them, and the choices you have regarding
            their use.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile
              device when you visit a website. They are widely used by website
              owners to make their websites work securely, more efficiently, and
              to provide reporting information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              2. How We Use Cookies
            </h2>
            <p className="mb-3">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Strictly Necessary Cookies:</strong> These are required
                for the operation of our website. They include, for example,
                cookies that enable you to log into secure areas.
              </li>
              <li>
                <strong>Analytical/Performance Cookies:</strong> These allow us to
                recognise and count the number of visitors and to see how
                visitors move around our website when they are using it.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> These are used to
                recognise you when you return to our website, enabling us to
                personalise our content for you.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              3. Third-Party Cookies
            </h2>
            <p>
              In addition to our own cookies, we may also use various third-party
              cookies to report usage statistics of the service, deliver
              advertisements on and through the service, and so on. We do not
              control the operation of any of them. Please review the relevant
              third-party websites for details on how they manage their cookies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              4. Managing Your Cookies
            </h2>
            <p>
              Most web browsers allow you to manage your cookie preferences. You
              can set your browser to refuse cookies, or to delete certain
              cookies. Generally you should also be able manage similar
              technologies in the same way that you manage cookies—using your
              browser&apos;s preferences.
            </p>
            <p className="mt-3">
              Please note that if you choose to block cookies, doing so may
              impair or prevent the smooth operation of some features on our
              website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              5. Changes to This Cookie Policy
            </h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify
              you of any changes by posting the new Cookie Policy on this page.
              You are advised to review this Cookie Policy periodically for any
              changes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              6. Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies, please contact
              us at info@bakerjonesholdings.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
