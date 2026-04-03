import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ActionCard from './ActionCard'
import HugOverlay from './HugOverlay'
import ComfortOverlay from './ComfortOverlay'
import MessageOverlay from './MessageOverlay'
import VibesOverlay from './VibesOverlay'
import Footer from './Footer'
import './MainScreen.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const cards = [
  {
    id: 'hug',
    emoji: '🤗',
    title: 'Hug from Bobaa',
    subtitle: 'A warm, gentle embrace',
    gradient: 'linear-gradient(135deg, #FFDDE2 0%, #FFB8C6 100%)',
    nightGradient: 'linear-gradient(135deg, #3d2845 0%, #4a2d55 100%)',
  },
  {
    id: 'comfort',
    emoji: '🛌',
    title: 'Comfort Mode',
    subtitle: 'Snacks, blankets & zero stress',
    gradient: 'linear-gradient(135deg, #FFF5E1 0%, #FFE4C4 100%)',
    nightGradient: 'linear-gradient(135deg, #352d20 0%, #403525 100%)',
  },
  {
    id: 'message',
    emoji: '💌',
    title: 'Message from Bobaa',
    subtitle: 'Words just for you',
    gradient: 'linear-gradient(135deg, #E6E6FA 0%, #D4C4F0 100%)',
    nightGradient: 'linear-gradient(135deg, #2a2540 0%, #352d50 100%)',
  },
  {
    id: 'vibes',
    emoji: '🎵',
    title: 'Soft Vibes',
    subtitle: 'Quiet moments together',
    gradient: 'linear-gradient(135deg, #E0F0E8 0%, #C8E6D0 100%)',
    nightGradient: 'linear-gradient(135deg, #1e3028 0%, #253830 100%)',
  },
]

export default function MainScreen({ theme }) {
  const [activeOverlay, setActiveOverlay] = useState(null)

  const closeOverlay = () => setActiveOverlay(null)

  return (
    <motion.div
      className="main-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="main-header" variants={cardVariants}>
        <div className="header-emojis">
          <span className="header-teddy">🧸</span>
          <span className="header-heart">♡</span>
          <span className="header-panda">🐼</span>
        </div>
        <h1 className="main-title">What do you need right now?</h1>
        <p className="main-subtitle">Bobaa is here for whatever you feel</p>
      </motion.div>

      <div className="cards-grid">
        {cards.map((card) => (
          <motion.div key={card.id} variants={cardVariants}>
            <ActionCard
              card={card}
              theme={theme}
              onClick={() => setActiveOverlay(card.id)}
            />
          </motion.div>
        ))}
      </div>

      <motion.div variants={cardVariants}>
        <Footer theme={theme} />
      </motion.div>

      {/* Overlays */}
      {activeOverlay === 'hug' && <HugOverlay onClose={closeOverlay} theme={theme} />}
      {activeOverlay === 'comfort' && <ComfortOverlay onClose={closeOverlay} theme={theme} />}
      {activeOverlay === 'message' && <MessageOverlay onClose={closeOverlay} theme={theme} />}
      {activeOverlay === 'vibes' && <VibesOverlay onClose={closeOverlay} theme={theme} />}
    </motion.div>
  )
}
