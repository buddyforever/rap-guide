import React from 'react'
import styled from 'styled-components'

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="content-container">
        <div>
          <h3>CONTACT</h3>
        </div>
        <div>
          <h3>SHOWS</h3>
          <ul>
            <li><a href="#">Dolor</a></li>
            <li><a href="#">Consectetur</a></li>
            <li><a href="#">Nulla</a></li>
            <li><a href="#">Numquam</a></li>
          </ul>
        </div>
        <div>
          <h3>ALBUMS</h3>
          <ul>
            <li><a href="#">Dolor</a></li>
            <li><a href="#">Consectetur</a></li>
            <li><a href="#">Nulla</a></li>
            <li><a href="#">Numquam</a></li>
          </ul>
        </div>
        <div>
          <h3>LOREM</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla delectus numquam qui atque quaerat rerum cupiditate.</p>
        </div>
      </div>
    </StyledFooter>
  )
}

export default Footer;

const StyledFooter = styled.footer`
  font-size: 1.6rem;
  background-color: #333;
  color: white;
  padding: 5rem 0;
  margin-top: 5rem;

  .content-container {
    max-width: 100rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-gap: 2.5rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all .3s ease;
  }

  a:hover {
    letter-spacing: 1px;
  }

  h3 {
    margin-bottom: 2.5rem;
  }

  ul {
    line-height: 2.4rem;
    list-style: none;
  }
`;