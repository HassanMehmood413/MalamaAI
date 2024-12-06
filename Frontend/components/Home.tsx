'use client'

import { motion } from 'framer-motion'
import { Upload, Search, Shield } from 'lucide-react'
import Link from 'next/link'
import photo from '../svgs/front.png'


interface HomeProps {
  setActiveSection: (section: string) => void
}

export default function Home({ setActiveSection }: HomeProps) {
  const features = [
    { icon: Upload, title: 'Easy Upload', description: 'Simply drag and drop or select your skin image' },
    { icon: Search, title: 'AI-Powered Analysis', description: 'Advanced machine learning model for accurate classification' },
    { icon: Shield, title: 'Privacy First', description: 'Your data is securely processed and never stored' },
  ]

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-6">Welcome to the Skin Disease Classifier</h2>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
        Upload an image of a skin condition, and our advanced AI will help identify potential diseases.
      </p>
      <motion.div
        className="relative mx-auto w-full max-w-2xl h-64 mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg shadow-lg transform -rotate-6"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-400 rounded-lg shadow-lg transform rotate-3"></div>
        <img
          src={photo.src}
          alt="Skin Disease Classification"
          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link href="#upload" passHref>
          <motion.button
            onClick={() => setActiveSection('upload')}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors duration-200 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Image
          </motion.button>
        </Link>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <feature.icon className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

