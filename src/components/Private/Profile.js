import React, { useState, useContext } from 'react'

import { ProfileForm } from '../Profile/ProfileForm'
import { StyledContent, FullSection } from '../../styles/PageStyles'
import { UserContext } from '../../context/UserContext'
import { Message } from '../ui'
import Loader from '../Loader'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_ACCOUNT_BY_EMAIL, UPDATE_ACCOUNT } from '../../queries/accounts'

/* COMPONENT */
export const Profile = () => {

  /* Context */
  const { user, setUser } = useContext(UserContext);

  /* Queries */
  const { loading, data } = useQuery(GET_ACCOUNT_BY_EMAIL, {
    variables: {
      email: user ? user.email : ''
    }
  });
  const [updateAccount] = useMutation(UPDATE_ACCOUNT);

  /* Helpers */
  const [message, setMessage] = useState(null);

  if (loading) return <Loader />
  return (
    <>
      <FullSection>
        <StyledContent style={{ marginBottom: "5rem", width: "100%" }}>
          <ProfileForm profile={data.account} />
          {
            message &&
            <Message
              toast
              dismiss={() => setMessage(null)}
              type={message.type}
              title={message.title}>
              {message.text}
            </Message>
          }
        </StyledContent>
      </FullSection>
    </>
  )
}

