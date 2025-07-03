
// TestimonialsSwiper.tsx
"use client";

import React, { memo, useCallback, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Mock testimonial data - replace with real data
const testimonialData = [
  {
    id: 1,
    content: "As a first-time buyer, I was nervous about getting a mortgage. Monefi walked me through everything, explained the terms clearly, and helped me secure a great deal. I never felt rushed or pressured—just supported.",
    author: "Sarah M.",
    role: "Manchester",
    rating: 5,
    profileImage:"1.png"
  },
  {
    id: 2,
    content: "I’ve worked with other brokers before, but Monefi felt different. They really listened to my situation and helped me set up life insurance and savings goals that worked for me. It felt personal and professional at the same time.",
    author: "David L.",
    role: "Birmingham",
    rating: 5,
    profileImage:"2.png"
  },
   {
    id: 3,
    content: "After struggling with debt for years, I reached out to Monefi. They helped me consolidate my loans into one manageable payment and even gave me budgeting tips that I still use. I finally feel in control again.",
    author: "Rebecca K.",
    role: "Leeds",
    rating: 5,
    profileImage:"1.png"
  },
  {
    id: 4,
    content: "I reached out for investment planning and expected lots of jargon and sales talk. Instead, I got a warm, honest adviser who took the time to educate me and build a plan that felt right. Truly refreshing.",
    author: "Emily T.",
    role: "Bristol",
    rating: 5,
    profileImage:"2.png"
  },
] as const;

interface TestimonialCardProps {
  testimonial: {
    id:number,
    content:string,
    author:string,
    role:string,
    rating:number,
    profileImage:string
  };
  index: number;
}

const TestimonialCard = memo(({ testimonial, index }: TestimonialCardProps) => (
  <div
    className={`w-full h-[400px] lg:h-[475px] rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
      index % 2 === 0 
        ? "bg-monefi-black text-white" 
        : "bg-monefi-off-white text-gray-900"
    }
        ${testimonialData.length === index+1 && 'lg:opacity-0' }
        `}
    role="article"
    aria-label={`Testimonial from ${testimonial.author}`}
  >
    <div>
      <div className="flex mb-4" aria-label={`${testimonial.rating} star rating`}>
        {Array.from({ length: testimonial.rating }, (_, i) => (
          <svg
            key={i}
            className="w-5 h-5 fill-current text-yellow-400"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <blockquote className="text-lg lg:text-xl mb-6 leading-relaxed">
       &quot;{testimonial.content}&quot;
      </blockquote>
    </div>
    
    <footer className="flex items-center gap-2.5">
      {/* <Image src={`/home/testimonials/${testimonial.profileImage}`} width={45} height={45} alt={testimonial.author + " Monefi."}/> */}
      <cite className="not-italic">
        <div className="font-semibold text-lg">{testimonial.author}</div>
        <div className={`text-sm ${index % 2 === 0 ? 'text-gray-300' : 'text-gray-600'}`}>
          {testimonial.role}
        </div>
      </cite>
    </footer>
  </div>
));

TestimonialCard.displayName = 'TestimonialCard';

export default function TestimonialsSwiper() {
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    // Optional: Add analytics tracking here
    console.log(`Slide changed to: ${swiper.activeIndex}`);
  }, []);

const handleSwiperInit = useCallback((swiper: SwiperType) => {
  swiperRef.current = swiper;
  console.log('Swiper initialized:', swiper);
}, []);

  const swiperConfig = useMemo(() => ({
    modules: [Mousewheel, A11y, Keyboard],
    spaceBetween: 24,
    slidesPerView: 1 as const,
    mousewheel: { 
      forceToAxis: true,
      sensitivity: 1,
      releaseOnEdges: true 
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      prevSlideMessage: 'Previous testimonial',
      nextSlideMessage: 'Next testimonial',
      paginationBulletMessage: 'Go to testimonial {{index}}',
    },
    breakpoints: {
      640: { 
        slidesPerView: 1,
        spaceBetween: 24 
      },
      768: { 
        slidesPerView: 1.2,
        spaceBetween: 24 
      },
      1024: { 
        slidesPerView: 2,
        spaceBetween: 30 
      },
      1280: { 
        slidesPerView: 2.2,
        spaceBetween: 32 
      }
    }
  }), []);

  const swiperRef = useRef<SwiperType | null>(null);



  return (


    <div className="flex flex-col gap-2.5 w-full">

    <div className="w-full" role="region" aria-label="Customer testimonials">
      <Swiper
        {...swiperConfig}
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiperInit}
        className="testimonials-swiper"
        >
        {testimonialData.map((testimonial, index) => (
          <SwiperSlide key={testimonial.id} className="h-auto">
            <TestimonialCard testimonial={testimonial} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    
    <div className="w-full lg:w-[43%] flex justify-end items-center gap-2.5"
    >
      <button className="w-12 h-12 bg-monefi-black rounded-full flex justify-center items-center text-white cursor-pointer"
      onClick={() => swiperRef.current?.slidePrev()}
    aria-label="Previous testimonial"
      >
        <ArrowLeft />
      </button>
      <button className="w-12 h-12 bg-monefi-black rounded-full flex justify-center items-center text-white cursor-pointer"
       onClick={() => swiperRef.current?.slideNext()}
    aria-label="Next testimonial"
      >
        <ArrowRight />
      </button>
    </div>
        </div>
  );
}