import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, Globe, ChevronDown } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar({ onBookClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Destinations', href: '#destinations' },
    { name: 'Trip Planner', href: '#planner' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4">
      <nav className="mx-auto max-w-7xl rounded-2xl glass-panel px-6 py-4 flex items-center justify-between shadow-sm transition-all duration-300">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <img 
            src={logoImg} 
            alt="Syed's Trips" 
            className="h-10 w-auto object-contain mix-blend-multiply" 
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-stone-600 hover:text-brand-600 transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-brand-600 transition-colors cursor-pointer">
            <Globe className="h-4 w-4" />
            <span>EN</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          
          <motion.button
            onClick={onBookClick}
            className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-brand-600 cursor-pointer"
            whileHover={{ scale: 1.05, shadow: '0 10px 15px -3px rgba(15, 118, 110, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-stone-600 hover:text-brand-600 transition-colors cursor-pointer"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-6 right-6 z-40 rounded-2xl glass-panel p-6 shadow-lg md:hidden flex flex-col gap-4 border border-stone-200"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-stone-800 hover:text-brand-600 transition-colors py-2 border-b border-stone-100 last:border-0"
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex flex-col gap-4 pt-4">
              <button className="flex items-center justify-center gap-2 text-sm font-semibold text-stone-600 py-2">
                <Globe className="h-4 w-4" />
                <span>English (EN)</span>
              </button>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookClick();
                }}
                className="w-full rounded-xl bg-brand-500 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-brand-600"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
