'use client'
import { useState, useEffect, useRef } from 'react'
import {
  Search, MapPin, ArrowRight, TrendingUp, Users, Shield, Zap,
  Building2, Home, Building, ChevronDown, Star, Play,
  BarChart3, Clock, CheckCircle, Globe, Sparkles
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import AuthModal from '@/components/AuthModal'
import PropertyCard, { Property } from '@/components/PropertyCard'

const PROPERTIES: Property[] = [
  {
    id: 1, title: '3 BHK Premium Apartment in Koramangala', location: 'Koramangala 4th Block, Bangalore',
    price: '₹85L', priceLabel: 'onwards', beds: 3, baths: 2, sqft: 1450, type: 'Apartment',
    tag: 'For Sale', tagColor: 'rgba(255,77,28,0.9)', verified: true, ownerDirect: true,
    image: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)', views: 234
  },
  {
    id: 2, title: 'Luxury 2 BHK near Bandra Kurla Complex', location: 'BKC, Mumbai',
    price: '₹1.2Cr', priceLabel: 'negotiable', beds: 2, baths: 2, sqft: 1100, type: 'Apartment',
    tag: 'Hot Deal', tagColor: 'rgba(239,68,68,0.9)', verified: true, ownerDirect: true,
    image: 'linear-gradient(135deg, #0d1117 0%, #161b22 40%, #21262d 100%)', views: 512
  },
  {
    id: 3, title: 'Modern Studio near Cyber City', location: 'DLF Cyber City, Gurgaon',
    price: '₹28K', priceLabel: '/month', beds: 1, baths: 1, sqft: 650, type: 'Studio',
    tag: 'For Rent', tagColor: 'rgba(0,229,204,0.9)', verified: false, ownerDirect: true,
    image: 'linear-gradient(135deg, #071a0e 0%, #0d2818 40%, #1a3a25 100%)', views: 89
  },
  {
    id: 4, title: 'Independent Villa with Garden', location: 'Jubilee Hills, Hyderabad',
    price: '₹2.8Cr', priceLabel: 'fixed', beds: 4, baths: 3, sqft: 3200, type: 'Villa',
    tag: 'Premium', tagColor: 'rgba(168,85,247,0.9)', verified: true, ownerDirect: false,
    image: 'linear-gradient(135deg, #1a0a2e 0%, #2d1654 40%, #3d1a6e 100%)', views: 678
  },
  {
    id: 5, title: 'Sky Penthouse with Sea View', location: 'Marine Drive, Mumbai',
    price: '₹6.5Cr', priceLabel: 'negotiable', beds: 4, baths: 4, sqft: 4500, type: 'Penthouse',
    tag: 'Exclusive', tagColor: 'rgba(251,191,36,0.9)', verified: true, ownerDirect: true,
    image: 'linear-gradient(135deg, #0a1628 0%, #0e2040 40%, #1a3a5c 100%)', views: 1203
  },
  {
    id: 6, title: '2 BHK in New Residential Township', location: 'Whitefield, Bangalore',
    price: '₹65L', priceLabel: 'onwards', beds: 2, baths: 2, sqft: 1050, type: 'Apartment',
    tag: 'New Launch', tagColor: 'rgba(16,185,129,0.9)', verified: true, ownerDirect: true,
    image: 'linear-gradient(135deg, #0a1a0a 0%, #122012 40%, #1a2e1a 100%)', views: 345
  },
]

