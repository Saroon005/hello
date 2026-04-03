import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Overlay from './Overlay'
import './ComfortOverlay.css'

const comfortItems = [
  { emoji: '🍫', label: 'Snacks' },
  { emoji: '☕', label: 'Hot chocolate' },
  { emoji: '🧣', label: 'Warm blanket' },
  { emoji: '🛌', label: 'Cozy pillow' },
  { emoji: '🕯️', label: 'Soft light' },
  { emoji: '🚫', label: 'Zero stress' },
]

export default function ComfortOverlay({ onClose, theme }) {
  const [phase, setPhase] = useState('loading') // loading -> building -> done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('building'), 1500)
    const t2 = setTimeout(() => setPhase('done'), 1500 + comfortItems.length * 400 + 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <Overlay onClose={onClose} theme={theme}>
      <div className="comfort-scene">
        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <motion.div
              key="loading"
              className="comfort-loading-scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated rings */}
              <div className="comfort-rings">
                <motion.div
                  className={`comfort-ring ring-1 ${theme === 'night' ? 'night' : ''}`}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className={`comfort-ring ring-2 ${theme === 'night' ? 'night' : ''}`}
                  animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.span className="comfort-center-emoji"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🧸
                </motion.span>
              </div>
              <motion.p
                className="comfort-loading-label"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                preparing your comfort zone…
              </motion.p>
            </motion.div>
          )}

          {(phase === 'building' || phase === 'done') && (
            <motion.div
              key="items"
              className="comfort-items-scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Items flying in one by one */}
              <div className="comfort-items-grid">
                {comfortItems.map((item, i) => (
                  <motion.div
                    key={item.emoji}
                    className={`comfort-item-card ${theme === 'night' ? 'night' : ''}`}
                    initial={{ opacity: 0, scale: 0, y: 30, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                    transition={{
                      type: 'spring', damping: 14, stiffness: 180,
                      delay: i * 0.35,
                    }}
                  >
                    <motion.span
                      className="comfort-item-emoji"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    >
                      {item.emoji}
                    </motion.span>
                    <span className="comfort-item-label">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Message after all items appear */}
              <AnimatePresence>
                {phase === 'done' && (
                  <motion.p
                    className="comfort-done-msg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    everything's ready — just rest, Bubba 🐼
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Overlay>
  )
}
