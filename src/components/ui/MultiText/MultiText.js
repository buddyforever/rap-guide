import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { Button } from '../Button'

export const MultiText = ({ value, setValue, placeholder = '' }) => {

  const [inputValue, setInputValue] = useState("")

  function handleAddText(e) {
    e.preventDefault()

    // TODO - Make this use the message system
    if (!validateURL(inputValue)) {
      alert("Must be a valid URL")
      return
    }

    if (value.includes(inputValue)) {
      setInputValue("")
      return
    }

    setValue(prevState => {
      return [
        ...prevState,
        inputValue
      ]
    })

    setInputValue("")
  }

  function handleRemoveText(text) {
    setValue(prevState => prevState.filter(t => t !== text))
  }

  return (
    <StyledMultiText>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
        />
        <Button onClick={handleAddText}>Add</Button>
      </div>
      <div className="text-display">
        {value.map(text => (
          <div key={text} className="text">
            <span>{text}</span>
            <button onClick={(e) => handleRemoveText(text)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ))}
      </div>
    </StyledMultiText>
  )
}

const StyledMultiText = styled.div`
  .input-container {
    display: flex;
    align-items: center;
  }

  .text-display {
    margin-top: 25px;
    font-size: 22px;

    .text {
      display: grid;
      grid-template-columns: auto 100px;
      align-items: center;

      &:hover {
        background-color: #f8f8f8;
      }

      button {
        border: none;
        background: none;
        color: #DD3333;
        font-size: 24px;
        transition: tranform 0.3s ease;
        cursor: pointer;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
`

function validateURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}