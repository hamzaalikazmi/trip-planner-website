import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, Building, Tent, Compass, Landmark } from 'lucide-react';

const HOTEL_TIERS = [
  { id: 'standard', name: 'Cozy Lodge', price: 90, icon: Tent, desc: 'Charming, local bed & breakfasts.' },
  { id: 'premium', name: 'Boutique Hotel', price: 210, icon: Building, desc: 'Luxury rooms, central locations, curated aesthetic.' },
  { id: 'luxury', name: 'Ultra Luxury Oasis', price: 580, icon: Sparkles, desc: 'Private villas, 5-star spa, personal concierge service.' },
];

const EXCURSIONS = [
  { id: 'guided', name: 'Private Expert Guide', costPerPerson: 180, icon: Compass },
  { id: 'gourmet', name: 'Premium Dining Package', costPerPerson: 110, icon: Landmark },
  { id: 'wellness', name: 'Spa & Wellness Pass', costPerPerson: 250, icon: Sparkles },
];

export default function TripPlanner({ onBookCustom }) {
  const [days, setDays] = useState(7);
  const [guests, setGuests] = useState(2);
  const [selectedHotel, setSelectedHotel] = useState('premium');
  const [selectedExcursions, setSelectedExcursions] = useState(['guided']);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const hotelPricePerNight = HOTEL_TIERS.find(h => h.id === selectedHotel)?.price || 0;
    const hotelTotal = hotelPricePerNight * days;
    
    const excursionTotal = selectedExcursions.reduce((sum, excId) => {
      const exc = EXCURSIONS.find(e => e.id === excId);
      return sum + (exc ? exc.costPerPerson * guests : 0);
    }, 0);

    const baseFlightsAndPermits = 450 * guests;

    setTotalPrice(hotelTotal + excursionTotal + baseFlightsAndPermits);
  }, [days, guests, selectedHotel, selectedExcursions]);

  const toggleExcursion = (id) => {
    if (selectedExcursions.includes(id)) {
      setSelectedExcursions(selectedExcursions.filter(e => e !== id));
    } else {
      setSelectedExcursions([...selectedExcursions, id]);
    }
  };

  return (
    <section id="planner" className="py-24 bg-stone-100/50 border-y border-stone-200/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-brand-50 px-3.5 py-1.5 rounded-full">
            Tailor Your Trip
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mt-4 mb-4">
            Interactive Trip Cost Estimator
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto font-light">
            Plan your dream itinerary. Adjust the settings to estimate the total investment for your next custom luxury escape.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls Configurator (Left) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-stone-200/50 flex flex-col gap-8">
            {/* Days slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-stone-800">Trip Duration</label>
                <span className="text-sm font-extrabold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{days} Days</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="21" 
                value={days} 
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1.5">
                <span>3 Days</span>
                <span>12 Days</span>
                <span>21 Days</span>
              </div>
            </div>

            {/* Guests slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-stone-800">Travelers</label>
                <span className="text-sm font-extrabold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={guests} 
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1.5">
                <span>1 Guest</span>
                <span>4 Guests</span>
                <span>8 Guests</span>
              </div>
            </div>

            {/* Hotel Tier Selection */}
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-4">Accommodation Standard</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {HOTEL_TIERS.map((tier) => {
                  const Icon = tier.icon;
                  const isSelected = selectedHotel === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedHotel(tier.id)}
                      className={`text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col gap-2 cursor-pointer ${
                        isSelected 
                          ? 'border-brand-500 bg-brand-50/20 ring-1 ring-brand-500 shadow-xs' 
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-brand-500' : 'text-stone-400'}`} />
                        <span className="text-xs font-extrabold text-stone-900">${tier.price}/nt</span>
                      </div>
                      <h4 className="font-semibold text-sm text-stone-800 mt-1">{tier.name}</h4>
                      <p className="text-[10px] text-stone-400 leading-normal">{tier.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Excursion selection */}
            <div>
              <label className="block text-sm font-semibold text-stone-800 mb-4">Select Curated Add-ons</label>
              <div className="flex flex-col gap-3">
                {EXCURSIONS.map((exc) => {
                  const Icon = exc.icon;
                  const isSelected = selectedExcursions.includes(exc.id);
                  return (
                    <button
                      key={exc.id}
                      onClick={() => toggleExcursion(exc.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? 'border-brand-500 bg-brand-50/20 ring-1 ring-brand-500' 
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-brand-500/10 text-brand-500' : 'bg-stone-100 text-stone-500'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <span className="block text-sm font-semibold text-stone-800">{exc.name}</span>
                          <span className="block text-[10px] text-stone-400">Exclusive group & VIP priority</span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-stone-800">+${exc.costPerPerson} / traveler</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pricing Panel Output (Right) */}
          <div className="lg:col-span-5 sticky top-28 bg-brand-600 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between min-h-[480px]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
                  <Calculator className="h-6 w-6 text-teal-300" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold">Trip Investment</h3>
                  <p className="text-[10px] text-teal-200 uppercase font-semibold tracking-wider">Live Tailored Calculation</p>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="flex flex-col gap-4 mt-6 border-y border-white/10 py-6">
                <div className="flex justify-between text-sm">
                  <span className="text-teal-100">Flights, Visas & Entry (Est.)</span>
                  <span className="font-bold">${450 * guests}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-teal-100">{days} Nights at {HOTEL_TIERS.find(h => h.id === selectedHotel)?.name}</span>
                  <span className="font-bold">
                    ${(HOTEL_TIERS.find(h => h.id === selectedHotel)?.price || 0) * days}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-teal-100">Excursions ({selectedExcursions.length} chosen)</span>
                  <span className="font-bold">
                    ${selectedExcursions.reduce((sum, excId) => {
                      const exc = EXCURSIONS.find(e => e.id === excId);
                      return sum + (exc ? exc.costPerPerson * guests : 0);
                    }, 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-teal-200">Total Estimate</span>
                <div className="text-right">
                  <motion.span 
                    key={totalPrice}
                    initial={{ scale: 1.1, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl sm:text-5xl font-extrabold"
                  >
                    ${totalPrice.toLocaleString()}
                  </motion.span>
                  <span className="block text-[10px] text-teal-200 mt-1">Includes all taxes & custom fees</span>
                </div>
              </div>

              <motion.button
                onClick={() => onBookCustom({ days, guests, selectedHotel, selectedExcursions, totalPrice })}
                className="w-full bg-white hover:bg-teal-50 text-brand-600 rounded-2xl py-4 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Inquire & Book This Trip
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
