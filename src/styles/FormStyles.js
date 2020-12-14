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

  input[type=text]:focus,
  input[type=number]:focus,
  input[type=email]:focus,
  input[type=password]:focus,
  input[type=search]:focus,
  select:focus,
  textarea:focus {
    box-shadow: 0 0 10px 0 rgba(28, 160, 211,0.1),
                  0 0 8px 0 rgba(28, 160, 211,0.2),
                  0 0 4px 0 rgba(28, 160, 211,0.2),
                  0 0 2px 0 rgba(28, 160, 211,0.4);
  }

  textarea {
    min-height: 15rem;
  }

  input.error,
  textarea.error {
    border: 1px solid #DD3333;
  }

  .rating-group {
    display: flex;
    gap: 25px;

    &>span {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
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