import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import auth from '../../auth/auth'
import { Redirect } from 'react-router-dom'
import { FormBlock, ButtonBlock, Button, Form, Autoreply } from '../../styles/FormStyles'
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { getLocalStorage, setLocalStorage } from '../../utilities/LocalStorage'
import useGlobal from '../../store/Store'

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

export const Login = ({ lesson = null }) => {

  const [redirect, setRedirect] = useState();
  const [classFull, setClassFull] = useState(false);
  const [globalState, globalActions] = useGlobal();

  function loginUser(profile) {

    setClassFull(false);

    if (lesson) {
      if (lesson.students && lesson.students < lesson.maxStudents) {
        profile.type = "student";
        profile.submitted = false;
        enrollStudent(profile);
      } else {
        setClassFull(true);
        return false;
      }
    }

    auth.login(profile).then(() => {
      // Update Global State
      globalActions.setName(profile.nameFirst + ' ' + profile.nameLast);
      globalActions.setType(profile.type);
      globalActions.setProfileImage(profile.image);

      // Redirect
      setRedirect(true);
    });
  }

  function enrollStudent(profile) {
    let lessons = getLocalStorage("lessons")

    let newLessons = JSON.stringify(lessons.map(l => {
      if (l.lessonId === lesson.lessonId) {
        return {
          ...l,
          students: [
            ...l.students || [],
            profile
          ]
        }
      } else {
        return l
      }
    }));

    setLocalStorage("lessons", newLessons)

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
      {classFull && (
        <Autoreply
          className="error"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
        >
          <p><strong>LESSON FULL</strong></p>
          <p>Sorry, this lesson is full. Please contact your teacher for assistance.</p>
        </Autoreply>
      )}
      {lesson && (
        <MediumSpace>
          <p>Please login with Google or Facebook to enroll yourself in <strong>{lesson.title}</strong>.</p>
        </MediumSpace>
      )}
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

