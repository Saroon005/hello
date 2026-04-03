import React, { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import LandingScreen from './components/LandingScreen'
import MainScreen from './components/MainScreen'
import BackgroundAnimation from './components/BackgroundAnimation'
import FloatingFeedback from './components/FloatingFeedback'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [theme, setTheme] = useState('day')
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    document.body.className = `${theme}-mode`
  }, [theme])

  useEffect(() => {
    document.body.className = 'day-mode'
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'day' ? 'night' : 'day')
  }, [])

  const handleScreenTap = useCallback((e) => {
    // Don't trigger on button/card clicks
    if (e.target.closest('button') || e.target.closest('.action-card') || e.target.closest('.theme-toggle')) return

    const id = Date.now() + Math.random()
    const x = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
    const y = e.clientY || (e.touches && e.touches[0]?.clientY) || 0

    setFeedbacks(prev => [...prev, { id, x, y }])

    setTimeout(() => {
      setFeedbacks(prev => prev.filter(f => f.id !== id))
    }, 2000)
  }, [])

  return (
    <div className="app-container" onClick={handleScreenTap}>
      <BackgroundAnimation theme={theme} />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <AnimatePresence mode="wait">
        {screen === 'landing' ? (
          <LandingScreen
            key="landing"
            theme={theme}
            onEnter={() => setScreen('main')}
          />
        ) : (
          <MainScreen
            key="main"
            theme={theme}
          />
        )}
      </AnimatePresence>

      {feedbacks.map(fb => (
        <FloatingFeedback key={fb.id} x={fb.x} y={fb.y} theme={theme} />
      ))}
    </div>
  )
}
