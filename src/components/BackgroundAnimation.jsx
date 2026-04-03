import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import './BackgroundAnimation.css'

function generateBlobs(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 80 + Math.random() * 180,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 12 + Math.random() * 10,
    delay: Math.random() * 5,
    hue: Math.random() > 0.5 ? 'pink' : 'lavender',
  }))
}

function generateSparkles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 5,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 6,
  }))
}

export default function BackgroundAnimation({ theme }) {
  const blobs = useMemo(() => generateBlobs(6), [])
  const sparkles = useMemo(() => generateSparkles(12), [])

  return (
    <div className="bg-animation" aria-hidden="true">
      {/* Floating Blobs */}
      {blobs.map(blob => (
        <motion.div
          key={`blob-${blob.id}`}
          className={`bg-blob ${blob.hue} ${theme === 'night' ? 'night' : ''}`}
          style={{
            width: blob.size,
            height: blob.size,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
          }}
          animate={{
            x: [0, 30, -10, 20, 0],
            y: [0, -20, 20, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: blob.delay,
          }}
        />
      ))}

      {/* Floating Hearts */}
      {[...Array(4)].map((_, i) => (
        <motion.span
          key={`heart-${i}`}
          className={`bg-heart ${theme === 'night' ? 'night' : ''}`}
          style={{
            left: `${15 + i * 22}%`,
            top: `${20 + (i % 2) * 50}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, 10, -5, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        >
          ♡
        </motion.span>
      ))}

      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className={`bg-sparkle ${theme === 'night' ? 'night' : ''}`}
          style={{
            width: sparkle.size,
            height: sparkle.size,
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
