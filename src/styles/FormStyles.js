import styled from 'styled-components'

export const Form = styled.form`

`

export const Select = styled.select`

`

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 1.6rem;
  padding: 1.5rem 1rem;
  border: 1px solid black;
  border-radius: 2px;
`

export const Autoreply = styled.div`
  margin: 2.5rem 0;
  padding: 1.5rem 1rem;
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

  &:hover {
    background-color: #b51e1e;
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
  input[type=email],
  input[type=password],
  select
  {
    width: 100%;
    font-size: 1.6rem;
    padding: 1.5rem 1rem;
    border: 1px solid black;
    border-radius: 2px;
  }
`

export const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`