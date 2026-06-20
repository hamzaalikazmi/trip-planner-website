import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import TripPlanner from './components/TripPlanner';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleBookGeneralClick = () => {
    setSelectedDestination(null);
    setIsBookingOpen(true);
  };

  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
    setIsBookingOpen(true);
  };

  const handleBookCustomTrip = (customTripDetails) => {
    setSelectedDestination({
      title: `Custom ${customTripDetails.days}-Day Itinerary (${customTripDetails.guests} Travelers)`,
      category: 'Custom',
      price: `PKR ${customTripDetails.totalPrice.toLocaleString()}`,
    });
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <div>
        {/* Navigation */}
        <Navbar onBookClick={handleBookGeneralClick} />

        {/* Hero Section */}
        <Hero onBookClick={handleBookGeneralClick} />

        {/* Featured Destinations */}
        <Destinations onSelectDestination={handleSelectDestination} />

        {/* Cost Estimator */}
        <TripPlanner onBookCustom={handleBookCustomTrip} />

        {/* Testimonials */}
        <Testimonials />
      </div>

      {/* Footer */}
      <Footer />

      {/* Booking Form Overlay Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        destinationData={selectedDestination}
      />
    </div>
  );
}

export default App;
