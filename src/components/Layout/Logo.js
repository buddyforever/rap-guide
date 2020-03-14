import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  show: { y: 0, opacity: 1 },
  exit: { display: "none", position: "absolute" }
}

const Logo = ({ src, alt }) => {
  return (
    <AnimatePresence>
      <div style={{ width: "200px" }}>
        <motion.img
          variants={variants}
          key={src}
          initial={{ y: 3 }}
          animate="show"
          exit="exit"
          transition={{ duration: 0.5 }}
          src={src} alt={alt}
        />
      </div>
    </AnimatePresence>
  )
}

export default Logo