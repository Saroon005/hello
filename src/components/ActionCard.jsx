import React from 'react'
import { motion } from 'framer-motion'
import './ActionCard.css'

export default function ActionCard({ card, theme, onClick }) {
  const bg = theme === 'night' ? card.nightGradient : card.gradient

  return (
    <motion.button
      className="action-card"
      style={{ background: bg }}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.96 }}
      id={`card-${card.id}`}
    >
      <span className="card-emoji">{card.emoji}</span>
      <span className="card-title">{card.title}</span>
      <span className="card-subtitle">{card.subtitle}</span>
    </motion.button>
  )
}
