export interface CapabilitySection {
  heading: string;
  type: "text" | "list";
  content: string | string[];
}

export interface CapabilityContent {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  sections: CapabilitySection[];
}

export const capabilitiesData: CapabilityContent[] = [
  {
    slug: "strategic-investments",
    title: "Strategic Investments",
    subtitle: "Building Long-Term Value Through Strategic Capital Allocation",
    overview: "At Baker Jones Holdings, we identify and invest in opportunities that demonstrate strong growth potential, sustainable business models, and long-term value creation. Our investment approach focuses on sectors positioned for future expansion, combining financial discipline with strategic market insight.",
    sections: [
      {
        heading: "What We Do",
        type: "text",
        content: "We partner with businesses and projects that have the potential to deliver meaningful returns while creating lasting economic value. Through rigorous evaluation, market analysis, and active portfolio oversight, we allocate capital where it can generate sustainable growth."
      },
      {
        heading: "Our Investment Focus",
        type: "list",
        content: [
          "Emerging and high-growth industries",
          "Technology and digital transformation",
          "Infrastructure and commercial assets",
          "Strategic business expansion opportunities",
          "Long-term value creation initiatives"
        ]
      },
      {
        heading: "Our Approach",
        type: "text",
        content: "Every investment is assessed through a disciplined framework that evaluates market opportunity, operational strength, scalability, and long-term sustainability. This allows us to build resilient portfolios designed to perform across market cycles."
      }
    ]
  },
  {
    slug: "business-acquisitions",
    title: "Business Acquisitions",
    subtitle: "Acquiring Businesses with Strong Foundations for Growth",
    overview: "Baker Jones Holdings actively acquires established businesses with proven operating models, scalable infrastructure, and opportunities for strategic expansion. Our acquisition strategy focuses on preserving strengths while unlocking new growth potential.",
    sections: [
      {
        heading: "What We Look For",
        type: "list",
        content: [
          "Established customer bases",
          "Reliable revenue streams",
          "Strong management structures",
          "Scalable operational frameworks",
          "Opportunities for digital transformation"
        ]
      },
      {
        heading: "Value Creation Strategy",
        type: "text",
        content: "Following acquisition, we work closely with leadership teams to strengthen operations, modernize systems, and position businesses for sustainable growth. Our goal is to create long-term value while maintaining continuity and operational excellence."
      },
      {
        heading: "Why Partner With Us",
        type: "text",
        content: "Our experience in investment strategy, operational development, and digital infrastructure enables us to support businesses through their next phase of growth."
      }
    ]
  },
  {
    slug: "digital-infrastructure",
    title: "Digital Infrastructure",
    subtitle: "Creating Modern Digital Foundations for Sustainable Growth",
    overview: "Technology is at the core of modern business performance. Baker Jones Holdings helps businesses strengthen their digital foundations through scalable infrastructure, cloud-based systems, and operational modernization.",
    sections: [
      {
        heading: "Our Focus",
        type: "text",
        content: "We invest in and implement digital solutions that improve efficiency, security, and scalability across organizations."
      },
      {
        heading: "Key Areas",
        type: "list",
        content: [
          "Cloud architecture and migration",
          "Business systems integration",
          "Data management solutions",
          "Process automation",
          "Digital transformation initiatives",
          "Infrastructure scalability planning"
        ]
      },
      {
        heading: "Business Impact",
        type: "text",
        content: "Modern digital infrastructure allows organizations to operate more efficiently, respond faster to market demands, and scale with confidence."
      },
      {
        heading: "Our Vision",
        type: "text",
        content: "We believe robust digital foundations are essential for long-term business success in an increasingly connected global economy."
      }
    ]
  },
  {
    slug: "real-estate-holdings",
    title: "Real Estate Holdings",
    subtitle: "Investing in Premium Assets That Deliver Long-Term Value",
    overview: "Our real estate investment strategy focuses on acquiring and managing high-quality commercial properties and digital real estate assets that offer stable performance and long-term appreciation potential.",
    sections: [
      {
        heading: "Investment Philosophy",
        type: "text",
        content: "We prioritize assets located in strategic markets with strong economic fundamentals, long-term demand, and opportunities for value enhancement."
      },
      {
        heading: "Portfolio Focus",
        type: "list",
        content: [
          "Commercial property investments",
          "Mixed-use developments",
          "Strategic land acquisitions",
          "Digital real estate assets",
          "Income-generating property portfolios"
        ]
      },
      {
        heading: "Long-Term Perspective",
        type: "text",
        content: "Our approach emphasizes asset quality, market resilience, and sustainable growth rather than short-term speculation."
      }
    ]
  },
  {
    slug: "growth-partnerships",
    title: "Growth Partnerships",
    subtitle: "Strategic Partnerships Designed to Accelerate Success",
    overview: "Baker Jones Holdings believes meaningful growth often comes through collaboration. We establish strategic partnerships and joint ventures that create mutual value, expand market reach, and unlock new opportunities.",
    sections: [
      {
        heading: "Partnership Model",
        type: "text",
        content: "We work alongside entrepreneurs, businesses, and investors to develop growth-focused relationships built on shared objectives and complementary strengths."
      },
      {
        heading: "Areas of Collaboration",
        type: "list",
        content: [
          "Joint ventures",
          "Market expansion initiatives",
          "Strategic investments",
          "Business development partnerships",
          "Technology and infrastructure collaborations"
        ]
      },
      {
        heading: "Our Advantage",
        type: "text",
        content: "By combining capital, expertise, and strategic resources, we help partners accelerate growth while reducing barriers to expansion."
      }
    ]
  },
  {
    slug: "brand-digital-expansion",
    title: "Brand & Digital Expansion",
    subtitle: "Expanding Brands Into New Markets Through Digital Growth",
    overview: "Strong brands require strategic visibility and scalable digital ecosystems. Baker Jones Holdings supports businesses in strengthening their market presence and expanding into new regions through digital-first growth strategies.",
    sections: [
      {
        heading: "What We Deliver",
        type: "text",
        content: "We help businesses increase brand reach, improve customer engagement, and create scalable digital platforms that support long-term growth."
      },
      {
        heading: "Key Focus Areas",
        type: "list",
        content: [
          "Digital market expansion",
          "Brand positioning strategies",
          "Online presence development",
          "Customer acquisition initiatives",
          "International growth opportunities",
          "Digital ecosystem optimization"
        ]
      },
      {
        heading: "Global Perspective",
        type: "text",
        content: "Our expansion strategies are designed to help businesses navigate new markets while maintaining brand consistency and operational effectiveness."
      }
    ]
  },
  {
    slug: "operational-systems-development",
    title: "Operational Systems Development",
    subtitle: "Building Scalable Systems for Sustainable Business Performance",
    overview: "Growth requires structure. Baker Jones Holdings develops operational systems and frameworks that improve efficiency, strengthen governance, and support long-term scalability.",
    sections: [
      {
        heading: "Our Approach",
        type: "text",
        content: "We design and implement operational models that align people, processes, and technology to create sustainable business performance."
      },
      {
        heading: "Areas of Expertise",
        type: "list",
        content: [
          "Operational workflow design",
          "Process optimization",
          "Governance frameworks",
          "Performance management systems",
          "Automation and efficiency initiatives",
          "Scalability planning"
        ]
      },
      {
        heading: "Benefits",
        type: "text",
        content: "Organizations with strong operational systems are better positioned to manage growth, improve decision-making, and maintain consistency across expanding operations."
      },
      {
        heading: "Long-Term Impact",
        type: "text",
        content: "Effective systems provide the foundation needed to support growth while maintaining quality, accountability, and operational excellence."
      }
    ]
  },
  {
    slug: "ai-automation-consulting",
    title: "AI & Automation Consulting",
    subtitle: "Implementing intelligent systems for operational efficiency",
    overview: "[Content pending for AI & Automation Consulting. This page will be updated once the content is provided.]",
    sections: []
  }
];
