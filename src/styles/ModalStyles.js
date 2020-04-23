import styled from 'styled-components'
import { motion } from "framer-motion"

export const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  padding: 2.5rem;
  z-index: 1050;
  left: 100%;
  min-height: 100vh;
  width: 50vw;
  background-color: white;
  border-left: 1px solid rgba(0,0,0,0.3);
  box-shadow: -10px 0 10px 0 rgba(0,0,0,0.3);
`