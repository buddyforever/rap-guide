import React, { useState } from 'react'
import styled from 'styled-components'
import useGlobal from "../../store/Store"

export const Contact = () => {

  const [globalState, globalActions] = useGlobal();
  const [annotation, setAnnotation] = useState(null);

  return (
    <StyledContent>
      <div className="callout">
        <h1>CONTACT INFORMATION</h1>
      </div>
    </StyledContent>
  )
}

export default Contact;

const StyledContent = styled.div`

  min-height: 50vh;

  .callout,
  .text {
    text-align: center;
    font-size: 2.4rem;
    padding: 5rem 0;
    margin: 2.5rem;
    border: 1px solid black;
  }

  .rap-guides {
    padding: 5rem 0;
  }

  .four-columns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 2.5rem;
  }

  h2 {
    margin-bottom: 2.5rem;
  }
`;

