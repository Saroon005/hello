import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer({ theme }) {
  return (
    <motion.footer
      className={`app-footer ${theme === 'night' ? 'night' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <div className="footer-status">
        <div className="status-item">
          <span className="status-dot needs-care"></span>
          <span>Kuchhhpuchhhhh 🐼 — needs care</span>
        </div>
        <div className="status-divider">·</div>
        <div className="status-item">
          <span className="status-dot available"></span>
          <span>Bobaa 🧸 — always available ❤️</span>
        </div>
      </div>
    </motion.footer>
  )
}
