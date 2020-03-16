import React from 'react'
import styled from 'styled-components'
import SocialIcons from '../SocialIcons'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="content-container">
        <div>
          <h3>CONTACT</h3>
          <SocialIcons />
        </div>
        <div>
          <h3>TOPICS</h3>
          <ul>
            <li><a href="#">Climate Chaos</a></li>
            <li><a href="#">Religion</a></li>
            <li><a href="#">Consciousness</a></li>
            <li><a href="#">Culture</a></li>
          </ul>
        </div>
        <div>
          <h3>LINKS</h3>
          <ul>
            <li><Link to="/">Explore</Link></li>
            <li><Link to="/lessons">Lessons</Link></li>
            <li><Link to="/request">Request</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3>ABOUT</h3>
          <p>A New Teaching And Learning Platform For Engaging With Complex Ideas In Science And Society Through Interactive Rap Music Videos.</p>
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