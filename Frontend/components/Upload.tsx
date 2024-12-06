'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { UploadIcon, X } from 'lucide-react'

interface UploadProps {
  onUpload: (file: File) => void
}

export default function Upload({ onUpload }: UploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-6 text-center">Upload Your Image</h2>
      <motion.div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 dark:bg-gray-800 dark:border-purple-600 hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
          isDragActive ? 'border-purple-500 dark:border-purple-400' : ''
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <UploadIcon className="w-10 h-10 mb-3 text-purple-400" />
        <p className="mb-2 text-sm text-purple-500 dark:text-purple-400">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-purple-500 dark:text-purple-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
      </motion.div>
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="mt-4 relative"
          >
            <img src={previewUrl} alt="Preview" className="mx-auto max-w-full h-auto rounded-lg shadow-md" />
            <motion.button
              onClick={handleClear}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {selectedFile && (
        <motion.button
          onClick={handleUpload}
          className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Upload and Classify
        </motion.button>
      )}
    </motion.div>
  )
}

