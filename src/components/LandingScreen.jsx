import React from 'react'
import { motion } from 'framer-motion'
import './LandingScreen.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.6, ease: 'easeInOut' }
  }
}

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 1.2 }
  }
}

export default function LandingScreen({ theme, onEnter }) {
  return (
    <motion.div
      className="landing-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="landing-content">
        <motion.div className="landing-emoji-row" variants={childVariants}>
          <span className="landing-emoji teddy-float">🧸</span>
          <span className="landing-heart">💕</span>
          <span className="landing-emoji panda-float">🐼</span>
        </motion.div>

        <motion.h1 className="landing-title" variants={childVariants}>
          Hey Bubba <span className="inline-emoji">🐼</span>…
        </motion.h1>

        <motion.p className="landing-subtitle" variants={childVariants}>
          Bobaa <span className="inline-emoji">🧸</span> is here.
        </motion.p>

        <motion.p className="landing-message" variants={childVariants}>
          You don't have to be strong today.
        </motion.p>

        <motion.div className="landing-divider" variants={childVariants}>
          <span></span>
          <span className="divider-heart">♡</span>
          <span></span>
        </motion.div>

        <motion.button
          className={`enter-button ${theme === 'night' ? 'night' : ''}`}
          variants={buttonVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          id="enter-soft-mode"
        >
          <span className="button-glow"></span>
          <span className="button-text">Enter Soft Mode</span>
          <span className="button-icon">🌸</span>
        </motion.button>

        <motion.p className="landing-footer-hint" variants={childVariants}>
          a quiet space, just for you
        </motion.p>
      </div>
    </motion.div>
  )
}
