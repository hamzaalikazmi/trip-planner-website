import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Eleanor Vance',
    role: 'Adventure Enthusiast',
    location: 'London, UK',
    avatarInitials: 'EV',
    color: 'bg-emerald-500',
    quote: 'The trip to Kyoto was perfectly paced. The accommodations selected by Syed\'s Trips felt authentic yet highly luxurious. Outstanding curation!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Brody',
    role: 'Cultural Historian',
    location: 'Boston, USA',
    avatarInitials: 'MB',
    color: 'bg-amber-500',
    quote: 'From custom airport pick-ups to local culinary guides, everything was taken care of. I didn’t have to think about a single detail, which is rare for premium travel.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sophia Loren',
    role: 'Travel Journalist',
    location: 'Milan, Italy',
    avatarInitials: 'SL',
    color: 'bg-teal-500',
    quote: 'The Alpine chalet in Zermatt was spectacular. Waking up to panoramic mountain sunrises with fresh local pastries was an unforgettable memory.',
    rating: 5,
  },
];

export default function Testimonials() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-brand-50 px-3.5 py-1.5 rounded-full">
          Client Stories
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mt-4 mb-4">
          Words from Our Travelers
        </h2>
        <p className="text-stone-500 max-w-xl mx-auto font-light">
          Real travelers sharing authentic stories from their handcrafted Syed's Trips journeys.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {REVIEWS.map((review) => (
          <motion.div
            key={review.id}
            variants={itemVariants}
            className="relative bg-white rounded-3xl p-8 border border-stone-200/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top quote decorative icon */}
            <div className="absolute top-6 right-6 text-stone-100">
              <Quote className="h-10 w-10 rotate-180" />
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-stone-600 text-sm font-light leading-relaxed italic">
                "{review.quote}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mt-8 border-t border-stone-100 pt-6">
              <div className={`h-11 w-11 rounded-full ${review.color} flex items-center justify-center text-white text-sm font-extrabold shadow-sm`}>
                {review.avatarInitials}
              </div>
              <div>
                <span className="block text-sm font-bold text-stone-800 leading-tight">{review.name}</span>
                <span className="block text-[10px] text-stone-400 font-semibold">{review.location}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
