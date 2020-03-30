import React, { useState, useContext } from 'react'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import auth from '../../auth/auth'
import { Redirect } from 'react-router-dom'
import { Autoreply } from '../../styles/FormStyles'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { UserContext } from '../../context/UserContext'
import { getLocalStorage, setLocalStorage } from '../../utilities/LocalStorage'

export const Login = ({ lesson = null }) => {

  const { user, setUser } = useContext(UserContext);

  const [redirect, setRedirect] = useState();
  const [classFull, setClassFull] = useState(false);

  function loginUser(profile) {

    setClassFull(false);

    if (lesson) {
      if (lesson.students && (lesson.students < lesson.maxStudents)) {
        profile.type = "student";
        profile.submitted = false;
        enrollStudent(profile);
      } else {
        setClassFull(true);
        return false;
      }
    }

    setUser(profile);

    auth.login(profile).then(() => {
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

  const responseFacebook = ({ email, name, picture, id }) => {
    let nameSplit = name.split(" ");

    loginUser({
      id: id,
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
      id: profileObj.googleId,
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

