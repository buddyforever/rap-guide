import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledContent, Heading } from '../../styles/PageStyles'
import auth from '../../auth/auth'
import { Redirect } from 'react-router-dom'
import { FormBlock, ButtonBlock, Button, Form, Autoreply } from '../../styles/FormStyles'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { getLocalStorage } from '../../utilities/LocalStorage'
import useGlobal from '../../store/Store'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

export const Login = () => {

  const [redirect, setRedirect] = useState();
  const [globalState, globalActions] = useGlobal();

  function loginUser(profile) {
    auth.login(profile).then(() => {
      // Update Global State
      globalActions.setName(profile.nameFirst + ' ' + profile.nameLast);
      globalActions.setType(profile.type);
      globalActions.setProfileImage(profile.image);

      // Redirect
      setRedirect(true);
    });
  }

  const responseFacebook = ({ email, name, picture }) => {
    let nameSplit = name.split(" ");

    loginUser({
      nameFirst: nameSplit[0] ? nameSplit[0] : '',
      nameLast: nameSplit[nameSplit.length] ? nameSplit[nameSplit.length] : '',
      email: email,
      type: 'educator',
      image: picture.data.url
    });
  }

  const responseGoogle = (response) => {
    const profileObj = response.profileObj;

    loginUser({
      nameFirst: profileObj.givenName,
      nameLast: profileObj.familyName,
      email: profileObj.email,
      type: 'administrator',
      image: profileObj.imageUrl
    });
  }

  return (
    <StyledContent>
      <Heading>
        <h1>Login</h1>
      </Heading>
      <FacebookLogin
        appId="665758824197396"
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <br />
      <br />
      <GoogleLogin
        clientId="898142775962-ib0uaie5botfugao80pjjn9nae1387fl.apps.googleusercontent.com"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
      {redirect && <Redirect to="/profile" />}
    </StyledContent>
  )
}

export default Login;

