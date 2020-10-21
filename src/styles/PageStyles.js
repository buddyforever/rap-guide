import styled from 'styled-components'
import { motion } from 'framer-motion'

export const StyledMainContent = styled.main`
  padding-top: 10rem; // To adjust for the floating header
`;

export const StyledContent = styled.div`
  max-width: 1100px;
  padding: 0 50px 50px 50px;
  margin: 0 auto;
  position: relative;

  &#requests {
    img {
      max-width: 500px;
    }
  }

  p {
    margin: 1rem 0;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 1px;
    max-width: 60ch;
  }

  p a,
  button.showNextLink,
  p a:visited,
  h3 a {
    color: #DD3333;
    overflow-wrap: break-word;
    word-break: break-word;
    text-decoration: none;
    background-image: linear-gradient(180deg,transparent 90%,rgba(221,51,51,.4) 0);
    transition: background-image .3s ease;

    &:hover {
      background-image: linear-gradient(180deg,transparent 85%,rgba(221,51,51,.4) 0);
    }
  }

  .shown p {
    font-size: 18px!important;
  }

  .video-heading {
    h1 {
      font-size: 5.5rem;
      text-align: center;
    }
  }

  .paragraph-top {
    marginBottom: '25px';
    lineHeight: '1.5em';
    fontWeight: 700;
    letterSpacing: '3px';
    fontFamily: 'Barlow';
  }
  .paragraph-bottom {
    fontFamily: 'Barlow';
    fontWeight: 100;
  }

  h2 span,
  h3 span,
  h4 span {
    color: #DD3333;
  }


  @media screen and (max-width: 750px){
    padding-left: 25px;
    padding-right: 25px;
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
  font-size: 2rem;

  p {
    margin: 1rem 0;
    line-height: 1.5em;
  }
  ul, ol {
    margin: 2rem 0;
    padding-left: 3rem;
  }
  p+h2, ul+h2, ol+h2,
  p+h3, ul+h3, ol+h3 {
    margin-top: 2.5rem;
  }
  h2+p, h2+ul, h2+ol,
  h3+p, h3+ul, h3+ol {
    margin-bottom: 2.5rem;
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
    font-weight: 500;

    span {
      color: #23A2D6;
    }
  }
  h2 {
    margin: 0;
  }

  @media screen and (max-width: 750px){
    padding: 0 0 2.5rem 0
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

  @media screen and (max-width: 750px) {
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
  grid-template-columns: ${props => props.template || '1fr 1fr'};
  column-gap: 5rem;

  @media screen and (max-width: 750px){
    grid-template-columns: 1fr;
  }
`;

export const StyledMovingColumn = styled(motion.div)`
  position: relative;
  opacity: 1;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .arrow {
    position: absolute;
    display: block;
    width: 5rem;
    height: 5rem;
    border-bottom-right-radius: 50%;
    border: 5px solid rgba(221,51,51,1);
    border-bottom-color: #FFFFFF;
    border-right-color: #FFFFFF;
    background-color: #FFFFFF;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg) translateX(3px);
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    left: -2.1rem;
    z-index: 10;

    top: ${props => props.arrowTop}px;

    svg {
      max-height: 70%;
      max-width: 70%;
      margin-left: 4px;
      margin-top: 4px;
      animation: rotate 60s linear infinite;
    }
  }

  @keyframes rotate {
    0% {
      transform: scale(1.2) rotate(0deg);
    }
    50% {
      transform: scale(1) rotate(180deg);
    }
    100% {
      transform: scale(1.2) rotate(360deg);
    }
  }

  .content {
    width: 100%;
    position: absolute;
    padding-left: 2rem;
    border-left: 6px solid #DD3333;
    transition: all .3s ease;
    z-index: 5;
    min-height: 7rem;
    top: ${props => props.contentTop}px;

    &.view {
      max-height: 700px;
      overflow-y: scroll;
      overflow-x: hidden;
      position: relative;
      padding: 5rem;
      word-break: break-word;
      border-radius: 2px;
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

  .mobile-close {
    display: none;
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

  .small {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    .small {
      display: block;
    }

    &.small-hide-background {
      background-image: none!important;
    }

    .small-600 {
      max-width: 600px;
    }
  }
`