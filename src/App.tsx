/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Shield, 
  Umbrella, 
  Bike, 
  Car, 
  Heart, 
  ChevronDown, 
  CheckCircle2, 
  MessageCircle, 
  Star, 
  Gift, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X,
  ArrowRight,
  ClipboardList,
  Award,
  Instagram,
  Facebook
} from 'lucide-react';

// --- Constants ---
const WHATSAPP_NUMBER = "917603800588";
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Insurance Plans', href: '#plans' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const stats = [
  { value: 50000, label: "Policies Issued", prefix: "🚀", suffix: "+" },
  { value: 60, label: "Seconds Average Quote", prefix: "⚡", suffix: "" },
  { value: 9, label: "Customer Rating", prefix: "⭐", suffix: "/10" },
  { value: 100, label: "Secure & Verified", prefix: "🔒", suffix: "%" },
];

const insurancePlans = [
  {
    id: 'bike',
    icon: <Bike className="w-12 h-12" />,
    title: "Bike Insurance",
    description: "Protect your two-wheeler from accidents, theft, and third-party damages. Instant quotes from India's top insurers. Starting at just ₹714/year.",
    badge: "✨ Get up to ₹500 Cashback",
    link: `${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+Bike+Insurance`
  },
  {
    id: 'car',
    icon: <Car className="w-12 h-12" />,
    title: "Car Insurance",
    description: "Zero depreciation cover, cashless repairs at 10,000+ garages, and instant claim assistance. Compare 20+ plans in seconds.",
    badge: "✨ Get up to ₹500 Cashback",
    link: `${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+Car+Insurance`
  },
  {
    id: 'health',
    icon: <Heart className="w-12 h-12" />,
    title: "Health Insurance",
    description: "Individual, family floater, and senior citizen health plans. Cashless hospitalization at 10,000+ network hospitals across India.",
    badge: "✨ Get up to ₹500 Cashback",
    link: `${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+Health+Insurance`
  },
  {
    id: 'life',
    icon: <Shield className="w-12 h-12" />,
    title: "Life Insurance",
    description: "Term plans, ULIPs, and endowment policies from top-rated insurers. Get ₹1 Crore life cover starting from just ₹490/month.",
    badge: "✨ Get up to ₹500 Cashback",
    link: `${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+Life+Insurance`
  }
];

const steps = [
  {
    number: "01",
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Choose Your Insurance",
    description: "Tap on any insurance plan button. You'll be instantly connected to our official Insure Club WhatsApp business number."
  },
  {
    number: "02",
    icon: <ClipboardList className="w-8 h-8" />,
    title: "Share Basic Details",
    description: "Our expert team on WhatsApp guides you step by step — vehicle info, health details, or personal data. No complicated forms."
  },
  {
    number: "03",
    icon: <Award className="w-8 h-8" />,
    title: "Receive Your Policy",
    description: "Get instant personalized quotes, compare the best plans, make payment, and receive your policy document — all within WhatsApp."
  }
];

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Mumbai",
    initials: "RS",
    quote: "Got my bike insurance renewed in under 2 minutes on WhatsApp. Absolutely seamless experience. Highly recommend Insure Club!"
  },
  {
    name: "Priya Nair",
    location: "Bengaluru",
    initials: "PN",
    quote: "Compared 15 health insurance plans and chose the best one for my family. The team was super helpful. Got ₹500 cashback too!"
  },
  {
    name: "Amit Verma",
    location: "Delhi",
    initials: "AV",
    quote: "Life insurance sorted in one WhatsApp conversation. No agent visits, no long calls. Insure Club is the future of insurance!"
  }
];

