import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Overlay from './Overlay'
import './MessageOverlay.css'

const words = "whatever happens, I'll always be right here with you"

export default function MessageOverlay({ onClose, theme }) {
  const [charIndex, setCharIndex] = useState(0)
  const [showHeart, setShowHeart] = useState(false)

  useEffect(() => {
    if (charIndex < words.length) {
      const timer = setTimeout(() => {
        setCharIndex(prev => prev + 1)
      }, 55)
      return () => clearTimeout(timer)
    } else {
      const t = setTimeout(() => setShowHeart(true), 400)
      return () => clearTimeout(t)
    }
  }, [charIndex])

  const displayed = words.slice(0, charIndex)

  return (
    <Overlay onClose={onClose} theme={theme}>
      <div className="msg-scene">
        {/* Animated envelope opening */}
        <motion.div
          className="msg-envelope"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 160 }}
        >
          <motion.span
            className="msg-envelope-emoji"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            💌
          </motion.span>
        </motion.div>

        {/* Typewriter text */}
        <div className="msg-typewriter-wrap">
          <motion.p
            className="msg-typewriter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {displayed}
            {charIndex < words.length && (
              <span className="msg-cursor">|</span>
            )}
          </motion.p>
        </div>

        {/* Heart reveal after message completes */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              className="msg-heart-reveal"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 150 }}
            >
              {/* Orbiting hearts */}
              <div className="msg-orbit">
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="msg-orbit-heart"
                    style={{
                      '--orbit-delay': `${i * -1.5}s`,
                      '--orbit-size': `${55 + i * 5}px`,
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    {['♡', '♥', '💕', '♡', '♥', '💗'][i]}
                  </motion.span>
                ))}
              </div>

              <motion.span
                className="msg-big-heart"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                🧸❤️🐼
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating sparkle dots */}
        <div className="msg-sparkles">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={`msg-sparkle ${theme === 'night' ? 'night' : ''}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </Overlay>
  )
}
