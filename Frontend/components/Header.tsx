'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sun, Moon } from 'lucide-react'

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export default function Header({ activeSection, setActiveSection, theme, toggleTheme }: HeaderProps) {
  const navItems = [
    { name: 'Home', section: 'home' },
    { name: 'Upload', section: 'upload' },
    { name: 'About', section: 'about' },
    { name: 'Contact', section: 'contact' },
  ]

  return (
    <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-10`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <motion.h1
            className={`text-3xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Skin Disease Classifier
          </motion.h1>
          <nav className="flex items-center">
            <ul className="flex space-x-4 mr-4">
              {navItems.map((item) => (
                <motion.li key={item.section} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`#${item.section}`}
                    className={`text-lg ${
                      activeSection === item.section
                        ? theme === 'dark'
                          ? 'text-purple-400 font-semibold'
                          : 'text-purple-600 font-semibold'
                        : theme === 'dark'
                        ? 'text-gray-300'
                        : 'text-gray-600'
                    } hover:text-purple-500 transition-colors duration-200`}
                    onClick={() => setActiveSection(item.section)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  )
}