const faqs = [
  {
    q: "What types of insurance does Insure Club offer?",
    a: "Insure Club offers Bike Insurance, Car Insurance, Health Insurance, and Life Insurance from India's top IRDAI-registered insurance companies. All plans are available through our WhatsApp service."
  },
  {
    q: "How do I get a quote?",
    a: "Simply tap any \"Get Quote on WhatsApp\" button on our website. You'll be connected to our team on WhatsApp instantly where we will guide you through the entire process."
  },
  {
    q: "Is Insure Club safe and authorized?",
    a: "Yes. Insure Club partners exclusively with IRDAI-registered insurance companies. All transactions are fully secure and compliant with Indian insurance regulations."
  },
  {
    q: "What is the ₹500 cashback offer?",
    a: "New customers purchasing their first policy through Insure Club receive up to ₹500 cashback. Terms and conditions apply. Please refer to our Terms & Conditions page for full details."
  },
  {
    q: "How long does it take to get my policy?",
    a: "Most policies are issued within minutes to a few hours after completing the required details and payment on WhatsApp."
  },
  {
    q: "Can I renew my existing policy through Insure Club?",
    a: "Absolutely. Send us a WhatsApp message at +91 76038 00588 and we will help you renew any of your existing insurance policies quickly."
  }
];

// --- Components ---

const CountUp = ({ value, prefix, suffix }: { value: number, prefix: string, suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 text-white">
        <span className="text-3xl md:text-4xl opacity-80">{prefix}</span>
        <div className="text-4xl md:text-5xl font-stats flex items-baseline gap-1">
          <span>{Number.isInteger(value) ? Math.floor(count).toLocaleString() : count.toFixed(1)}</span>
          <span className="text-2xl md:text-3xl opacity-80">{suffix}</span>
        </div>
      </div>
    </div>
  );
};

const WhatsAppMockup = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    "🏍️ Bike Insurance — Starting ₹714/year | Get up to ₹500 Cashback",
    "🚗 Car Insurance — Instant Quotes from 20+ Insurers | Get up to ₹500 Cashback",
    "❤️ Health Insurance — Family Floater Plans Available | Get up to ₹500 Cashback",
    "🛡️ Life Insurance — ₹1 Crore Cover from ₹490/month | Get up to ₹500 Cashback"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[280px] h-[580px] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden animate-float">
      {/* Phone Header */}
      <div className="bg-deep-purple p-4 pt-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-purple flex items-center justify-center text-white font-bold">IC</div>
        <div>
          <div className="text-white text-sm font-bold flex items-center gap-1">
            Insure Club | Official <CheckCircle2 className="w-3 h-3 text-green-400 fill-green-400" />
          </div>
          <div className="text-green-400 text-[10px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-3 space-y-4 bg-[#e5ddd5] h-full overflow-y-auto pb-20">
        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-xs">
          Hello! 👋 Welcome to Insure Club. How can we help you today?
        </div>

        {/* Carousel Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-4 rounded-xl shadow-md border-l-4 border-primary-purple"
          >
            <p className="text-xs font-medium text-dark-charcoal">{cards[activeCard]}</p>
          </motion.div>
        </AnimatePresence>

        {/* Quick Replies */}
        <div className="space-y-2 pt-4">
          {['🏍️ Bike Insurance', '🚗 Car Insurance', '❤️ Health Insurance', '🛡️ Life Insurance'].map((item) => (
            <div key={item} className="bg-white text-primary-purple text-center py-2 rounded-full text-[10px] font-bold shadow-sm border border-primary-purple/20">
              {item}
            </div>
          ))}
        </div>
        <p className="text-center text-[9px] text-gray-500 pt-2">Tap any option to connect instantly</p>
      </div>
    </div>
  );
};

