import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledContent, Heading } from '../../styles/PageStyles'
import auth from '../../auth/auth'
import { Redirect } from 'react-router-dom'
import { FormBlock, ButtonBlock, Button, Form, Autoreply } from '../../styles/FormStyles'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { getLocalStorage } from '../../utilities/LocalStorage'

export const Login = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [message, setMessage] = useState();

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO change this to be actual loging system
    // For now I will check if the profile exists in local storage
    let profile = JSON.parse(getLocalStorage("profile"));
    if (!profile) {
      profile = {
        nameFirst: '',
        nameLast: '',
        email: email,
        type: 'administrator'
      }
    } else {
      profile.email = email;
    }

    if (validateEmail(email)) {
      auth.login(profile);
      window.location = "/profile"; // TODO - change this to a proper react redirect
    } else {
      setMessage({
        className: "error",
        text: "please enter a valid email address"
      });
    }
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <StyledContent>
      <Heading>
        <h1>Login</h1>
      </Heading>
      <Form onSubmit={handleLogin} style={{ maxWidth: "500px" }}>
        {message && (
          <Autoreply className={message.className}>
            {message.text}
          </Autoreply>
        )}
        <FormBlock>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormBlock>
        <FormBlock>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormBlock>
        <ButtonBlock>
          <Button onClick={handleLogin}>Login</Button>
        </ButtonBlock>
      </Form>
    </StyledContent >
  )
}

export default Login;

