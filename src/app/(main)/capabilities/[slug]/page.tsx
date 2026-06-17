import React from 'react';
import { notFound } from 'next/navigation';
import { capabilitiesData } from '@/data/capabilities';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const capability = capabilitiesData.find(c => c.slug === slug);
  if (!capability) {
    return { title: 'Not Found' };
  }
  return {
    title: `${capability.title} | Baker Jones Holdings`,
    description: capability.overview,
  };
}

export default async function CapabilityPage({ params }: Props) {
  const { slug } = await params;
  const capability = capabilitiesData.find(c => c.slug === slug);

  if (!capability) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-corporate-white pb-32">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-corporate-charcoal overflow-hidden text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-corporate-gold/20 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-corporate-gold font-semibold tracking-wide uppercase text-sm mb-6">
            Capability
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
            {capability.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed">
            {capability.subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-black/5">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-corporate-charcoal prose-p:text-corporate-charcoal/80">
            <h2 className="text-3xl font-bold mb-6 text-corporate-gold">Overview</h2>
            <p className="text-lg leading-relaxed mb-12">{capability.overview}</p>

            {capability.sections.map((section, index) => (
              <div key={index} className="mb-12 last:mb-0">
                <h3 className="text-2xl font-bold mb-6 text-corporate-charcoal border-b border-black/5 pb-4">
                  {section.heading}
                </h3>
                
                {section.type === "text" ? (
                  <p className="text-lg leading-relaxed text-corporate-charcoal/80">
                    {section.content as string}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {(section.content as string[]).map((item, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-corporate-beige/20 p-4 rounded-xl border border-black/5">
                        <CheckCircle2 className="w-6 h-6 text-corporate-gold flex-shrink-0 mt-0.5" />
                        <span className="text-corporate-charcoal/90 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
