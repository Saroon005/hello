import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Overlay from './Overlay'
import './HugOverlay.css'

export default function HugOverlay({ onClose, theme }) {
  const [hugged, setHugged] = useState(false)

  return (
    <Overlay onClose={onClose} theme={theme}>
      <div className="hug-scene">
        {/* Floating hearts burst on hug */}
        <AnimatePresence>
          {hugged && (
            <>
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * 360
                const rad = (angle * Math.PI) / 180
                const dist = 60 + Math.random() * 40
                return (
                  <motion.span
                    key={`heart-${i}`}
                    className="hug-burst-heart"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0.6],
                      x: Math.cos(rad) * dist,
                      y: Math.sin(rad) * dist,
                    }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: i * 0.04 }}
                  >
                    {['💗', '💕', '🤍', '💖'][i % 4]}
                  </motion.span>
                )
              })}
            </>
          )}
        </AnimatePresence>

        {/* Characters approaching each other */}
        <div className="hug-characters">
          <motion.span
            className="hug-char"
            animate={hugged
              ? { x: 28, scale: 1.15, rotate: -8 }
              : { x: [0, 5, 0], scale: 1, rotate: 0 }
            }
            transition={hugged
              ? { type: 'spring', damping: 12, stiffness: 120 }
              : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            🧸
          </motion.span>

          <AnimatePresence>
            {hugged && (
              <motion.span
                className="hug-heart-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
              >
                💗
              </motion.span>
            )}
          </AnimatePresence>

          <motion.span
            className="hug-char"
            animate={hugged
              ? { x: -28, scale: 1.15, rotate: 8 }
              : { x: [0, -5, 0], scale: 1, rotate: 0 }
            }
            transition={hugged
              ? { type: 'spring', damping: 12, stiffness: 120 }
              : { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
            }
          >
            🐼
          </motion.span>
        </div>

        {/* Pulsing glow behind characters */}
        <AnimatePresence>
          {hugged && (
            <motion.div
              className={`hug-glow ${theme === 'night' ? 'night' : ''}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5], opacity: [0, 0.4, 0.2] }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        {/* Tap to hug or message */}
        <AnimatePresence mode="wait">
          {!hugged ? (
            <motion.button
              key="hug-btn"
              className={`hug-action-btn ${theme === 'night' ? 'night' : ''}`}
              onClick={() => setHugged(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileTap={{ scale: 0.92 }}
            >
              tap for a hug 🤗
            </motion.button>
          ) : (
            <motion.p
              key="hug-msg"
              className="hug-message"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              whatever happens, I'll always be with you
            </motion.p>
          )}
        </AnimatePresence>

        {/* Continuous gentle shimmer particles after hug */}
        {hugged && (
          <div className="hug-shimmer-particles">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`shimmer-${i}`}
                className="shimmer-particle"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0, 1, 0],
                  y: [0, -30],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Overlay>
  )
}
