'use client'
import { useState } from 'react'
import { X, Phone, Mail, Lock, User, ArrowRight, CheckCircle, Sparkles, Shield, Zap } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  intent?: 'buy' | 'sell' | 'general'
}

export default function AuthModal({ isOpen, onClose, intent = 'general' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'payment'>('login')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const intentMessages = {
    buy: { title: 'Access Premium Listings', sub: 'Connect directly with property owners — zero brokerage' },
    sell: { title: 'List Your Property', sub: 'Reach lakhs of genuine buyers — completely free to list' },
    general: { title: 'Join EstateX', sub: 'India\'s smartest property platform' },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    if (mode === 'login') {
      setSuccess(true)
      setTimeout(() => { setSuccess(false); onClose() }, 2000)
    } else {
      setMode('payment')
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
    setTimeout(() => { setSuccess(false); onClose() }, 2500)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 modal-backdrop bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-slide-up">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-ember via-aqua to-ember rounded-2xl opacity-20 blur-xl animate-pulse-slow" />

        <div className="relative bg-panel border border-border rounded-2xl overflow-hidden">
          {/* Top accent line */}
          <div className="h-0.5 bg-gradient-to-r from-transparent via-ember to-transparent" />

          {/* Header */}
          <div className="p-6 pb-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted hover:text-snow hover:bg-white/5 transition-all"
            >
              <X size={18} />
            </button>

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-snow mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {mode === 'payment' ? 'Welcome to EstateX!' : 'Login Successful!'}
                </h3>
                <p className="text-silver text-sm">
                  {mode === 'payment' ? 'Your ₹1,000 membership is active. Happy house hunting!' : 'Redirecting you now...'}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-ember/10 rounded-lg flex items-center justify-center">
                    <Sparkles size={16} className="text-ember" />
                  </div>
                  <span className="text-xs text-ember font-semibold tracking-widest uppercase">EstateX</span>
                </div>

                {mode === 'payment' ? (
                  <>
                    <h2 className="text-2xl font-bold text-snow mt-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                      One-Time Membership
                    </h2>
                    <p className="text-silver text-sm mt-1">Unlock full platform access forever</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-snow mt-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                      {intentMessages[intent].title}
                    </h2>
                    <p className="text-silver text-sm mt-1">{intentMessages[intent].sub}</p>
                  </>
                )}
              </>
            )}
          </div>

          {!success && (
            <div className="px-6 pb-6">
              {mode !== 'payment' ? (
                <>
                  {/* Tab switcher */}
                  <div className="flex bg-surface rounded-xl p-1 mb-6 border border-border">
                    {(['login', 'signup'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setMode(tab)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          mode === tab
                            ? 'bg-ember text-white shadow-lg shadow-ember/30'
                            : 'text-muted hover:text-silver'
                        }`}
                      >
                        {tab === 'login' ? 'Sign In' : 'Sign Up'}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="input-dark w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                          required
                        />
                      </div>
                    )}
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="input-dark w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                        required
                      />
                    </div>
                    {mode === 'signup' && (
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="input-dark w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                          required
                        />
                      </div>
                    )}
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        className="input-dark w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-ember w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 relative z-10"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          {mode === 'login' ? 'Sign In' : 'Create Account'}
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-muted text-xs">or continue with</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <button className="mt-4 w-full py-3 rounded-xl border border-border text-sm text-silver hover:border-ember/40 hover:text-snow transition-all flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                </>
              ) : (
                /* Payment Screen */
                <>
                  {/* Plan card */}
                  <div className="bg-surface border border-ember/20 rounded-xl p-4 mb-6 shine-effect">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-ember font-semibold tracking-widest uppercase">EstateX Pro</p>
                        <p className="text-snow font-bold text-lg mt-0.5" style={{ fontFamily: 'Syne, sans-serif' }}>Lifetime Access</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-ember" style={{ fontFamily: 'Syne, sans-serif' }}>₹1,000</p>
                        <p className="text-xs text-muted">one-time only</p>
                      </div>
                    </div>
                    <div className="h-px bg-border mb-3" />
                    <div className="space-y-2">
                      {[
                        'Zero brokerage on all transactions',
                        'Direct owner contact — unlimited',
                        'Priority listings & smart alerts',
                        'Legal document assistance',
                      ].map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-ember/10 flex items-center justify-center flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                          </div>
                          <span className="text-silver text-xs">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1.5">
                      <Shield size={12} className="text-aqua" />
                      <span className="text-xs text-silver">256-bit SSL</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap size={12} className="text-ember" />
                      <span className="text-xs text-silver">Instant activation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-green-400" />
                      <span className="text-xs text-silver">Refund guarantee</span>
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Name on Card"
                      className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                      required
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-ember w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 relative z-10"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Pay ₹1,000 & Activate
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-center text-muted text-xs mt-3">
                    Secured by Razorpay · UPI · Net Banking accepted
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
