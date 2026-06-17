export interface IndustrySection {
  heading: string;
  type: "text" | "list";
  content: string | string[];
}

export interface IndustryContent {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  sections: IndustrySection[];
}

export const industriesData: IndustryContent[] = [
  {
    slug: "technology",
    title: "Technology",
    subtitle: "Investing in the Technologies Shaping Tomorrow",
    overview: "Technology continues to redefine industries, economies, and consumer behavior worldwide. At Baker Jones Holdings, we invest in innovative technology-driven businesses that demonstrate strong growth potential, scalable business models, and sustainable competitive advantages.",
    sections: [
      {
        heading: "Our Focus",
        type: "text",
        content: "We seek opportunities across emerging and established technology sectors where innovation drives measurable value creation. Through strategic capital allocation and operational expertise, we help businesses accelerate growth and strengthen market positioning."
      },
      {
        heading: "Areas of Interest",
        type: "list",
        content: [
          "Enterprise technology solutions",
          "Cloud-based platforms",
          "Digital infrastructure",
          "Cybersecurity solutions",
          "Software development",
          "Data and analytics technologies"
        ]
      },
      {
        heading: "Our Approach",
        type: "text",
        content: "We combine long-term investment strategies with operational support, helping technology companies scale efficiently while adapting to rapidly evolving market demands."
      },
      {
        heading: "Building the Future",
        type: "text",
        content: "Technology remains a cornerstone of global economic growth, and we are committed to supporting businesses that are shaping the next generation of innovation."
      }
    ]
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    subtitle: "Strategic Real Estate Investments for Long-Term Value",
    overview: "Real estate remains one of the most resilient asset classes for wealth preservation and sustainable growth. Baker Jones Holdings invests in premium commercial, mixed-use, and strategic property assets that offer long-term appreciation and income-generating potential.",
    sections: [
      {
        heading: "Investment Philosophy",
        type: "text",
        content: "We focus on assets located in high-demand markets with strong economic fundamentals, favorable demographic trends, and opportunities for value enhancement."
      },
      {
        heading: "Areas of Focus",
        type: "list",
        content: [
          "Commercial properties",
          "Office and business parks",
          "Mixed-use developments",
          "Strategic land acquisitions",
          "Digital real estate assets",
          "Income-producing portfolios"
        ]
      },
      {
        heading: "Creating Sustainable Growth",
        type: "text",
        content: "Our investment approach prioritizes disciplined acquisition strategies, operational efficiency, and long-term asset management to maximize value over time."
      },
      {
        heading: "Long-Term Vision",
        type: "text",
        content: "Through careful market analysis and strategic investment decisions, we build resilient real estate portfolios designed to perform across economic cycles."
      }
    ]
  },
  {
    slug: "ai-saas",
    title: "AI & SaaS",
    subtitle: "Driving Innovation Through Artificial Intelligence and Software Solutions",
    overview: "Artificial Intelligence and Software-as-a-Service (SaaS) continue to transform how businesses operate, compete, and scale. Baker Jones Holdings invests in innovative platforms and technologies that improve efficiency, automate processes, and create measurable business value.",
    sections: [
      {
        heading: "Why AI & SaaS",
        type: "text",
        content: "Businesses worldwide are adopting intelligent technologies to streamline operations, enhance customer experiences, and unlock new revenue opportunities. We support companies that are developing scalable solutions for tomorrow's digital economy."
      },
      {
        heading: "Key Areas of Interest",
        type: "list",
        content: [
          "Artificial intelligence platforms",
          "SaaS business models",
          "Workflow automation",
          "Data intelligence solutions",
          "Machine learning applications",
          "Enterprise software solutions"
        ]
      },
      {
        heading: "Strategic Support",
        type: "text",
        content: "Beyond capital, we provide strategic guidance, operational expertise, and digital infrastructure support to help businesses accelerate growth and market adoption."
      },
      {
        heading: "Future-Ready Investments",
        type: "text",
        content: "We believe AI and SaaS technologies will remain central to global business transformation for years to come."
      }
    ]
  },
  {
    slug: "financial-services",
    title: "Financial Services",
    subtitle: "Supporting Innovation Across Modern Financial Markets",
    overview: "The financial services industry is undergoing significant transformation through technology, automation, and evolving consumer expectations. Baker Jones Holdings invests in businesses and platforms that enhance efficiency, accessibility, and value creation within financial markets.",
    sections: [
      {
        heading: "Industry Opportunities",
        type: "text",
        content: "We focus on organizations that leverage innovation to improve financial operations, customer experiences, and market accessibility."
      },
      {
        heading: "Areas of Focus",
        type: "list",
        content: [
          "Financial technology solutions",
          "Digital payment systems",
          "Wealth management platforms",
          "Business finance solutions",
          "Financial infrastructure services",
          "Data-driven financial technologies"
        ]
      },
      {
        heading: "Creating Competitive Advantage",
        type: "text",
        content: "Our investment strategy emphasizes scalable business models, regulatory awareness, operational excellence, and sustainable growth."
      },
      {
        heading: "Driving Financial Innovation",
        type: "text",
        content: "By supporting forward-thinking businesses, we contribute to the continued modernization of financial services globally."
      }
    ]
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    subtitle: "Investing in the Foundations of Economic Growth",
    overview: "Infrastructure serves as the backbone of modern economies. Baker Jones Holdings invests in assets and projects that support long-term development, economic productivity, and sustainable expansion.",
    sections: [
      {
        heading: "Strategic Importance",
        type: "text",
        content: "Reliable infrastructure enables businesses and communities to thrive. We focus on opportunities that deliver long-term value while supporting future growth."
      },
      {
        heading: "Investment Areas",
        type: "list",
        content: [
          "Digital infrastructure",
          "Commercial developments",
          "Connectivity and communications",
          "Technology infrastructure",
          "Logistics and operational facilities",
          "Scalable business infrastructure"
        ]
      },
      {
        heading: "Long-Term Perspective",
        type: "text",
        content: "Infrastructure investments often benefit from strong demand fundamentals and the potential for stable, long-term returns."
      },
      {
        heading: "Supporting Sustainable Development",
        type: "text",
        content: "Our goal is to invest in assets that strengthen economic activity and create lasting value for stakeholders."
      }
    ]
  },
  {
    slug: "digital-commerce",
    title: "Digital Commerce",
    subtitle: "Powering Growth in the Digital Economy",
    overview: "Digital commerce continues to reshape global markets by creating new opportunities for businesses and consumers alike. Baker Jones Holdings supports organizations that leverage technology, data, and digital platforms to drive growth and customer engagement.",
    sections: [
      {
        heading: "Our Focus",
        type: "text",
        content: "We invest in businesses that are building scalable digital ecosystems and expanding their reach through innovative online strategies."
      },
      {
        heading: "Areas of Interest",
        type: "list",
        content: [
          "E-commerce platforms",
          "Online marketplaces",
          "Digital customer acquisition",
          "Subscription-based businesses",
          "Digital payment integration",
          "Global online expansion"
        ]
      },
      {
        heading: "Growth Through Innovation",
        type: "text",
        content: "We help businesses strengthen digital operations, improve customer experiences, and develop scalable systems that support long-term growth."
      },
      {
        heading: "Expanding Market Opportunities",
        type: "text",
        content: "As digital commerce continues to evolve, we remain focused on identifying opportunities that create sustainable competitive advantages in a rapidly changing marketplace."
      }
    ]
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    subtitle: "Transforming the Future of Healthcare",
    overview: "The healthcare industry is evolving rapidly through technological advancements, data-driven solutions, and a growing emphasis on accessible care. Baker Jones Holdings invests in healthcare innovations that improve patient outcomes, streamline operations, and support the modernization of global health systems.",
    sections: [
      {
        heading: "Our Focus",
        type: "text",
        content: "We partner with organizations that leverage digital health technologies and scalable solutions to address modern healthcare challenges and improve care delivery."
      },
      {
        heading: "Key Areas of Interest",
        type: "list",
        content: [
          "Digital health platforms",
          "Medical technology and devices",
          "Telemedicine and remote care",
          "Healthcare data and analytics",
          "Clinical workflow automation",
          "Biotechnology and life sciences"
        ]
      },
      {
        heading: "Strategic Impact",
        type: "text",
        content: "We provide the strategic capital and operational expertise needed to help healthcare businesses scale efficiently while navigating complex regulatory environments."
      },
      {
        heading: "Driving Health Innovation",
        type: "text",
        content: "By supporting forward-thinking healthcare solutions, we contribute to building resilient, sustainable, and accessible health systems for the future."
      }
    ]
  }
];
