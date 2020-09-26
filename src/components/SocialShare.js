import React from 'react'
import { TwitterShareButton, EmailShareButton, FacebookShareButton } from 'react-share'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const SocialShare = ({
  url,
  title = "",
  color = "black",
  hashtag = ""
}) => {
  return (
    <StyledShareIcons>
      <h4 style={{ color: color }}>Share</h4>
      <p>
        <FacebookShareButton
          className="facebook"
          url={url}
          hashtag={hashtag || "RapGuide"}
          quote={"Check out RapGuide.com | " + title}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </FacebookShareButton>
        <TwitterShareButton
          className="twitter"
          url={url}
          hashtags={["RapGuide", "BabaBrinkman", hashtag]}
          title={"Check out RapGuide.com | " + title}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </TwitterShareButton>
        <EmailShareButton
          className="mail"
          url={url}
          subject={"Check out RapGuide.com | " + title}
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </EmailShareButton>
      </p>
    </StyledShareIcons>
  )
}

const StyledShareIcons = styled.div`
  p {
    font-size: 3rem!important;
  }

  .facebook path {
    fill: #0574E7!important;
  }
  .twitter path {
    fill: #1DA1F2!important;
  }
  .mail path {
    fill: #271013!important;
  }

  svg {
    transition: transform .3s ease;
  }

  svg:hover {
    transform: scale(1.2);
  }

  button + button {
    margin-left: 10px;
  }
`
