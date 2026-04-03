import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Overlay.css'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2, duration: 0.3 } }
}

const contentVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.3 }
  }
}

export default function Overlay({ children, onClose, theme }) {
  return (
    <motion.div
      className={`overlay-backdrop ${theme === 'night' ? 'night' : ''}`}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className={`overlay-content glass-card ${theme === 'night' ? 'night' : ''}`}
        variants={contentVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="overlay-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        {children}
      </motion.div>
    </motion.div>
  )
}