const CITIES = ['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad']
const STATS = [
  { label: 'Properties Listed', value: '14L+', icon: Building2, color: 'text-ember' },
  { label: 'Happy Owners', value: '8L+', icon: Users, color: 'text-aqua' },
  { label: 'Crores Saved', value: '₹4,200Cr', icon: TrendingUp, color: 'text-green-400' },
  { label: 'Cities Active', value: '800+', icon: Globe, color: 'text-purple-400' },
]

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authIntent, setAuthIntent] = useState<'buy' | 'sell' | 'general'>('general')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'buy' | 'rent' | 'sell'>('buy')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setTimeout(() => setCursorPos({ x: e.clientX, y: e.clientY }), 80)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const openAuth = (intent: 'buy' | 'sell' | 'general' = 'general') => {
    setAuthIntent(intent)
    setAuthOpen(true)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    openAuth(searchType as 'buy' | 'sell')
  }

  return (
    <div className="min-h-screen bg-void">
      {/* Custom cursor */}
      <div className="cursor-dot" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="cursor-ring" style={{ left: cursorPos.x, top: cursorPos.y }} />

      <Navbar onAuthClick={openAuth} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} intent={authIntent} />

      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        {/* Animated background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-morph"
          style={{ background: 'radial-gradient(circle, #FF4D1C, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl animate-morph"
          style={{ background: 'radial-gradient(circle, #00E5CC, transparent)', animationDelay: '4s' }} />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 rounded-full opacity-40"
            style={{
              background: i % 2 === 0 ? '#FF4D1C' : '#00E5CC',
              left: `${10 + i * 7.5}%`,
              top: `${20 + (i % 5) * 15}%`,
              '--duration': `${5 + i * 0.8}s`,
              '--delay': `${i * 0.4}s`,
            } as React.CSSProperties}
          />
        ))}

        {/* Scan line */}
        <div className="absolute left-0 right-0 h-px opacity-5 animate-scan"
          style={{ background: 'linear-gradient(90deg, transparent, #FF4D1C, transparent)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-ember/10 border border-ember/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
            <Sparkles size={14} className="text-ember" />
            <span className="text-xs text-ember font-semibold tracking-wider">ZERO BROKERAGE · ZERO COMMISSION · 100% REAL</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6 leading-none"
            style={{ fontFamily: 'Syne, sans-serif' }}>
            <span className="block text-snow">Find Your</span>
            <span className="block text-gradient glitch" data-text="Dream Space.">Dream Space.</span>
            <span className="block text-snow text-3xl sm:text-4xl lg:text-5xl font-medium mt-2 opacity-60">
              Without a Middleman.
            </span>
          </h1>

          {/* Sub */}
          <p className="text-silver text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect directly with owners. Save lakhs in brokerage. India's most intelligent property platform — built for 2026.
          </p>

          {/* Search card */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-panel/80 backdrop-blur-xl border border-border rounded-2xl p-2 shadow-2xl">
              {/* Type tabs */}
              <div className="flex gap-1 mb-3 p-1 bg-surface rounded-xl">
                {(['buy', 'rent', 'sell'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSearchType(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-200 ${
                      searchType === t
                        ? 'bg-ember text-white shadow-lg shadow-ember/30'
                        : 'text-muted hover:text-silver'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ember" />
                  <input
                    type="text"
                    placeholder="Search by city, locality, or landmark..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-dark w-full pl-10 pr-4 py-3.5 rounded-xl text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-ember px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 relative z-10 whitespace-nowrap"
                >
                  <Search size={16} />
                  Search
                </button>
              </form>

              {/* Popular cities */}
              <div className="flex flex-wrap gap-2 mt-3 px-1">
                <span className="text-xs text-muted">Popular:</span>
                {CITIES.slice(0, 6).map((city) => (
                  <button
                    key={city}
                    onClick={() => openAuth('buy')}
                    className="text-xs text-silver hover:text-ember transition-colors animated-link"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            {[
              { icon: CheckCircle, text: '14 Lakh+ listings', color: 'text-green-400' },
              { icon: Shield, text: 'Verified owners only', color: 'text-aqua' },
              { icon: Zap, text: 'Zero brokerage', color: 'text-ember' },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={14} className={color} />
                <span className="text-silver text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="text-muted" />
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="py-20 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ember/3 via-transparent to-aqua/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="text-center group">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 mb-4 group-hover:scale-110 transition-transform ${color}`}>
                  <Icon size={22} />
                </div>
                <div className={`text-3xl lg:text-4xl font-black mb-1 ${color}`}
                  style={{ fontFamily: 'Syne, sans-serif' }}>
                  {value}
                </div>
                <div className="text-silver text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROPERTY LISTINGS ═══════════ */}
      <section id="buy" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-ember" />
                <span className="text-xs text-ember font-semibold tracking-widest uppercase">Featured</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-snow" style={{ fontFamily: 'Syne, sans-serif' }}>
                Properties You'll Love
              </h2>
              <p className="text-silver mt-2 text-sm">Direct from verified owners — no broker in the middle</p>
            </div>
            <button
              onClick={() => openAuth('buy')}
              className="flex items-center gap-2 text-ember text-sm font-semibold animated-link self-start sm:self-auto"
            >
              View all listings <ArrowRight size={16} />
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Apartment', 'Villa', 'Penthouse', 'Studio', 'Plot'].map((f) => (
              <button
                key={f}
                onClick={() => f !== 'All' && openAuth('buy')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  f === 'All'
                    ? 'bg-ember text-white'
                    : 'bg-panel border border-border text-silver hover:border-ember/40 hover:text-snow'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROPERTIES.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onContactClick={() => openAuth('buy')}
              />
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-12">
            <button
              onClick={() => openAuth('buy')}
              className="btn-outline px-8 py-4 rounded-2xl font-bold inline-flex items-center gap-2"
            >
              Load More Properties <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-24 bg-surface border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-aqua" />
              <span className="text-xs text-aqua font-semibold tracking-widest uppercase">Process</span>
              <div className="w-8 h-0.5 bg-aqua" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-snow" style={{ fontFamily: 'Syne, sans-serif' }}>
              How EstateX Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-ember via-aqua to-ember opacity-30" />

            {[
              {
                step: '01',
                icon: Search,
                title: 'Search & Discover',
                desc: 'Browse thousands of verified listings with smart filters. AI-powered matching suggests properties that fit your lifestyle.',
                color: '#FF4D1C',
              },
              {
                step: '02',
                icon: Users,
                title: 'Connect Directly',
                desc: 'Message or call property owners without any middleman. Real-time chat, virtual tours, and instant scheduling.',
                color: '#00E5CC',
              },
              {
                step: '03',
                icon: CheckCircle,
                title: 'Close the Deal',
                desc: 'Digital agreements, legal assistance, and end-to-end paperwork support. Move in with zero stress.',
                color: '#A855F7',
              },
            ].map(({ step, icon: Icon, title, desc, color }) => (
              <div key={step} className="relative group text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 mx-auto"
                  style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
                  <Icon size={28} style={{ color }} />
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-void"
                    style={{ background: color }}>
                    {step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-snow mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
                <p className="text-silver text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SELL CTA ═══════════ */}
      <section id="sell" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-ember/20 via-panel to-aqua/10" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ember to-transparent" />

            {/* Floating shapes */}
            <div className="absolute right-10 top-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
              style={{ background: 'radial-gradient(#FF4D1C, transparent)' }} />

            <div className="relative p-8 sm:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-0.5 bg-ember" />
                  <span className="text-xs text-ember font-semibold tracking-widest uppercase">For Owners</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-snow leading-tight mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Sell or Rent <br />
                  <span className="text-gradient-ember">Without Paying</span> <br />
                  a Single Rupee.
                </h2>
                <p className="text-silver leading-relaxed mb-6">
                  List your property for free and connect with thousands of genuine buyers and tenants. Our AI-powered platform does the heavy lifting — you just close the deal.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Free listing', 'AI-powered reach', 'Legal support', 'Virtual tours'].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-ember/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                      </div>
                      <span className="text-silver text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full lg:w-auto">
                <button
                  onClick={() => openAuth('sell')}
                  className="btn-ember px-10 py-5 rounded-2xl text-lg font-black flex items-center gap-3 justify-center relative z-10"
                >
                  <Zap size={20} fill="white" />
                  List Property Free
                </button>
                <button
                  onClick={() => openAuth('sell')}
                  className="btn-outline px-10 py-5 rounded-2xl text-lg font-bold flex items-center gap-3 justify-center"
                >
                  <BarChart3 size={20} />
                  Get Free Valuation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" className="py-24 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-ember" />
              <span className="text-xs text-ember font-semibold tracking-widest uppercase">Services</span>
              <div className="w-8 h-0.5 bg-ember" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-snow" style={{ fontFamily: 'Syne, sans-serif' }}>
              Everything You Need
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Building2, label: 'Home Loans', color: '#FF4D1C', bg: '#FF4D1C15' },
              { icon: Shield, label: 'Legal Help', color: '#00E5CC', bg: '#00E5CC15' },
              { icon: Clock, label: 'Packers & Movers', color: '#A855F7', bg: '#A855F715' },
              { icon: Home, label: 'Interior Design', color: '#F59E0B', bg: '#F59E0B15' },
              { icon: BarChart3, label: 'Valuation', color: '#10B981', bg: '#10B98115' },
              { icon: Building, label: 'Rent Agreement', color: '#3B82F6', bg: '#3B82F615' },
            ].map(({ icon: Icon, label, color, bg }) => (
              <button
                key={label}
                onClick={() => openAuth('general')}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border hover:border-opacity-50 transition-all duration-300 group card-glow"
                style={{ background: bg, borderColor: color + '30' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: color + '20' }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <span className="text-xs text-silver font-semibold text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-aqua" />
              <span className="text-xs text-aqua font-semibold tracking-widest uppercase">Reviews</span>
              <div className="w-8 h-0.5 bg-aqua" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-snow" style={{ fontFamily: 'Syne, sans-serif' }}>
              Real People, Real Savings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Priya Sharma',
                city: 'Bangalore',
                saved: '₹1.8L',
                text: 'Found my dream 3BHK in Whitefield directly from the owner. Saved a fortune in brokerage and the whole process was incredibly smooth.',
                rating: 5,
                role: 'Software Engineer',
              },
              {
                name: 'Arjun Mehta',
                city: 'Mumbai',
                saved: '₹3.2L',
                text: 'Listed my apartment and got genuine inquiries within 48 hours. Rented it out without paying a single rupee to any broker. Game changer!',
                rating: 5,
                role: 'Property Owner',
              },
              {
                name: 'Kavya Nair',
                city: 'Hyderabad',
                saved: '₹90K',
                text: 'The AI-powered property matching is insane. It suggested properties that perfectly matched my budget and lifestyle. Highly recommended!',
                rating: 5,
                role: 'Marketing Manager',
              },
            ].map(({ name, city, saved, text, rating, role }) => (
              <div key={name} className="bg-panel border border-border rounded-2xl p-6 card-glow relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ember to-transparent opacity-50" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-ember fill-ember" />
                  ))}
                </div>

                <p className="text-silver text-sm leading-relaxed mb-5">"{text}"</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-ember/10 flex items-center justify-center">
                      <span className="text-ember font-bold text-sm">{name[0]}</span>
                    </div>
                    <div>
                      <p className="text-snow font-semibold text-sm">{name}</p>
                      <p className="text-muted text-xs">{role} · {city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-black text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>{saved}</p>
                    <p className="text-muted text-xs">saved</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ APP DOWNLOAD ═══════════ */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-ember/10 rounded-2xl mb-6">
            <Play size={28} className="text-ember" fill="#FF4D1C" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-snow mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            EstateX on Your Phone
          </h2>
          <p className="text-silver mb-8 max-w-xl mx-auto">
            AR-powered property tours, instant owner chat, smart price alerts — all in your pocket.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => openAuth('general')}
              className="btn-ember px-6 py-3 rounded-xl font-bold flex items-center gap-2 relative z-10">
              📱 Download on iOS
            </button>
            <button onClick={() => openAuth('general')}
              className="btn-outline px-6 py-3 rounded-xl font-bold flex items-center gap-2">
              🤖 Download on Android
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-ember rounded-lg flex items-center justify-center">
                  <Zap size={16} className="text-white" fill="white" />
                </div>
                <span className="font-black text-xl text-snow" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Estate<span className="text-ember">X</span>
                </span>
              </div>
              <p className="text-silver text-sm leading-relaxed max-w-xs">
                India's most advanced zero-brokerage real estate platform. Connecting owners and seekers directly since 2024.
              </p>
            </div>

            {[
              { title: 'Buy', links: ['Apartments', 'Villas', 'Plots', 'New Projects', 'Commercial'] },
              { title: 'Rent', links: ['1 BHK', '2 BHK', '3 BHK', 'Studio', 'PG/Hostel'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-snow font-bold mb-4 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => openAuth('general')}
                        className="text-muted hover:text-silver text-sm transition-colors animated-link"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted text-xs">© 2026 EstateX Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-4">
              {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((link) => (
                <button key={link} onClick={() => openAuth('general')}
                  className="text-muted hover:text-silver text-xs transition-colors">
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
