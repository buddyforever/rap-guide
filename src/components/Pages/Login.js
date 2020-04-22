import React, { useState, useEffect, useContext } from 'react'
import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import auth from '../../auth/auth'
import { Redirect } from 'react-router-dom'
import Message from '../Layout/Message'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { UserContext } from '../../context/UserContext'

const Login = ({ lesson = null }) => {

  const [redirect, setRedirect] = useState(null);
  const [message, setMessage] = useState(null);

  const { user, setUser } = useContext(UserContext);

  const { refetch } = useQuery(GET_ACCOUNT, { variables: { accountId: "" } });

  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const [updateAccount] = useMutation(UPDATE_ACCOUNT);
  const [createLessonStudent] = useMutation(ENROLL_STUDENT);

  /* TODO MAKE THE ACCOUNT BASED ON EMAIL ADDRESS - ONE ACCOUNT PER EMAIL */
  async function loginUser(profile) {
    const { data: { account } } = await refetch({ accountId: profile.accountId });

    if (!account) {
      await createAccount({
        variables: {
          accountId: profile.accountId,
          email: profile.email,
          nameFirst: profile.nameFirst || '',
          nameLast: profile.nameLast || '',
          image: profile.image,
          type: lesson ? "student" : "public"
        }
      }).then(({ data: { createAccount } }) => {
        setUser(createAccount);
      });
    } else {
      const newAccount = {
        image: profile.image,
        accountId: profile.accountId,
        ...account
      }
      setUser(newAccount);
    }
  }

  async function enrollStudent(user) {
    await createLessonStudent({
      variables: {
        "lessonId": lesson.id,
        "accountId": user.id,
        "type": "student"
      }
    }).then(() => {
      // A user has been logged in
      auth.login(user).then(() => {
        setRedirect("/profile");
      });
    });
  }

  useEffect(() => {
    if (!user) return;

    // Update the account to student and add the lesson Student record
    if (lesson) {
      enrollStudent(user);
    } else {
      auth.login(user).then(() => {
        setRedirect("/profile");
      });
    }

  }, [user])

  const responseFacebook = (data, addAccount) => {
    const { email, name, picture, id } = data;
    let nameSplit = name.split(" ");

    const profile = {
      id: id,
      accountId: id,
      nameFirst: nameSplit[0] ? nameSplit[0] : '',
      nameLast: nameSplit[nameSplit.length] ? nameSplit[nameSplit.length] : '',
      email: email,
      image: picture.data.url
    }

    loginUser(profile);
  }

  const responseGoogle = (response) => {
    const profileObj = response.profileObj;

    const profile = {
      id: profileObj.googleId,
      accountId: profileObj.googleId,
      nameFirst: profileObj.givenName,
      nameLast: profileObj.familyName,
      email: profileObj.email,
      image: profileObj.imageUrl
    };

    loginUser(profile);
  }

  return (
    <StyledContent>
      <Heading>
        <h1>Login</h1>
      </Heading>
      <Message message={message} />
      {lesson && (
        <MediumSpace>
          <p>Please login with Google or Facebook to enroll yourself in <strong>{lesson.title}</strong>.</p>
        </MediumSpace>
      )}
      {/*<FacebookLogin
        appId="665758824197396"
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <br />
      <br />*/}
      <GoogleLogin
        clientId="898142775962-ib0uaie5botfugao80pjjn9nae1387fl.apps.googleusercontent.com"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={(response) => console.log(response)}
      />
      {redirect && <Redirect to={redirect} />}
    </StyledContent>
  )
}

export default Login;

const GET_ACCOUNT = gql`
  query getAccount($accountId: String!) {
    account(where: {
      accountId: $accountId
    }){
      id
      accountId
      email
      nameFirst
      nameLast
      type
    }
  }
`

const ENROLL_STUDENT = gql`
  mutation createLessonStudent(
      $accountId:ID!,
      $lessonId:ID!,
      $type:String!
    ){
    createLessonStudent(data: {
      status: PUBLISHED
      account: {
        connect: {id:$accountId}
      }
      lessons: {
        connect: {id:$lessonId}
      }
    }){
      id
    }
    updateAccount(
      where: { id: $accountId }
      data: {
      type: $type
    }) {
      id
      accountId
      nameFirst
      nameLast
      email
      type
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!,
    $nameFirst: String!,
    $nameLast: String!,
    $type: String!,
    $image: String!,
    $accountId: String!) {
    createAccount(data: {
      status: PUBLISHED
      email: $email
      nameFirst: $nameFirst
      nameLast: $nameLast
      image: $image
      type: $type
      accountId: $accountId
    }) {
      id
      accountId
      nameFirst
      nameLast
      image
      email
      type
    }
  }
`

const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $email: String!,
    $nameFirst: String!,
    $nameLast: String!,
    $image: String!,
    $type: String!,
    $accountId: String!) {
    updateAccount(
      where: { accountId: $accountId }
      data: {
      status: PUBLISHED
      email: $email
      nameFirst: $nameFirst
      nameLast: $nameLast
      image: $image
      type: $type
      accountId: $accountId
    }) {
      id
      accountId
      nameFirst
      nameLast
      image
      email
      type
    }
  }
`