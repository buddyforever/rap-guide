import React from 'react'
import styled from 'styled-components'
export const Grid = ({ children }) => {
  return (
    <StyledGrid>
      {children}
    </StyledGrid>
  )
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
`