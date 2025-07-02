import { PiggyBank, Shield, GraduationCap, Heart } from "lucide-react"

export function WhyYouNeedSection() {
  const reasons = [
    {
      icon: PiggyBank,
      title: "Income Replacement",
      description:
        "Ensure your family can meet day-to-day living costs—mortgage or rent, utilities, groceries—even if you're no longer there to provide.",
      color: "#ec709a",
    },
    {
      icon: Shield,
      title: "Debt & Liability Coverage",
      description:
        "Pay off outstanding loans, credit-card balances, or long-term debts without forcing your family to shoulder the burden.",
      color: "#ec709a",
    },
    {
      icon: GraduationCap,
      title: "Education & Milestone Funding",
      description:
        "Lock in the funds needed to send children to college, cover wedding expenses, or support other future milestones.",
      color: "#ec709a",
    },
    {
      icon: Heart,
      title: "Estate Planning & Inheritance",
      description:
        "Leave a tax-efficient legacy that can be used for wealth transfer, charitable gifting, or smoothing estate-settlement costs.",
      color: "#ec709a",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-[#e7e8d6]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Why You Need Life Insurance
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-4">
            Life insurance is more than just a policy—it&lsquo;s peace of mind for you and financial security for your family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon
            return (
              <div
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                <div className="pb-4 pt-6 px-4">
                  <div
                    className={`mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 shadow-lg`}
                    style={{ backgroundColor: `${reason.color}20` }}
                  >
                    <IconComponent className={`h-8 w-8 md:h-10 md:w-10 text-[${reason.color}]`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 px-2">
                    {reason.title}
                  </h3>
                </div>
                <div className="px-4 pb-6">
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
