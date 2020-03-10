import React, { useState } from 'react'
import styled from 'styled-components'
import useGlobal from "../../store/Store"
import auth from '../../auth/auth'
import { Redirect } from 'react-router-dom'

export const Login = () => {

  const [globalState, globalActions] = useGlobal();
  const [annotation, setAnnotation] = useState(null);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      auth.login(email);
      window.location = "/"; // TODO - change this to a proper react redirect
    } else {
      alert("please enter a valid email address");
    }
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <StyledContent>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="form-group">
          <input
            type="text"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="button-group">
          <button className="btn btn-right" onClick={handleLogin}>Login</button>
        </div>
      </form>
    </StyledContent>
  )
}

export default Login;

const StyledContent = styled.div`

  min-height: 40vh;

  form {
    max-width: 50rem;
    margin: 0 auto;

    .form-group {
      margin-bottom: 2.5rem;
      position: relative;

      input[type=text],
      input[type=password]{
        width: 100%;
        padding: 1rem 1.5rem;
        border: 1px solid black;
        border-radius: 2px;
        outline: none;
        font-size: 1.6rem;
      }

      label{
        position: absolute;
        background-color: white;
        left: 1.5rem;
        top: 1rem;
        transition: all .3s ease;
      }

      input:focus + label,
      input:valid + label {
        padding: 0 0.5rem;
        left: 20px;
        top: -0.8rem;
        font-size: 1.4rem;
      }

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
      }
    }

    .button-group {
      display: flex;
      justify-content: flex-end

      button {
        border: 1px solid black;
        border-radius: 2px;
        text-transform: uppercase;
        font-weight: 500;
        background-color: white;
        padding: 1rem 1.5rem;
        cursor: pointer;
        transition: all .3s ease;

        &:hover {
          background-color: black;
          color: white;
        }
      }
    }
  }
`;

