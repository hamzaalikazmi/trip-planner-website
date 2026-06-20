import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, destinationData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);
    try {
      await fetch("https://formsubmit.co/ajax/syedhamzaalikazmi096@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          departure_month: date || 'Not specified',
          selected_trip: destinationData ? destinationData.title : 'General Query',
          trip_price: destinationData ? destinationData.price : 'N/A',
          _subject: `New Booking Inquiry: ${destinationData ? destinationData.title : 'General'}`
        })
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error", error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setDate('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-stone-950/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 border border-stone-200"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Modal Title */}
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  Plan Your Escape
                </h3>
                <p className="text-xs text-stone-400 mb-6">
                  {destinationData 
                    ? `Requesting custom itinerary details for: ${destinationData.title || 'Selected Trip'}` 
                    : 'Submit an inquiry and let our curators craft your personalized journey.'
                  }
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-stone-200 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-hidden bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-stone-200 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-hidden bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Preferred Departure Month</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="e.g. October 2026"
                        className="w-full rounded-xl border border-stone-200 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-hidden bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-3.5 font-semibold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            ) : (
              // Success Screen Success Screen
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 flex flex-col items-center gap-4"
              >
                <div className="bg-teal-50 p-4 rounded-full text-brand-500">
                  <CheckCircle2 className="h-16 w-16" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">Inquiry Received!</h3>
                <p className="text-stone-500 text-sm max-w-sm">
                  Thank you, <strong className="text-stone-800">{name}</strong>. Our custom travel designers will review your request and get back to you at <strong className="text-stone-800">{email}</strong> within 24 hours.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 bg-stone-800 hover:bg-stone-950 text-white font-semibold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
