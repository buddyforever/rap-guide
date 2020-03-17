import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Tag = styled(motion.div)`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 1rem;
  font-size: ${props => props.size + 'rem'};
  background-color: #EEE;
  cursor: pointer;
`