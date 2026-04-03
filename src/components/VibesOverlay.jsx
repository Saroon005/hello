import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Overlay from './Overlay'
import './VibesOverlay.css'

const bars = 12

export default function VibesOverlay({ onClose, theme }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const iframeRef = useRef(null)
  const playerReadyRef = useRef(false)

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)
    }
  }, [])

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleClose = () => {
    setIsPlaying(false)
    onClose()
  }

  return (
    <Overlay onClose={handleClose} theme={theme}>
      <div className="vibes-scene">
        {/* Music visualizer bars — animated when playing */}
        <div className="vibes-visualizer">
          {[...Array(bars)].map((_, i) => (
            <motion.div
              key={i}
              className={`vibes-bar ${theme === 'night' ? 'night' : ''}`}
              animate={isPlaying ? {
                height: [
                  8 + Math.random() * 10,
                  20 + Math.random() * 30,
                  10 + Math.random() * 15,
                  25 + Math.random() * 25,
                  8 + Math.random() * 10,
                ],
              } : {
                height: [6, 10, 6],
              }}
              transition={{
                duration: isPlaying ? (1.5 + Math.random() * 0.5) : 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.08,
              }}
            />
          ))}
        </div>

        {/* Animated scene */}
        <div className="vibes-together">
          <motion.span
            className="vibes-teddy"
            animate={{ y: [0, -6, 0], rotate: [0, -3, 0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🧸
          </motion.span>

          {/* Music notes floating between — more active when playing */}
          <div className="vibes-notes-stream">
            {['♪', '♫', '♬', '♩', '♪'].map((note, i) => (
              <motion.span
                key={i}
                className={`vibes-note-float ${theme === 'night' ? 'night' : ''}`}
                animate={{
                  y: [10, -30],
                  x: [-5 + Math.random() * 10, 5 + Math.random() * 10],
                  opacity: isPlaying ? [0, 1, 0] : [0, 0.5, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: isPlaying ? (1.5 + Math.random()) : (2.5 + Math.random()),
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeOut',
                }}
              >
                {note}
              </motion.span>
            ))}
          </div>

          <motion.span
            className="vibes-panda"
            animate={{ y: [0, -6, 0], rotate: [0, 3, 0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            🐼
          </motion.span>
        </div>

        {/* Pulsing warmth glow */}
        <motion.div
          className={`vibes-glow ${theme === 'night' ? 'night' : ''}`}
          animate={{
            scale: isPlaying ? [1, 1.25, 1] : [1, 1.15, 1],
            opacity: isPlaying ? [0.2, 0.4, 0.2] : [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Play button or Now Playing */}
        <AnimatePresence mode="wait">
          {!isPlaying ? (
            <motion.button
              key="play-btn"
              className={`vibes-play-btn ${theme === 'night' ? 'night' : ''}`}
              onClick={handlePlay}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
            >
              <span className="play-icon">▶</span>
              <span>Play Gehra Hua</span>
            </motion.button>
          ) : (
            <motion.div
              key="now-playing"
              className="vibes-now-playing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="now-playing-label">
                <motion.span
                  className="now-playing-dot"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span>Now Playing</span>
              </div>
              <p className="now-playing-song">Gehra Hua — Arijit Singh</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* YouTube embed (hidden visually, audio only) */}
        {isPlaying && (
          <div className="vibes-yt-container">
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/GX9x62kFsVU?autoplay=1&loop=1&playlist=GX9x62kFsVU&controls=1&modestbranding=1&rel=0&showinfo=0"
              title="Gehra Hua - Arijit Singh"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="vibes-yt-iframe"
            />
          </div>
        )}

        {/* Soft message */}
        <motion.p
          className="vibes-msg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Bobaa is sitting quietly with you 🧸
        </motion.p>
      </div>
    </Overlay>
  )
}
