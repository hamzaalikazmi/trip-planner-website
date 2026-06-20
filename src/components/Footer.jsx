import React, { useState } from 'react';
import { Compass, Github, Twitter, Instagram, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-16 px-6 border-t border-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand Info */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <a href="#" className="flex items-center">
            <img 
              src={logoImg} 
              alt="Syed's Trips" 
              className="h-10 w-auto object-contain brightness-0 invert" 
            />
          </a>
          <p className="text-stone-400 text-sm font-light leading-relaxed max-w-sm">
            Curating rare luxury travels, high-alpine hiking expeditions, and cultural escapes across the globe. Uncover your path.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="p-2 bg-stone-800 hover:bg-teal-500 hover:text-white rounded-full transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-stone-800 hover:bg-teal-500 hover:text-white rounded-full transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-stone-800 hover:bg-teal-500 hover:text-white rounded-full transition-colors">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 flex flex-col gap-3 text-sm">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-2">Destinations</h4>
          <a href="#destinations" className="hover:text-white transition-colors">Kyoto, Japan</a>
          <a href="#destinations" className="hover:text-white transition-colors">Zermatt, Swiss</a>
          <a href="#destinations" className="hover:text-white transition-colors">Bali, Indonesia</a>
          <a href="#destinations" className="hover:text-white transition-colors">Amalfi Coast</a>
        </div>

        <div className="md:col-span-2 flex flex-col gap-3 text-sm">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-2">Agency</h4>
          <a href="#" className="hover:text-white transition-colors">Our Story</a>
          <a href="#" className="hover:text-white transition-colors">Curators</a>
          <a href="#" className="hover:text-white transition-colors">Sustainabilty</a>
          <a href="#" className="hover:text-white transition-colors">Careers</a>
        </div>

        {/* Newsletter Signup */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-2">Newsletter</h4>
          <p className="text-stone-400 text-sm font-light leading-relaxed">
            Subscribe to receive exclusive seasonal package details and member-only guides.
          </p>
          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-hidden focus:border-teal-500 pr-12"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    key="checked"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Send className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-teal-400 font-semibold"
            >
              Successfully subscribed to our travel log!
            </motion.p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
        <p>© 2026 Syed's Trips Ltd. All rights reserved.</p>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-stone-300 transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