const FAQItem = ({ q, a }: { q: string, a: string, key?: number | string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b border-light-border transition-colors ${isOpen ? 'bg-soft-lavender/30' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left px-4"
      >
        <span className={`text-lg font-semibold ${isOpen ? 'text-primary-purple' : 'text-dark-charcoal'}`}>{q}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-primary-purple' : 'text-gray-400'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 text-gray-600 leading-relaxed">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="sticky top-0 bg-white border-b border-light-border p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-display font-bold text-deep-purple">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-soft-lavender rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className="p-8 markdown-body">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-primary-purple selection:text-white" id="home">
      {/* --- Top Bar --- */}
      <div className="bg-deep-purple text-white py-2 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <div className="flex gap-6">
            <a href={`tel:+917603800588`} className="flex items-center gap-2 hover:text-gold-accent transition-colors">
              <Phone className="w-3 h-3" /> +91 76038 00588
            </a>
            <a href={`mailto:support@insureclub.in`} className="flex items-center gap-2 hover:text-gold-accent transition-colors">
              <Mail className="w-3 h-3" /> support@insureclub.in
            </a>
          </div>
          <a 
            href={`${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+insurance+help`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-gold-accent hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-3 h-3" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* --- Navigation --- */}
      <nav className={`fixed ${isScrolled ? 'top-0' : 'top-0 sm:top-8'} w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:rotate-12 transition-transform bg-primary-purple flex items-center justify-center">
              <img 
                src="https://drive.google.com/thumbnail?id=1sOhPh9kLTXX7yZzDOWkmYpjvYQF2ufUK&sz=w1000" 
                alt="Insure Club Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-white font-black text-xl">IC</div>';
                }}
              />
            </div>
            <div>
              <span className="text-2xl font-display font-black text-deep-purple block leading-none">Insure Club</span>
              <span className="text-[10px] uppercase tracking-widest text-primary-purple font-bold">Your Trusted Partner</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-semibold text-dark-charcoal hover:text-primary-purple transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a 
              href={`${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+a+free+insurance+quote`}
              target="_blank"
              rel="noreferrer"
              className="bg-primary-purple text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-primary-purple/40 hover:scale-105 transition-all flex items-center gap-2 animate-pulse-glow"
            >
              <MessageCircle className="w-4 h-4" /> Get Free Quote on WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a 
              href={`${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+a+free+insurance+quote`}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-[#25D366] text-white rounded-full shadow-lg whatsapp-pulse"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button className="p-2" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-deep-purple" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-primary-purple flex items-center justify-center">
                  <img 
                    src="https://drive.google.com/thumbnail?id=1sOhPh9kLTXX7yZzDOWkmYpjvYQF2ufUK&sz=w1000" 
                    alt="Insure Club Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-white font-black text-xl">IC</div>';
                    }}
                  />
                </div>
                <span className="text-2xl font-display font-black text-deep-purple">Insure Club</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold text-dark-charcoal"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={`${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+a+free+insurance+quote`}
                target="_blank"
                rel="noreferrer"
                className="bg-primary-purple text-white px-8 py-4 rounded-2xl text-lg font-bold text-center shadow-xl"
              >
                Get Free Quote on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-tr from-deep-purple/5 to-white"></div>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-soft-lavender/40 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-soft-lavender px-4 py-2 rounded-full text-primary-purple text-xs font-bold mb-6 border border-primary-purple/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-purple"></span>
              </span>
              India's Fastest Insurance on WhatsApp
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-dark-charcoal leading-tight mb-6">
              Insure What <br />
              <span className="purple-gradient-text">Matters Most</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Bike, Car, Health & Life Insurance — Get instant quotes, compare top plans, and secure your policy in under 60 seconds. 100% on WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+a+free+insurance+quote`}
                target="_blank"
                rel="noreferrer"
                className="bg-primary-purple text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-primary-purple/40 hover:scale-105 transition-all flex items-center justify-center gap-3 group"
              >
                <MessageCircle className="w-6 h-6" /> Get My Free Quote Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#how-it-works"
                className="border-2 border-primary-purple/20 text-primary-purple px-8 py-4 rounded-full text-lg font-bold hover:bg-soft-lavender transition-all text-center"
              >
                See How It Works ↓
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-6">
              {['✅ IRDAI Registered', '🔒 100% Secure', '⭐ 9/10 Rated'].map((badge) => (
                <span key={badge} className="text-xs font-bold text-gray-400 uppercase tracking-widest">{badge}</span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <WhatsAppMockup />
          </motion.div>
        </div>
      </section>

      {/* --- Stats Strip --- */}
      <section className="bg-deep-purple py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 shimmer-bg opacity-10 animate-shimmer"></div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative">
              <CountUp {...stat} />
              <div className="text-gold-accent text-[10px] font-bold uppercase tracking-widest text-center mt-1">{stat.label}</div>
              {idx < stats.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-px h-12 bg-gold-accent/30 -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- Insurance Services --- */}
      <section className="py-24 bg-off-white relative" id="plans">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6C3DE8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-deep-purple mb-4">Insurance Plans Tailored For You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4">Compare, choose, and get covered — all within a single WhatsApp conversation.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {insurancePlans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-purple/10 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-soft-lavender rounded-2xl text-primary-purple group-hover:scale-110 transition-transform">
                    {plan.icon}
                  </div>
                  <div className="bg-gold-accent/20 text-gold-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shimmer-bg animate-shimmer">
                    {plan.badge}
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-dark-charcoal mb-4">{plan.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{plan.description}</p>
                <a 
                  href={plan.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary-purple font-bold hover:gap-4 transition-all"
                >
                  Get {plan.title.split(' ')[0]} Quote on WhatsApp <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section className="py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-deep-purple mb-4">How Insure Club Works</h2>
            <p className="text-gray-600 px-4">No paperwork. No apps. No waiting. Just WhatsApp.</p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-12">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 border-t-2 border-dashed border-primary-purple/30 -z-10"></div>
            
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -30 : idx === 2 ? 30 : 0, y: idx === 1 ? 30 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-primary-purple rounded-full flex items-center justify-center text-white shadow-xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gold-accent rounded-full flex items-center justify-center text-deep-purple font-black text-sm border-4 border-white">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-dark-charcoal mb-4">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Offer Banner --- */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-deep-purple to-primary-purple -z-10"></div>
        {/* Confetti Particles */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-2 h-2 bg-gold-accent/40 rounded-full animate-confetti"
            style={{ 
              left: `${Math.random() * 100}%`, 
              bottom: '-20px',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <div className="inline-block bg-gold-accent text-deep-purple px-4 py-1 rounded-full text-[10px] font-black tracking-widest mb-6 shimmer-bg animate-shimmer">
              🎁 LIMITED TIME OFFER
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-white mb-6">
              Get up to ₹500 Cashback <br className="hidden sm:block" />
              on Your First Policy!
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl">
              Valid on Bike, Car, Health & Life Insurance. Claim your cashback instantly via WhatsApp. Offer valid while stocks last.
            </p>
            <a 
              href={`${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+to+claim+my+Rs500+cashback`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-deep-purple px-8 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-black shadow-2xl hover:scale-105 transition-all border-4 border-gold-accent"
            >
              <Gift className="w-6 h-6" /> Claim ₹500 Cashback Now
            </a>
            <p className="text-white/40 text-[10px] mt-6 italic">*Terms and conditions apply. See Terms & Conditions page for full details.</p>
          </div>

          <div className="relative">
            <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl absolute inset-0 animate-pulse"></div>
            <Gift className="w-48 h-48 text-gold-accent animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-24 bg-soft-lavender/50" id="about">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black text-deep-purple mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Over 50,000 happy policyholders trust Insure Club</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-primary-purple/5 border border-light-border relative"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold-accent text-gold-accent" />)}
                </div>
                <p className="text-gray-600 italic mb-8 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-purple rounded-full flex items-center justify-center text-white font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-dark-charcoal">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-black text-deep-purple mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, idx) => <FAQItem key={idx} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* --- Mid-Page CTA --- */}
      <section className="py-20 bg-linear-to-b from-white to-soft-lavender">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-black text-deep-purple mb-6">Ready to Get Insured Today?</h2>
          <p className="text-gray-600 mb-10 text-lg">Speak to our insurance experts right now — available 9 AM to 9 PM, 7 days a week.</p>
          <a 
            href={`${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+insurance+help`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-primary-purple text-white px-12 py-5 rounded-full text-xl font-black shadow-2xl hover:scale-105 transition-all mb-6"
          >
            <MessageCircle className="w-6 h-6" /> Start WhatsApp Chat Now
          </a>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-deep-purple font-bold text-lg">
              <Phone className="w-5 h-5" /> Or call us: +91 76038 00588
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Your data is safe. We never spam or share your information.
            </p>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-footer-purple text-white pt-20 pb-10" id="contact">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-primary-purple flex items-center justify-center">
                  <img 
                    src="https://drive.google.com/thumbnail?id=1sOhPh9kLTXX7yZzDOWkmYpjvYQF2ufUK&sz=w1000" 
                    alt="Insure Club Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-white font-black text-xl">IC</div>';
                    }}
                  />
                </div>
                <span className="text-3xl font-display font-black">Insure Club</span>
              </div>
              <p className="text-white/60 mb-8 leading-relaxed">
                Insurance, simplified. Right on WhatsApp. Insure Club connects you to India's best insurance plans through WhatsApp — fast, simple, and trusted.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: MessageCircle, href: `${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+insurance+help` },
                  { Icon: Facebook, href: "https://www.facebook.com/share/1Qqe1tHdpq/" },
                  { Icon: Instagram, href: "https://www.instagram.com/insure_club?igsh=cHplM21vbzNza3V6" },
                  { Icon: Phone, href: "tel:+917603800588" },
                  { Icon: Mail, href: "mailto:support@insureclub.in" }
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-purple transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8 text-gold-accent">Quick Links</h4>
              <ul className="space-y-4 text-white/60">
                {navLinks.map(link => (
                  <li key={link.name}><a href={link.href} className="hover:text-white transition-colors">{link.name}</a></li>
                ))}
                <li><button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">Terms & Conditions</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8 text-gold-accent">Contact Information</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary-purple shrink-0" />
                  <div>
                    <div className="font-bold">+91 76038 00588</div>
                    <div className="text-xs text-white/40">WhatsApp & Voice</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary-purple shrink-0" />
                  <div>
                    <div className="font-bold">support@insureclub.in</div>
                    <div className="text-xs text-white/40">Email Support</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary-purple shrink-0" />
                  <div>
                    <div className="font-bold">India</div>
                    <div className="text-xs text-white/40">Headquarters</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">
            <div>© 2026 Insure Club | All Rights Reserved | IRDAI Registered Partners</div>
            <div className="flex gap-6">
              <button onClick={() => setActiveModal('privacy')}>Privacy Policy</button>
              <button onClick={() => setActiveModal('terms')}>Terms & Conditions</button>
              <span>Disclaimer</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp Button --- */}
      <a 
        href={`${WHATSAPP_BASE_URL}?text=Hi%2C+I+want+insurance+help`}
        target="_blank"
        rel="noreferrer"
        className="fixed top-24 left-6 md:top-28 md:left-8 z-[100] w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl whatsapp-pulse hover:scale-110 transition-transform group"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
        <div className="absolute left-16 md:left-20 bg-white text-dark-charcoal px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl pointer-events-none">
          Chat with Insure Club Now! 💬
        </div>
      </a>

      {/* --- Back to Top Button --- */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-10 h-10 md:w-12 md:h-12 bg-white border border-light-border rounded-full flex items-center justify-center text-primary-purple shadow-xl hover:bg-soft-lavender transition-all ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-90" />
      </button>

      {/* --- Modals --- */}
      <Modal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
        title="Privacy Policy — Insure Club"
      >
        <div className="markdown-body">
          <p><strong>Effective Date:</strong> January 1, 2026</p>
          <p><strong>Last Updated:</strong> March 2026</p>
          <h2>Introduction</h2>
          <p>Insure Club ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our WhatsApp-based insurance services. Please read this policy carefully. By using our services, you agree to the practices described herein.</p>
          
          <h2>1. Information We Collect</h2>
          <ul>
            <li>Personal identification information (name, date of birth, gender)</li>
            <li>Contact details (phone number, email address, postal address)</li>
            <li>Vehicle details (registration number, make, model, year) for motor insurance</li>
            <li>Health information (age, medical history summary) for health insurance</li>
            <li>Financial information necessary to process insurance applications and premium payments</li>
            <li>WhatsApp communication data for service delivery</li>
            <li>Device and usage data (browser type, IP address, pages visited) for analytics</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>Your information is used to:</p>
          <ul>
            <li>Process and issue insurance policies on your behalf</li>
            <li>Provide personalized insurance quotes and recommendations</li>
            <li>Communicate policy updates, renewals, and claim information</li>
            <li>Process ₹500 cashback and other promotional offers</li>
            <li>Improve our website and WhatsApp service quality</li>
            <li>Comply with legal, regulatory, and IRDAI obligations</li>
          </ul>

          <h2>3. Sharing of Information</h2>
          <p>We share your information only with:</p>
          <ul>
            <li>IRDAI-registered insurance companies for policy issuance</li>
            <li>Payment processors for secure premium transactions</li>
            <li>Technology partners essential for service delivery</li>
            <li>Government or regulatory authorities when legally required</li>
          </ul>
          <p>We do NOT sell, trade, or rent your personal information to any third party for marketing purposes.</p>

          <h2>4. Data Security</h2>
          <p>We implement industry-standard SSL encryption, secure servers, and access controls to protect your data. However, no method of transmission over the internet is 100% secure.</p>

          <h2>5. WhatsApp Communication</h2>
          <p>When you contact us via WhatsApp at +91 76038 00588, your conversation data is subject to both this Privacy Policy and WhatsApp's Privacy Policy (Meta Platforms). We only initiate WhatsApp conversations in response to your direct request.</p>

          <h2>6. Your Rights</h2>
          <p>You have the right to access, correct, or request deletion of your data. To exercise these rights, contact us at support@insureclub.in</p>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)} 
        title="Terms & Conditions — Insure Club"
      >
        <div className="markdown-body">
          <p><strong>Effective Date:</strong> January 1, 2026</p>
          <p><strong>Last Updated:</strong> March 2026</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing our website or using our WhatsApp insurance service at +91 76038 00588, you agree to be legally bound by these Terms and Conditions. If you do not agree, please discontinue use immediately.</p>
          
          <h2>2. About Insure Club</h2>
          <p>Insure Club is an insurance facilitation platform that connects customers with IRDAI-registered insurance companies. Insure Club acts as an intermediary/facilitator and is not itself an insurance company.</p>
          
          <h2>3. Insurance Services</h2>
          <ul>
            <li>Insure Club facilitates Bike Insurance, Car Insurance, Health Insurance, and Life Insurance</li>
            <li>All quotes and policies are provided by IRDAI-registered partner insurance companies</li>
            <li>Premium amounts, coverage terms, and exclusions are governed by the respective insurer's policy document</li>
          </ul>

          <h2>4. ₹500 Cashback Offer — Terms</h2>
          <ul>
            <li>Applicable only to first-time Insure Club customers</li>
            <li>Valid on Bike, Car, Health, and Life Insurance policies purchased through Insure Club's WhatsApp service</li>
            <li>Maximum cashback: ₹500 per customer per policy</li>
            <li>Cashback will be credited within 15–30 working days after policy issuance</li>
            <li>Insure Club reserves the right to withdraw, modify, or cancel this offer at any time</li>
          </ul>

          <h2>5. User Responsibilities</h2>
          <p>Users agree to provide accurate and complete information. Providing false information to obtain insurance is a criminal offense under Indian law.</p>

          <h2>6. Governing Law</h2>
          <p>These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p>
        </div>
      </Modal>
    </div>
  );
}
