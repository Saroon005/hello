import React from 'react'
import { motion } from 'framer-motion'
import './ThemeToggle.css'

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <motion.button
      className={`theme-toggle ${theme === 'night' ? 'night' : ''}`}
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      aria-label={`Switch to ${theme === 'day' ? 'night' : 'day'} mode`}
      title={`Switch to ${theme === 'day' ? 'night' : 'day'} mode`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'day' ? '🌙' : '☀️'}
      </motion.span>
    </motion.button>
  )
}
