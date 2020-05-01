import styled from 'styled-components'
import { motion } from 'framer-motion'

export const StyledMainContent = styled.main`
  max-width: 110rem;
  margin: 0 auto;
  padding-top: 12rem;
`;

export const StyledContent = styled.div`
  min-height: 50vh;
  padding: 0 50px;

  p {
    margin: 1rem 0;
  }
`

export const Cite = styled.p`
  font-size: 1.6rem;
  color: #333;
  font-style: italic;
`

export const CenteredContent = styled.div`
  min-height: 50vh;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const HtmlContent = styled.div`
  max-width: 80ch;
  margin: 0 auto;

  p {
    margin: 1rem 0;
    line-height: 1.5em;
  }
  ul {
    margin: 2rem 0;
    padding-left: 3rem;
  }
  p+h2, ul+h2 {
    margin-top: 2.5rem;
  }
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

export const ThreeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

export const StyledVideo = styled.div`
  margin-bottom: 5rem;

  .video {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px; height: 0; overflow: hidden;
    background-color: black;
  }

  .video iframe,
  .video object,
  .video embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export const Split = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5rem;
`

export const ActivityList = styled.div`
  margin: 2.5rem 0;
  list-style: none;

  li {
    margin-bottom: 1.5rem;
  }

  a, a:link {
    text-decoration: none;
    color: inherit;
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0.3);
    transition: all .3s ease;
    padding: 0 .2rem;
    white-space: nowrap;
    margin: 0 .2rem;
  }

  a:hover {
    background-color: rgba(221, 51, 51, 0.6);
    color: white;
    box-shadow: inset 0 -4px rgba(221, 51, 51, 0);
  }
`

export const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5rem;
`;
