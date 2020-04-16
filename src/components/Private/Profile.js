import React, { useState, useEffect, useContext } from 'react'
import { StyledContent, Heading, TwoGrid } from '../../styles/PageStyles'
import { FormBlock, ButtonBlock, Button, Form, Autoreply } from '../../styles/FormStyles'
import { getLocalStorage } from '../../utilities/LocalStorage'
import auth from '../../auth/auth'
import { UserContext } from '../../context/UserContext'
import Message from '../Layout/Message'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const Profile = ({ data }) => {

  console.log(data);

  const { user, setUser } = useContext(UserContext)

  const [nameFirst, setNameFirst] = useState(user.nameFirst);
  const [nameLast, setNameLast] = useState(user.nameLast);
  const [email, setEmail] = useState(user.email);
  const [type, setType] = useState(user.type);
  const [image, setImage] = useState(user.image);

  const [message, setMessage] = useState(null);

  function saveProfile(e) {
    e.preventDefault();

    const profile = {
      nameFirst,
      nameLast,
      email,
      type,
      image
    }

    setUser(profile);
    auth.login(profile);

    setMessage({
      text: "Your profile has been saved."
    })
  }

  useEffect(() => {
    // TODO Get actual data
    const profile = getLocalStorage("profile");

    setNameFirst(profile.nameFirst);
    setNameLast(profile.nameLast);
    setEmail(profile.email);
    setType(profile.type);
    setImage(profile.image);
  }, [])

  return (
    <StyledContent>
      {image &&
        <Heading>
          <h1 style={{ display: "flex", alignItems: "center" }}>
            <img src={image} alt="Profile" style={{ maxHeight: "6rem", marginRight: "1rem", borderRadius: "50%" }} /> {nameFirst} {nameLast}
          </h1>
        </Heading>}
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
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormBlock>
        <FormBlock>
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

const PROFILE_QUERY = gql`
  query getAccount {
    accounts {
      id
      nameFirst
      nameLast
      email
    }
  }
`

export default graphql(PROFILE_QUERY)(Profile)


