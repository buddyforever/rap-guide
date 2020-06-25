import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Form = styled.form`
  h3 {
    margin-bottom: 1rem;
  }
  p {
      margin-bottom: 1rem;
  }
`

export const Select = styled.select`
  border-color: #CCCCCC;
`

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 1.6rem;
  padding: 1.5rem 1rem;
  border: 1px solid black;
  border-radius: 2px;
`

export const FormBlock = styled.div`
  margin: ${props => props.space || "5rem"} 0;

  input[type=text],
  input[type=number],
  input[type=email],
  input[type=password],
  input[type=search],
  select,
  textarea
  {
    width: 100%;
    font-size: 1.6rem;
    padding: 1.5rem 1rem;
    border: 1px solid black;
    border-radius: 2px;
    border-color: #CCCCCC;
    outline: none;
  }

  textarea {
    min-height: 15rem;
  }
`

export const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2.5rem;
  margin-top: 5rem;

  a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;

    &:hover {
      color: #DD3333;
    }
  }
`

export const FormPage = styled(motion.div)`

`;