import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './FloatingFeedback.css'

const messages = [
  'Bobaa stayed closer 🧸',
  'You are loved 💕',
  'Bubba is cherished 🐼',
  'Always right here 🤍',
  'Warm thoughts sent 🌸',
  'Gentle hug incoming 🧸',
]

export default function FloatingFeedback({ x, y, theme }) {
  const [message] = useState(
    () => messages[Math.floor(Math.random() * messages.length)]
  )

  return (
    <>
      {/* Ripple effect */}
      <motion.div
        className={`tap-ripple ${theme === 'night' ? 'night' : ''}`}
        style={{ left: x, top: y }}
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Floating message */}
      <motion.div
        className={`floating-message ${theme === 'night' ? 'night' : ''}`}
        style={{ left: x, top: y }}
        initial={{ opacity: 0, y: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 1, 0], y: -60, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        {message}
      </motion.div>
    </>
  )
}
