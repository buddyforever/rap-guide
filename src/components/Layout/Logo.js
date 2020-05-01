import React, { useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoStandard from '../../images/logo-standard.jpg'
import logoEducator from '../../images/logo-educator.jpg'
import logoStudent from '../../images/logo-student.jpg'
import { UserContext } from '../../context/UserContext'

const defaultVariants = {
  initial: { y: 3, opacity: 0 },
  show: { y: 0, opacity: 1 },
  exit: { display: "none", position: "absolute" }
}

const Logo = ({ alt, width = "200px", variants = defaultVariants, id = "logo", ...rest }) => {

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
      <div style={{ width: width }}>
        <motion.img
          variants={variants}
          key={id}
          initial="initial"
          animate="show"
          exit="exit"
          src={logo}
          alt={alt}
          style={{ width: "100%" }}
          {...rest}
        />
      </div>
    </AnimatePresence>
  )
}

export default Logo