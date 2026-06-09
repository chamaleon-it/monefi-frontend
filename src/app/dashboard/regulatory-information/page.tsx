import React from "react";

export default function RegulatoryInformationPage() {
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#232323] mb-2">
          Regulatory Information
        </h1>
      </div>

      <div className="space-y-8">
        {/* Regulatory Status */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">
            Regulatory Status
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Baker Jones Holdings is authorised and regulated by the Financial Conduct
            Authority (FCA) under Firm Reference Number (FRN) 969487.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are authorised to provide investment advice and arrange and
            execute transactions in relation to a range of financial
            instruments, including equities, bonds, IPOs, and digital assets
            (where applicable).
          </p>
        </section>

        {/* Nature of Services */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">
            Nature of Services
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We provide investment services which may include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-2">
            <li>
              Investment advice based on client objectives and risk profile
            </li>
            <li>Execution of buy and sell orders on behalf of clients</li>
            <li>
              Access to public and private market investment opportunities
            </li>
            <li>Portfolio monitoring and reporting services</li>
            <li>
              Arrangement of investment transactions with third-party issuers or
              counterparties
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Where investment advice is provided, it is based on information
            supplied by the client and is subject to suitability and
            appropriateness assessments.
          </p>
        </section>

        {/* Important Risk Warning */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">
            Important Risk Warning
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Investments involve risk. The value of investments can go down as
            well as up, and you may not get back the full amount invested.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            There is no guarantee of returns or capital preservation.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Some investments may be illiquid, meaning it may be difficult or
            impossible to sell or exit your position. Prices may fluctuate
            significantly due to market conditions, liquidity constraints, or
            issuer performance.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You should ensure you fully understand the risks involved before
            investing and seek independent advice where necessary.
          </p>
        </section>

        {/* FSCS Protection */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">
            FSCS Protection
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Certain investments and services provided through the Firm may be
            eligible for protection under the Financial Services Compensation
            Scheme (FSCS), depending on the nature of the product, structure,
            and counterparty.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            However, not all investments are covered by FSCS protection.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            FSCS protection typically applies to regulated activities such as
            certain types of custody arrangements, deposits, and specific
            investment products provided by authorised firms.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">Investments in:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-2 mb-4">
            <li>Unregulated collective investment schemes</li>
            <li>Certain alternative investments</li>
            <li>Private market opportunities</li>
            <li>Crypto-related assets (where applicable)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            may not be covered by FSCS.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            You should carefully review the documentation for each investment to
            understand whether FSCS protection applies.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Full details are available at{" "}
            <a
              href="https://www.fscs.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              https://www.fscs.org.uk
            </a>
          </p>
        </section>

        {/* Advice and Suitability */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">
            Advice and Suitability
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Where we provide investment advice, we assess the suitability of
            investments based on your financial circumstances, investment
            objectives, risk tolerance, and overall investment profile.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Suitability is determined through an ongoing relationship between
            you and your assigned advisor. This includes regular discussions,
            portfolio reviews, and updates to your personal and financial
            circumstances.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            It is your responsibility to ensure that the information you provide
            is accurate and kept up to date. Changes in your circumstances may
            affect the suitability of existing or future investments.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Recommendations provided by your advisor are based on the
            information available at the time and may be updated as your
            circumstances or market conditions change.
          </p>
        </section>

        {/* Order Execution */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">
            Order Execution
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We are committed to acting in your best interests when executing
            orders.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Where we execute transactions on your behalf, we do so in
            accordance with FCA best execution requirements. This means we take
            all sufficient steps to obtain the best possible result for our
            clients, considering factors such as:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-2 mb-4">
            <li>Price</li>
            <li>Costs</li>
            <li>Speed of execution</li>
            <li>Likelihood of execution and settlement</li>
            <li>Size and nature of the order</li>
            <li>Market conditions</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            The relative importance of these factors may vary depending on the
            characteristics of your order and prevailing market conditions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For illiquid or private market investments, execution may be subject
            to allocation processes, counterparty availability, and transaction
            timelines agreed with issuers or counterparties.
          </p>
        </section>

        {/* Custody and Client Assets */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">
            Custody and Client Assets
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Where applicable, client investments are recorded in the
            client&apos;s name and supported by contractual documentation and/or
            investment certificates issued by the Firm or relevant issuer.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Clients receive quarterly statements detailing their investment
            holdings, valuations (where applicable), and transaction history.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In the event of insolvency of the Firm, client ownership of
            investments is intended to remain unaffected, as client assets are
            held separately from the Firm&apos;s own assets in accordance with
            applicable client money and asset safeguarding arrangements.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For certain private market transactions, including bonds and
            pre-IPO investments, client funds may be held by regulated
            custodians, escrow agents, or settlement counterparties.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These third-party providers are carefully selected and subject to
            due diligence. Funds are held securely and are only released upon
            completion of the investment process, including registration of
            ownership or transfer of the underlying asset to the client (or
            relevant nominee structure), and confirmation of settlement
            conditions.
          </p>
        </section>

        {/* Conflicts of Interest */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">
            Conflicts of Interest
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Firm maintains a Conflicts of Interest Policy designed to
            identify, prevent, and manage circumstances in which the interests
            of the Firm, its employees, or other clients may conflict with your
            interests.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            This includes, but is not limited to, situations where the Firm:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-2 mb-4">
            <li>
              Advises multiple clients on the same or competing investment
              opportunities
            </li>
            <li>
              Receives fees, commissions, or benefits from third-party product
              providers
            </li>
            <li>
              Acts in multiple capacities in relation to a transaction (e.g.
              arranger and advisor)
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            Where a conflict of interest cannot be reasonably avoided, we will
            ensure it is managed fairly and, where appropriate, disclosed to you
            prior to proceeding with the relevant service or transaction.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are committed to ensuring that client interests are treated
            fairly and that any conflicts do not adversely impact the quality of
            service provided.
          </p>
        </section>

        {/* Complaints */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">
            Complaints
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you are dissatisfied with any aspect of our service, you may
            submit a complaint via email or through the client portal.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We will acknowledge your complaint promptly and conduct a thorough
            investigation in accordance with FCA dispute resolution rules.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We aim to resolve complaints as quickly and fairly as possible,
            keeping you informed of progress throughout the process.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Where applicable, eligible clients may have the right to refer
            unresolved complaints to the Financial Ombudsman Service (FOS) for
            independent review.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">
            Contact Information
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-2">
            <p className="font-semibold text-[#232323]">
              Baker Jones Holdings
            </p>
            <p>
              1 Andromeda House, Calleva Park, Aldermaston, Reading, Berkshire,
              RG7 8AP, United Kingdom
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@bakerjonesholdings.com"
                className="text-blue-600 underline hover:text-blue-800"
              >
                info@bakerjonesholdings.com
              </a>
            </p>
            <p>FCA Firm Reference Number: 969487</p>
          </div>
        </section>
      </div>
    </div>
  );
}
