'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../components/Home'
import Upload from '../components/Upload'
import Results from '../components/Results'
import About from '../components/About'
import Contact from '../components/Contact'
import LoadingOverlay from '../components/LoadingOverlay'
import { motion, AnimatePresence } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Page() {
  const [activeSection, setActiveSection] = useState('home')
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const handleUpload = async (file: File) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Server responded with an error')
      }

      const data = await response.json()
      setResult(data.predicted_class)
      setActiveSection('results')
      toast.success('Image successfully classified!')
    } catch (error) {
      console.error('Error:', error)
      setResult('Error occurred during prediction')
      toast.error('An error occurred during classification. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'home' && <Home setActiveSection={setActiveSection} />}
            {activeSection === 'upload' && <Upload onUpload={handleUpload} />}
            {activeSection === 'results' && <Results result={result} />}
            {activeSection === 'about' && <About />}
            {activeSection === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <LoadingOverlay isLoading={isLoading} />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  )
}
