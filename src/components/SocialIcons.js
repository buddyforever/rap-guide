import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons'

const SocialIcons = () => {
  return (
    <StyledSocialIcons>
      <Link to="/contact"><FontAwesomeIcon icon={faEnvelope} /></Link>
      <a
        href="https://www.facebook.com/rapguidemedia"
        target="_blank"
        className="facebook"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a
        href="https://www.youtube.com/playlist?list=PLuHbMGCLLUYacqbi0kPnL6lK6KDLOM6BC"
        target="_blank"
        className="youtube"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={faYoutube} />
      </a>
      {/*       <a
        href="https://instagram.com/rapguidemedia"
        target="_blank"
        className="instagram"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} />
      </a> */}
      <a
        href="https://twitter.com/rapguide"
        target="_blank"
        className="twitter"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </StyledSocialIcons>
  )
}

export default SocialIcons;

const StyledSocialIcons = styled.div`
  a {
    text-decoration: none;
    font-size: 2.3rem;
    padding: 0 0.5rem;
    color: white;
    transition: all .3s ease;
    position: relative;
    display: inline-block;
  }

  a:hover {
    transform: scale(1.1);
  }
`