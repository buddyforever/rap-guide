import React, { useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoStandard from '../../images/logo-standard.jpg'
import logoEducator from '../../images/logo-educator.jpg'
import logoStudent from '../../images/logo-student.jpg'
import { UserContext } from '../../context/UserContext'

const variants = {
  show: { y: 0, opacity: 1 },
  exit: { display: "none", position: "absolute" }
}

const Logo = ({ alt }) => {

  const { user } = useContext(UserContext);

  const [logo, setLogo] = useState(logoStandard);

  useEffect(() => {
    if (user) {
      if (user.type === 'educator') {
        setLogo(logoEducator);
      }
      if (user.type === 'student') {
        setLogo(logoStudent);
      }
    }
  }, [user])

  return (
    <AnimatePresence>
      <div style={{ width: "200px" }}>
        <motion.img
          variants={variants}
          key={logo}
          initial={{ y: 3 }}
          animate="show"
          exit="exit"
          transition={{ duration: 0.5 }}
          src={logo} alt={alt}
        />
      </div>
    </AnimatePresence>
  )
}

export default Logo