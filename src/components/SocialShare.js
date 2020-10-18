import React from 'react'
import { TwitterShareButton, EmailShareButton, FacebookShareButton } from 'react-share'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faShareSquare } from '@fortawesome/free-solid-svg-icons'

export const SocialShare = ({
  url,
  title = "",
  mode = "light",
  hashtag = "",
  ...rest
}) => {
  return (
    <StyledShareIcons className={mode} {...rest}>
      <button className="share">
        <FontAwesomeIcon icon={faShareSquare} /> Share
      </button>
      <div className="icons">
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
      </div>
    </StyledShareIcons>
  )
}

const StyledShareIcons = styled.div`
  position: relative;
  display: inline-block;
  width: 120px;
  transform-style: preserve-3d;

  &:hover {
    button.share {
      opacity: 0.1;
      filter: blur(1px);
    }
    .icons {
      opacity: 1;
      transform: translateZ(40px) translateY(-5px) scale(1.5);
    }
  }

  button {
    padding: 8px 10px;
    font-size: 22px;
    border-radius: 1px;
    border: 3px solid black;
    background-color: white;
    transition: opacity 0.3s ease-out;
  }

  .icons {
    position: absolute;
    top: 0;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
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
  &.dark .mail path {
    fill: #FFFFFF!important;
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
