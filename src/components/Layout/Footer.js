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
          <h3>RECENT</h3>
          <ul>
            <li><Link to="/guide/ckcaswe3mx59o0b97mg5j9t1e">Darwin Day</Link></li>
            <li><Link to="/guide/ckc6ui9ulw9n40b09vsxnfafr">Stay Home</Link></li>
            <li><Link to="/guide/ckbybwn643izk0b978rht2qae">Revenge of the Somatic</Link></li>
            <li><Link to="/guide/ckbdz8gy86efw0b14s458x8ku">Genes's Eye View</Link></li>
          </ul>
        </div>
        <div>
          <h3>PAGES</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/lessons">Lessons</Link></li>
            <li><Link to="/request">Request</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3>ABOUT</h3>
          <p style={{ letterSpacing: "1px", lineHeight: "1.2em" }}>RapGuide.com helps teachers create engaging classroom content using informative rap music videos, and helps students and lifelong learners engage with science through the arts.</p>
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

  .content-container {
    max-width: 100rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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