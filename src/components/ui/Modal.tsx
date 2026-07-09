"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string; // Tailwind class like "max-w-lg", "max-w-md", etc.
  showCloseIcon?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
  showCloseIcon = true,
}: ModalProps) {
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);

  // Esc key closes the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle native scroll event managers for scroll lock bypass on touch/wheel
  useEffect(() => {
    if (!isOpen) return;

    const scrollEl = modalScrollRef.current;
    const backdropEl = modalBackdropRef.current;

    const stopScrollPropagation = (e: Event) => {
      e.stopPropagation();
    };

    const preventScrollDefault = (e: Event) => {
      e.preventDefault();
    };

    if (scrollEl) {
      scrollEl.addEventListener("wheel", stopScrollPropagation, { passive: true });
      scrollEl.addEventListener("touchmove", stopScrollPropagation, { passive: true });
    }

    if (backdropEl) {
      backdropEl.addEventListener("wheel", preventScrollDefault, { passive: false });
      backdropEl.addEventListener("touchmove", preventScrollDefault, { passive: false });
    }

    // Lock body scroll
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener("wheel", stopScrollPropagation);
        scrollEl.removeEventListener("touchmove", stopScrollPropagation);
      }
      if (backdropEl) {
        backdropEl.removeEventListener("wheel", preventScrollDefault);
        backdropEl.removeEventListener("touchmove", preventScrollDefault);
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Backdrop Blur */}
          <motion.div
            ref={modalBackdropRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 bg-black cursor-pointer"
          />

          {/* Modal Body */}
          <motion.div
            ref={modalScrollRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className={cn(
              "bg-white rounded-3xl w-full overflow-hidden shadow-2xl relative z-10 border border-black/5 text-corporate-charcoal p-6 md:p-8 max-h-[90vh] overflow-y-auto",
              maxWidth
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 pb-4 mb-6">
              <h3 className="font-bold text-lg font-serif text-corporate-charcoal">{title}</h3>
              {showCloseIcon && (
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-corporate-white hover:bg-black/5 flex items-center justify-center text-corporate-charcoal transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="text-sm leading-relaxed text-corporate-charcoal/80">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
