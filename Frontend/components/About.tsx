'use client'

import { motion } from 'framer-motion'
import { Brain, Shield, Users } from 'lucide-react'

export default function About() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI',
      description: 'Utilizes state-of-the-art machine learning models for accurate skin disease classification.',
    },
    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'Your data is processed securely and never stored, ensuring your privacy is protected.',
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Designed with simplicity in mind, making it easy for anyone to use and understand results.',
    },
  ]

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-6 text-center">About This Project</h2>
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The Skin Disease Classifier is an advanced application that leverages cutting-edge machine learning technology
          to identify various skin conditions based on uploaded images.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our model has been meticulously trained on a diverse and extensive dataset of skin disease images, enabling it
          to recognize and classify a wide range of conditions with high accuracy.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          This project aims to empower both healthcare professionals and individuals by providing a tool for early
          detection and identification of skin diseases, potentially leading to faster diagnoses and treatment.
        </p>
        <p className="text-gray-700 dark:text-gray-300 font-semibold">
          While our classifier offers valuable insights, it should not be considered a substitute for professional
          medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.
        </p>
      </motion.div>
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
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 text-center">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

