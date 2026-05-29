"use client";

import usePaths from "@/hooks/usePaths";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function PublicFooter() {
  const paths = usePaths();

  return (
    <footer className="bg-corporate-white text-corporate-charcoal pt-24 pb-12 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          <div className="lg:col-span-2 space-y-6">
            <Link href={paths.home} className="inline-block">
              <Image
                src="/logo.png"
                width={164}
                height={40}
                alt="Baker Jones Holdings logo"
              />
            </Link>
            <p className="text-corporate-charcoal/70 max-w-sm text-lg leading-relaxed">
              Building long-term value through strategic investments and digital infrastructure.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-corporate-charcoal/90">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link href={paths.aboutUs} className="text-corporate-charcoal/70 hover:text-corporate-charcoal transition-colors flex items-center group">
                  About Us <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href={paths.insurance} className="text-corporate-charcoal/70 hover:text-corporate-charcoal transition-colors flex items-center group">
                  Insurance <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href={paths.contactUs} className="text-corporate-charcoal/70 hover:text-corporate-charcoal transition-colors flex items-center group">
                  Careers <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-corporate-charcoal/90">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link href={paths.privacy} className="text-corporate-charcoal/70 hover:text-corporate-charcoal transition-colors flex items-center group">
                  Privacy Policy <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href={paths.terms} className="text-corporate-charcoal/70 hover:text-corporate-charcoal transition-colors flex items-center group">
                  Terms of Service <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href={paths.contactUs} className="text-corporate-charcoal/70 hover:text-corporate-charcoal transition-colors flex items-center group">
                  Contact <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-corporate-charcoal/60 text-sm">
            © {new Date().getFullYear()} Baker Jones Holdings. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {/* Social Placeholders */}
            {/* <a href="#" className="text-white/40 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Twitter</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
