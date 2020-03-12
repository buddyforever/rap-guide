import styled from 'styled-components'

export const StyledContent = styled.div`
  min-height: 50vh;
`

export const Heading = styled.header`
  margin: 5rem 0;

  h1 {
    text-transform: uppercase;
  }
`

export const FourGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2.5rem;
  row-gap: 5rem;
`

export const TwoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2.5rem;
  row-gap: 5rem;
`