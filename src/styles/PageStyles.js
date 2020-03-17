import styled from 'styled-components'

export const StyledContent = styled.div`
  min-height: 50vh;
`

export const LargeSpace = styled.div`
  margin: 5rem 0;
`
export const MediumSpace = styled.div`
  margin: 2.5rem 0;
`
export const SmallSpace = styled.div`
  margin: 1rem 0;
`

export const Heading = styled.header`
  margin: 5rem 0;

  h1 {
    text-transform: uppercase;
    margin: 0;
  }
  h2 {
    margin: 0;
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

export const Thumbnail = styled.div`
  img {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
  }
`