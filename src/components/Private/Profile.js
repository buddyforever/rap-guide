import React, { useState, useEffect, useContext } from 'react'
import { StyledContent, Heading, TwoGrid } from '../../styles/PageStyles'
import { FormBlock, ButtonBlock, Form } from '../../styles/FormStyles'
import { Button } from '../ui/Button'
import auth from '../../auth/auth'
import { UserContext } from '../../context/UserContext'
import Message from '../Layout/Message'
import Loader from '../Loader'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_ACCOUNT_BY_EMAIL, UPDATE_ACCOUNT } from '../../queries/accounts'

export const Profile = () => {
  console.log("here");
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
  const [displayName, setDisplayName] = useState("");

  /* Helpers */
  const [message, setMessage] = useState(null);

  /* Functions */
  function saveProfile(e) {
    e.preventDefault();

    // Update Database
    updateAccount({
      variables: {
        email: user.email,
        displayName
      }
    }).then((response) => {
      console.log(response)
      setMessage({
        text: "Your profile has been saved."
      })
    })
  }

  useEffect(() => {
    if (!loading) {
      setDisplayName(data.getAccount.displayName)
    }
  }, [data])

  if (loading) return <Loader />
  return (
    <StyledContent>
      <Heading>
        <h1 style={{ display: "flex", alignItems: "center" }}>
          <img src={user.image} alt="Profile" style={{ maxHeight: "6rem", marginRight: "1rem", borderRadius: "50%" }} /> {user.nameFirst} {user.nameLast}
        </h1>
      </Heading>
      <Form onSubmit={saveProfile}>
        <Message message={message} />
        <FormBlock>
          <label>Display Name</label>
          <input type="text" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </FormBlock>
        <ButtonBlock>
          <Button>Save Profile</Button>
        </ButtonBlock>
      </Form>
    </StyledContent>
  )
}

export default Profile;


