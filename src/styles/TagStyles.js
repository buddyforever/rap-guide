import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Tag = styled(motion.div)`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 1rem;
  font-size: ${props => props.size + 'rem'};
  background-color: #EEE;
  cursor: pointer;

  .remove {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%,-50%);
    background: black;
    color: #EEE;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all .3s ease;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.4rem;
    transition: all .3s ease;

    &:hover {
      transform: translate(50%,-50%) scale(1.1);
    }
  }

  &:hover .remove {
    opacity: 1;
  }
`