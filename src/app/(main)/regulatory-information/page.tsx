import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulatory Information | Baker Jones Holdings",
  description:
    "Regulatory information and compliance details for Baker Jones Holdings.",
};

export default function RegulatoryInformationPage() {
  return (
    <section className="bg-corporate-white min-h-screen py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-corporate-charcoal font-serif mb-4">
            Regulatory Information
          </h1>
          <p className="text-corporate-charcoal/60 text-lg">
            Compliance and Regulatory Disclosures
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-corporate-charcoal/80 leading-relaxed text-[16px]">
          <p>
            Baker Jones Holdings Ltd is committed to maintaining the highest
            standards of regulatory compliance and corporate governance. This
            page provides important regulatory information about our business
            operations and services.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              1. Regulatory Status
            </h2>
            <p>
              Baker Jones Holdings Ltd is authorised and regulated by the
              Financial Conduct Authority (FCA) in the United Kingdom. We operate
              under strict regulatory frameworks to ensure the protection of our
              clients and the integrity of the financial markets.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              2. Company Information
            </h2>
            <p className="mb-3">
              Registered in England and Wales. Our registered office address is:
            </p>
            <ul className="list-none space-y-1">
              <li>Baker Jones Holdings Ltd</li>
              <li>123 Financial District</li>
              <li>London, EC2A 4BB</li>
              <li>United Kingdom</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              3. Financial Services Compensation Scheme (FSCS)
            </h2>
            <p>
              As a regulated entity, our eligible clients may have access to the
              Financial Services Compensation Scheme (FSCS) in the event that we
              are unable to meet our financial obligations. The availability of
              compensation depends on the type of business and the circumstances
              of the claim.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              4. Client Money and Assets
            </h2>
            <p>
              We adhere to strict regulatory rules regarding the safeguarding of
              client money and assets. Client funds are held in segregated
              accounts with top-tier banking institutions, ensuring a clear
              separation from our own corporate funds.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              5. Anti-Money Laundering (AML)
            </h2>
            <p>
              Baker Jones Holdings Ltd maintains comprehensive Anti-Money
              Laundering (AML) and Counter-Terrorist Financing (CTF) policies
              and procedures. We conduct rigorous due diligence on all clients
              and monitor transactions to prevent financial crime.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-corporate-charcoal mb-4 font-serif">
              6. Complaints Procedure
            </h2>
            <p>
              We strive to provide excellent service to all our clients. If you
              are dissatisfied with any aspect of our service, we have a formal
              complaints procedure in place. Complaints should be directed to
              our Compliance Department at info@bakerjonesholdings.com. If you
              are not satisfied with our final response, you may be eligible to
              refer your complaint to the Financial Ombudsman Service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
