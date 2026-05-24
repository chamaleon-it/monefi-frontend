"use client"


export function HeroSection() {
  return (
    <section className="py-16 md:py-24 flex justify-center items-center font-poppins px-4 min-h-[calc(100vh-150px)] bg-bakerjonesholdings-off-white">
      <div className="container mx-auto max-w-6xl text-center space-y-5">

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight px-4">
          Welcome to bakerjonesholdings   <br />  <span style={{ color: "#012A62" }}>Your Partner in Financial Empowerment</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 font-poppins mb-8 max-w-4xl mx-auto leading-relaxed px-4">
         Founded in 2020, bakerjonesholdings has rapidly become a trusted name in the world of finance, offering tailored financial solutions that cater to both individuals and businesses.
        </p>
        <p className="text-lg md:text-xl text-gray-700 font-poppins mb-8 max-w-4xl mx-auto leading-relaxed px-4">Our mission is simple: to empower our clients by providing them with the knowledge, tools, and resources they need to make confident financial decisions.</p>
             
      </div>
  
    </section>
  )
}


