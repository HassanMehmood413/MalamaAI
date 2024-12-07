'use client'

import { motion } from 'framer-motion'
import { Upload, Search, Shield, Brain, Activity, Users, Award, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import photo from '../svgs/front.png'

interface HomeProps {
  setActiveSection: (section: string) => void
}

export default function Home({ setActiveSection }: HomeProps) {
  const stats = [
    { number: '99%', label: 'Accuracy Rate' },
    { number: '1M+', label: 'Users Worldwide' },
    { number: '24/7', label: 'Support Available' },
    { number: '50+', label: 'Disease Types' }
  ]

  const benefits = [
    { title: 'Early Detection', description: 'Identify potential skin conditions in their early stages' },
    { title: 'Expert Insights', description: 'Get detailed information about detected conditions' },
    { title: 'Quick Results', description: 'Receive analysis results within seconds' },
    { title: 'Secure Platform', description: 'Your privacy and data security are our top priority' }
  ]

  const features = [
    { icon: Upload, title: 'Easy Upload', description: 'Simply drag and drop or select your skin image' },
    { icon: Search, title: 'AI-Powered Analysis', description: 'Advanced machine learning model for accurate classification' },
    { icon: Shield, title: 'Privacy First', description: 'Your data is securely processed and never stored' },
  ]

  return (
    <motion.div
      className="text-center space-y-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-700 dark:text-purple-400">
          Welcome to the Skin Disease Classifier
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Upload an image of a skin condition, and our advanced AI will help identify potential diseases.
        </p>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stat.number}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        className="relative mx-auto w-full max-w-2xl h-64"
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

      {/* Benefits Section */}
      <motion.div
        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-800 dark:text-white">{benefit.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Upload Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="#upload" passHref>
          <motion.button
            onClick={() => setActiveSection('upload')}
            className="bg-purple-600 text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-purple-700 
                       transition-colors duration-200 shadow-md inline-flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
