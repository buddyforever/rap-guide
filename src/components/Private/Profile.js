import React, { useState, useEffect, useContext } from 'react'
import { StyledContent, Heading, TwoGrid } from '../../styles/PageStyles'
import { FormBlock, ButtonBlock, Button, Form } from '../../styles/FormStyles'
import auth from '../../auth/auth'
import { UserContext } from '../../context/UserContext'
import Message from '../Layout/Message'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const Profile = () => {

  /* Context */
  const { user, setUser } = useContext(UserContext);

  /* Queries */
  const { loading, data } = useQuery(GET_ACCOUNT_BY_EMAIL, {
    variables: {
      email: user.email
    }
  });
  const [updateAccount] = useMutation(UPDATE_ACCOUNT);

  /* State */
  const [accountId, setAccountId] = useState("");
  const [nameFirst, setNameFirst] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  /* Helpers */
  const [message, setMessage] = useState(null);

  /* Functions */
  function saveProfile(e) {
    e.preventDefault();

    const profile = {
      accountId,
      nameFirst,
      nameLast,
      email,
      type,
      image
    }

    // Update Database
    updateAccount({
      variables: {
        image: user.image,
        ...profile
      }
    }).then(() => {
      // Update Context
      setUser(profile);
      auth.login(profile);

      setMessage({
        text: "Your profile has been saved."
      })
    })
  }

  useEffect(() => {
    if (!loading) {
      const { account } = data;

      setAccountId(account.accountId);
      setNameFirst(account.nameFirst);
      setNameLast(account.nameLast);
      setEmail(account.email);
      setType(account.type);
      setImage(user.image);
    }
  }, [data])

  if (loading) return null
  return (
    <StyledContent>
      <Heading>
        <h1 style={{ display: "flex", alignItems: "center" }}>
          <img src={image} alt="Profile" style={{ maxHeight: "6rem", marginRight: "1rem", borderRadius: "50%" }} /> {nameFirst} {nameLast}
        </h1>
      </Heading>
      <Form onSubmit={saveProfile}>
        <Message message={message} />
        <TwoGrid>
          <FormBlock>
            <label>First Name</label>
            <input type="text" placeholder="First Name" value={nameFirst} onChange={(e) => setNameFirst(e.target.value)} />
          </FormBlock>
          <FormBlock>
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" value={nameLast} onChange={(e) => setNameLast(e.target.value)} />
          </FormBlock>
        </TwoGrid>
        <FormBlock>
          <label>Email</label>
          <input type="text" placeholder="email" disabled value={email} />
        </FormBlock>
        <FormBlock className={email === 'jessejburton@gmail.com' ? '' : 'hidden'}>
          <label>Account Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="administrator">Administrator</option>
            <option value="expert">Expert</option>
            <option value="educator">Educator</option>
            <option value="student">Student</option>
            <option value="public">Public</option>
          </select>
        </FormBlock>
        <ButtonBlock>
          <Button>Save Profile</Button>
        </ButtonBlock>
      </Form>
    </StyledContent>
  )
}

const GET_ACCOUNT_BY_EMAIL = gql`
  query getAccount($email: String!) {
    account(where: {
      email: $email
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

const UPDATE_ACCOUNT = gql`
  mutation updateAccount($email: String!,$nameFirst: String!,$nameLast: String!,$type: String!,$accountId: String!) {
    updateAccount(
      where: { accountId: $accountId }
      data: {
      status: PUBLISHED
      email: $email
      nameFirst: $nameFirst
      nameLast: $nameLast
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
`

export default Profile;


