import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Calendar, Compass, ArrowRight } from 'lucide-react';

import kyotoImg from '../assets/kyoto.png';
import swissImg from '../assets/swiss.png';
import baliImg from '../assets/hero_bg.png';

const DESTINATIONS = [
  {
    id: 1,
    title: 'Historic Temples & Gardens',
    location: 'Kyoto, Japan',
    category: 'Cultural',
    price: '$1,890',
    duration: '8 Days',
    rating: '4.9',
    image: kyotoImg,
    description: 'Immerse yourself in Zen gardens, historic wooden pagodas, and traditional tea ceremonies during the breathtaking cherry blossom season.',
  },
  {
    id: 2,
    title: 'Alpine Cabin Escape',
    location: 'Zermatt, Switzerland',
    category: 'Mountain',
    price: '$2,450',
    duration: '6 Days',
    rating: '4.8',
    image: swissImg,
    description: 'Relax in a high-end cozy wooden chalet in the Swiss Alps, surrounded by snowy forests and majestic views of the Matterhorn.',
  },
  {
    id: 3,
    title: 'Uluwatu Tropical Sanctuary',
    location: 'Bali, Indonesia',
    category: 'Tropical',
    price: '$1,290',
    duration: '10 Days',
    rating: '4.95',
    image: baliImg,
    description: 'Rejuvenate with seaside infinity pools, stunning cliffside sunrise views, sacred temple trails, and pristine beaches.',
  },
  {
    id: 4,
    title: 'Amalfi Coast Skyline Resort',
    location: 'Positano, Italy',
    category: 'Tropical',
    price: '$2,800',
    duration: '7 Days',
    rating: '4.9',
    image: baliImg, // Reusing high-quality asset
    description: 'Stroll through pastel-colored cliffside houses, sunbathe on Mediterranean beaches, and enjoy premium coastal cuisine.',
  },
  {
    id: 5,
    title: 'Matterhorn Peak Expedition',
    location: 'Valais, Switzerland',
    category: 'Mountain',
    price: '$3,100',
    duration: '9 Days',
    rating: '4.7',
    image: swissImg, // Reusing high-quality asset
    description: 'Embark on guided high-alpine trekking, enjoy panoramic cable-car trips, and warm up by luxurious stone hearths.',
  },
];

const CATEGORIES = ['All', 'Tropical', 'Mountain', 'Cultural'];

export default function Destinations({ onSelectDestination }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDestinations = activeCategory === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter(dest => dest.category === activeCategory);

  return (
    <section id="destinations" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-brand-50 px-3.5 py-1.5 rounded-full">
          Featured Escapes
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mt-4 mb-4">
          Journey to the Extraordinary
        </h2>
        <p className="text-stone-500 max-w-xl mx-auto font-light">
          Handpicked premium travel spots selected by our guides for ultimate luxury, culture, and deep natural immersion.
        </p>

        {/* Categories Tab Bar */}
        <div className="flex justify-center items-center gap-3 mt-10 overflow-x-auto py-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'text-white'
                  : 'text-stone-600 hover:text-brand-500 hover:bg-stone-100'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-brand-500 rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Destination Cards */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredDestinations.map((dest) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 100, damping: 15 }}
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 border border-stone-100 flex flex-col h-full"
            >
              {/* Card Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span className="text-xs font-bold text-stone-800">{dest.rating}</span>
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 right-4 bg-teal-500/90 backdrop-blur-md px-3 py-1 rounded-full">
                  <span className="text-[10px] uppercase font-bold text-white tracking-wider">{dest.category}</span>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-xs font-light line-clamp-3">
                    {dest.description}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-1 text-stone-400 text-xs font-medium mb-2">
                    <MapPin className="h-3 w-3 text-teal-500" />
                    <span>{dest.location}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-800 group-hover:text-brand-500 transition-colors mb-3">
                    {dest.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
                  <div>
                    <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider">From</span>
                    <span className="text-lg font-extrabold text-stone-900">{dest.price}</span>
                    <span className="text-xs text-stone-500 font-normal"> / person</span>
                  </div>
                  
                  <motion.button
                    onClick={() => onSelectDestination(dest)}
                    className="p-3 bg-stone-50 hover:bg-brand-500 text-stone-700 hover:text-white rounded-full transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
