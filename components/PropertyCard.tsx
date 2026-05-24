'use client'
import { useState } from 'react'
import { Heart, MapPin, Bed, Bath, Maximize, Zap, Eye } from 'lucide-react'

interface Property {
  id: number
  title: string
  location: string
  price: string
  priceLabel: string
  beds: number
  baths: number
  sqft: number
  type: 'Apartment' | 'Villa' | 'Penthouse' | 'Studio'
  tag: string
  tagColor: string
  verified: boolean
  ownerDirect: boolean
  image: string
  views: number
}

interface PropertyCardProps {
  property: Property
  onContactClick: () => void
}

export default function PropertyCard({ property, onContactClick }: PropertyCardProps) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="card-glow bg-panel border border-border rounded-2xl overflow-hidden group cursor-pointer"
      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-surface">
        {/* Placeholder gradient image */}
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: property.image }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className="tag text-white"
            style={{ background: property.tagColor }}
          >
            {property.tag}
          </span>
          {property.ownerDirect && (
            <span className="tag bg-aqua/20 text-aqua border border-aqua/30">
              Owner Direct
            </span>
          )}
        </div>

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
            liked
              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'bg-black/40 text-silver hover:text-white border border-white/10'
          }`}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>

        {/* Verified badge */}
        {property.verified && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-semibold">Verified Owner</span>
          </div>
        )}

        {/* View count */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Eye size={11} className="text-silver" />
          <span className="text-xs text-silver">{property.views}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-2xl font-black text-snow" style={{ fontFamily: 'Syne, sans-serif' }}>
              {property.price}
            </span>
            <span className="text-xs text-muted ml-1">{property.priceLabel}</span>
          </div>
          <span className="text-xs text-silver bg-surface px-2 py-1 rounded-lg border border-border">
            {property.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-snow text-sm mb-1 line-clamp-1">{property.title}</h3>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={12} className="text-ember flex-shrink-0" />
          <span className="text-xs text-silver truncate">{property.location}</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-3" />

        {/* Specs */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <Bed size={14} className="text-muted" />
            <span className="text-xs text-silver">{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={14} className="text-muted" />
            <span className="text-xs text-silver">{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize size={14} className="text-muted" />
            <span className="text-xs text-silver">{property.sqft} sqft</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onContactClick}
          className="btn-ember w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 relative z-10"
        >
          <Zap size={14} fill="white" />
          Contact Owner
        </button>
      </div>
    </div>
  )
}

export type { Property }
