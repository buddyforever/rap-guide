import styled from 'styled-components'
import { motion } from 'framer-motion'

export const StyledMainContent = styled.main`

`;

export const StyledContent = styled.div`
  max-width: 1100px;
  padding: 0 50px;
  margin: 0 auto;
  position: relative;


  p {
    margin: 1rem 0;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 1px;
    max-width: 60ch;
  }

  p a,
  button.showNextLink {
    color: #DD3333;
    text-decoration: none;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: rgba(221,51,51,0.4);
      transition: all .3s ease;
    }

    &:hover::after {
      bottom: -4px;
      height: 6px;
    }
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

  &.faq button {
    text-align: left;
  }
`
export const SmallSpace = styled.div`
  margin: 1rem 0;
`

export const Heading = styled.header`
  padding: 5rem 0;

  h1 {
    text-transform: uppercase;
    margin: 0;
  }
  h2 {
    margin: 0;
  }
`

export const Centered = styled.div`
  height: ${props => props.height || "100vh"};
  width: ${props => props.width || "100%"};
  display: flex;
  justify-content: center;
  align-items: center;
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
  grid-gap: 2rem;

  @media screen and (max-width: 1020px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 926px) {
    grid-template-columns: 1fr;
  }
`

export const ThreeGridFlex = styled.div`
  display: grid;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;

  &>div {
    flex: 1 1 32%;
    margin-bottom: 5rem;
    max-width: 320px;

    @media screen and (max-width: 1020px) {
      flex: 1 1 48%;
      max-width: 420px;
    }

    @media screen and (max-width: 926px) {
      max-width: 100%;
      width: 100%;
    }
  }
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

export const StyledMovingColumn = styled.div`
  position: relative;
  opacity: 1;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .arrow {
    position: absolute;
    display: block;
    width: 2rem;
    height: 2rem;
    border-left: 3px solid #DD3333;
    border-top: 3px solid #DD3333;
    background-color: #FFFFFF;
    transform: rotate(-45deg);
    transition: all .3s ease;
    left: -0.9rem;
    z-index: 10;

    top: ${props => props.arrowTop}px;
  }

  .content {
    width: 100%;
    position: absolute;
    padding-left: 2rem;
    border-left: 3px solid #DD3333;
    transition: all .3s ease;
    z-index: 5;
    min-height: 7rem;
    top: ${props => props.contentTop}px;

    &.view {
      max-height: 700px;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 2.5rem;
      word-break: break-word;
    }

    img {
      max-width: 100%;
    }

    .lyrics {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid black;
    }
  }
`

export const FullSection = styled(motion.section)`
  min-height: ${props => props.minHeight || "90vh"};
  width: 100vw;
  position: relative;

  padding: ${props => props.space || "5rem"} 0;
  background-color: ${props => props.bgColor || 'white'};
  color: ${props => props.color || 'black'};

  &.centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`