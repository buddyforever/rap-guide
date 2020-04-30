import React, { useState } from 'react'
import styled from 'styled-components'
import { hexToRgb } from '../../utilities/colors'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { cardShadow, cardShadowHover } from '../themes/shadows';

const ColorCard = (props) => {

  const [rgb] = useState(hexToRgb(props.color));

  return (
    <StyledCard {...props}>
      <CopyToClipboard
        text={props.rgb ? rgb : props.color}
        onCopy={() => alert(props.rgb ? rgb : props.color + " has been copied to your clipboard")}>
        <span className="swatch"></span>
      </CopyToClipboard>
      <span className="color-code">{props.rgb ? rgb : props.color}</span>
    </StyledCard>
  )
}

export default ColorCard

ColorCard.defaultProps = {
  size: "100px",
  color: "red",
  rounded: "15px",
  text: "white",
  rgb: false
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .swatch {
    position: relative;
    display: block;
    height: ${props => props.size};
    width: ${props => props.size};
    border-radius: ${props => props.rounded};
    background-color: ${props => props.color};
    color: ${props => props.text};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 1rem;
    box-shadow: ${cardShadow};
    transition: all .3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: ${cardShadowHover};
    }
  }

  .color-code {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 400;
  }
`