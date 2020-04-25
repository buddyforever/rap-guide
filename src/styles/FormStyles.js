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

export const DropZone = styled.div`
  margin: 25px 0;
  height: 75px;
  border: 1px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    background-color: #f3f3f3;
  }
`

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 1.6rem;
  padding: 1.5rem 1rem;
  border: 1px solid black;
  border-radius: 2px;
`

export const Autoreply = styled(motion.div)`
  margin: 2.5rem 0;
  padding: 1rem 1.5rem;
  font-size: 1.6rem;
  border-radius: 2px;
  color: white;
  background-color: #6200EE;

  &.error {
    background-color: #B00020;
  }

  &.info {
    background-color: #03DAC6;
  }
`

export const Button = styled.button`
  padding: 10px 15px;
  text-decoration: none;
  text-transform: uppercase;
  background-color: #DD3333;
  color: white;
  border-radius: 3px;
  transition: all .3s ease;
  border: none;
  cursor: pointer;
  outline: none;

  &:disabled {
    filter: grayscale(1)!important;
    cursor: not-allowed!important;
  }

  &:hover {
    background-color: #b51e1e;
  }

  &.secondary {
    background-color: #23a3d5;

    &:hover {
      background-color: #1c83aa;
    }
  }
`

export const LinkButton = styled.button`
  border: none;
  background-color: transparent!important;
  color: #DD3333;
  cursor: pointer;
  transition: all .2s ease;
  outline: none;

  &:hover {
    text-decoration: underline;
  }
`

export const FormBlock = styled.div`
  margin-bottom: 2.5rem;

  label {
    font-weight: 400;
    font-size: 1.4rem;
    margin-bottom: .5rem;
    text-transform: uppercase;
    display: block;
  }

  input[type=text],
  input[type=number],
  input[type=email],
  input[type=password],
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
  margin-top: 2.5rem;
  border-top: 1px solid black;
`

export const FormPage = styled(motion.div)`

`;