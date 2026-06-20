import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Star } from 'lucide-react';
import heroBg from '../assets/hero_bg.png';

export default function Hero({ onBookClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-stone-900/60 via-stone-950/45 to-stone-50" />

      {/* Floating Badges */}
      <motion.div 
        className="absolute top-20 right-10 z-20 hidden lg:flex items-center gap-3 glass-panel-dark px-4 py-2.5 rounded-full text-white shadow-xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <div className="bg-amber-400 p-1.5 rounded-full">
          <Star className="h-4 w-4 fill-stone-900 text-stone-900" />
        </div>
        <div>
          <p className="text-xs font-semibold">4.9/5 Rating</p>
          <p className="text-[10px] text-stone-300">from 2k+ reviews</p>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-40 left-10 z-20 hidden lg:flex items-center gap-3 glass-panel-dark px-4 py-2.5 rounded-full text-white shadow-xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        <div className="bg-teal-500 p-1.5 rounded-full text-white">
          <MapPin className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold">500+ Escapes</p>
          <p className="text-[10px] text-stone-300">Curated destinations</p>
        </div>
      </motion.div>

      {/* Main Content Content */}
      <div className="relative z-20 max-w-5xl w-full text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Subtle Accent Title */}
          <motion.span 
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-teal-300 text-xs font-bold uppercase tracking-widest mb-6 border border-white/20"
          >
            Discover the Art of Travel
          </motion.span>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7.5xl font-extrabold tracking-tight text-white mb-6 leading-none max-w-4xl"
          >
            Crafting Unforgettable <br className="hidden sm:inline"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-amber-200 to-teal-300">
              Journeys & Escapes
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-xl text-stone-200 max-w-2xl mb-12 font-light leading-relaxed"
          >
            Explore breathtaking destinations, custom tailored itineraries, and unique local experiences designed specifically around your desires.
          </motion.p>

          {/* Search/Book Panel */}
          <motion.div 
            variants={itemVariants}
            className="w-full glass-panel p-6 sm:p-4 rounded-3xl shadow-2xl border border-white/50 flex flex-col sm:flex-row items-center gap-4 max-w-4xl"
          >
            {/* Destination Field */}
            <div className="flex items-center gap-3 px-4 py-3 sm:py-2 w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-stone-200/60">
              <MapPin className="text-teal-600 h-5 w-5 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] uppercase font-bold text-stone-500 tracking-wider">Destination</label>
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  className="bg-transparent border-0 p-0 text-sm font-semibold text-stone-800 placeholder-stone-400 focus:ring-0 focus:outline-hidden w-full"
                />
              </div>
            </div>

            {/* Date Field */}
            <div className="flex items-center gap-3 px-4 py-3 sm:py-2 w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-stone-200/60">
              <Calendar className="text-teal-600 h-5 w-5 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] uppercase font-bold text-stone-500 tracking-wider">Travel Dates</label>
                <input 
                  type="text" 
                  placeholder="Select your dates" 
                  className="bg-transparent border-0 p-0 text-sm font-semibold text-stone-800 placeholder-stone-400 focus:ring-0 focus:outline-hidden w-full"
                />
              </div>
            </div>

            {/* Guests Field */}
            <div className="flex items-center gap-3 px-4 py-3 sm:py-2 w-full sm:w-1/4">
              <Users className="text-teal-600 h-5 w-5 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] uppercase font-bold text-stone-500 tracking-wider">Guests</label>
                <select className="bg-transparent border-0 p-0 text-sm font-semibold text-stone-800 focus:ring-0 focus:outline-hidden w-full cursor-pointer">
                  <option>1 Guest</option>
                  <option defaultValue>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              onClick={onBookClick}
              className="w-full sm:w-auto shrink-0 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl px-8 py-4 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Search className="h-4 w-4" />
              <span className="font-semibold text-sm">Explore</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
