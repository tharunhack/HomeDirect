'use client'
import { useState, useEffect } from 'react'
import { Menu, X, Zap, Moon, Sun } from 'lucide-react'

interface NavbarProps {
  onAuthClick: (intent?: 'buy' | 'sell' | 'general') => void
}

export default function Navbar({ onAuthClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)

    const stored = window.localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const activeTheme = stored || systemTheme
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(activeTheme)
    setTheme(activeTheme)

    return () => window.removeEventListener('scroll', handler)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(nextTheme)
    window.localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
  }

  const navLinks = [
    { label: 'Buy', href: '#buy' },
    { label: 'Rent', href: '#rent' },
    { label: 'Sell', href: '#sell' },
    { label: 'New Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
      scrolled ? 'bg-void/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-ember rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="font-black text-xl text-snow tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              Estate<span className="text-ember">X</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-silver hover:text-snow animated-link transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn-outline px-4 py-2 rounded-xl text-sm font-semibold"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} className="inline" /> : <Moon size={16} className="inline" />}
            </button>
            <button
              onClick={() => onAuthClick('general')}
              className="btn-outline px-4 py-2 rounded-xl text-sm font-semibold"
            >
              Sign In
            </button>
            <button
              onClick={() => onAuthClick('sell')}
              className="btn-ember px-4 py-2 rounded-xl text-sm font-bold relative z-10"
            >
              List Free
            </button>
          </div>

          {/* Mobile menu btn */}
          <button
            className="md:hidden p-2 text-silver hover:text-snow"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-panel border-t border-border">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-silver hover:text-snow hover:bg-white/5 rounded-xl text-sm transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileOpen(false);
                }}
                className="btn-outline py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                Theme
              </button>
              <button
                onClick={() => { onAuthClick('general'); setMobileOpen(false) }}
                className="btn-outline py-2.5 rounded-xl text-sm font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => { onAuthClick('sell'); setMobileOpen(false) }}
                className="btn-ember py-2.5 rounded-xl text-sm font-bold relative z-10"
              >
                List Free
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
