import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faYoutube, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

const SocialIcons = () => {
  return (
    <StyledSocialIcons>
      <a href="https://www.facebook.com" target="_blank" className="facebook">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a href="https://www.youtube.com" target="_blank" className="youtube">
        <FontAwesomeIcon icon={faYoutube} />
      </a>
      <a href="https://www.instagram.com" target="_blank" className="instagram">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="https://www.twitter.com" target="_blank" className="twitter">
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