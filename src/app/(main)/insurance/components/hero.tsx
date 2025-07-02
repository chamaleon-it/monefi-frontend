
export function HeroSection() {
  return (
    <section className="py-16 md:py-24 px-4 h-[calc(100vh-150px)]">
      <div className="container mx-auto max-w-6xl text-center space-y-5">

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight px-4">
          Protecting the Financial Future of Your <span style={{ color: "#ec709a" }}>Loved Ones</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
          Life insurance provides a guaranteed benefit in the event of death, helping cover expenses and maintain your
          family&apos;s standard of living. At Monefi, we offer flexible life insurance solutions designed to fit every stage
          of life and every budget.
        </p>
      </div>
        <div className="grid grid-cols-4 gap-7">
          <div className="border rounded-full h-32 flex items-center justify-center bg-monefi-off-white">Tailored Advice</div>
          <div className="border rounded-full h-32 flex items-center justify-center">Competitive Rates</div>
          <div className="border rounded-full h-32 flex items-center justify-center">Hassle-Free Application</div>
          <div className="border rounded-full h-32 flex items-center justify-center">Ongoing Support</div>
        </div>
    </section>
  )
}
