import React, { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { FormBlock, ButtonBlock, Form } from '../../styles/FormStyles'
import { UserContext } from '../../context/UserContext'
import { Message, Button } from '../ui'
import Loader from '../Loader'
import { AnimalChooser } from '../AnimalChooser'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_ACCOUNT_BY_EMAIL, UPDATE_ACCOUNT } from '../../queries/accounts'

import { animals } from '../../data/animals'

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
  const [displayName, setDisplayName] = useState(null)

  /* Helpers */
  const [message, setMessage] = useState(null);

  /* Functions */
  function handleSelectAnimal(animal) {
    let num = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    let display = animal.replace(/\s+/g, '-').toLowerCase() + "-" + num;

    // Update Database
    updateAccount({
      variables: {
        email: user.email,
        type: user.type,
        displayName: display
      }
    }).then((response) => {
      setMessage({
        type: 'success',
        title: 'Profile Saved',
        text: `Your profile has been saved. Your display name is <strong>${display}</strong>.`
      })
    })
  }

  useEffect(() => {
    if (!loading) {
      setDisplayName(data.account.displayName || "")
    }
  }, [data])

  if (loading) return <Loader />
  return (
    <StyledContent style={{ marginBottom: "5rem" }}>
      <Heading>
        <h1 style={{ display: "flex", alignItems: "center" }}>
          <img src={user.picture} alt="Profile" style={{ maxHeight: "6rem", marginRight: "1rem", borderRadius: "50%" }} /> {user.given_name} {user.family_name} {displayName && <span style={{ marginLeft: "2.5rem", fontSize: "1.8rem" }}>({displayName})</span>}
        </h1>
      </Heading>
      {displayName &&
        <p>Your anonymous animal display name is <strong>{displayName}</strong></p>
      }
      {!displayName &&
        <Form>
          <MediumSpace>
            <p>Your identity will be kept a secret from your classmates through the use of an animal display name. Select your own animal by searching through the available names, or get one chosen for you at random.</p>
            <p><strong>Once you choose an animal you can't change it, so choose wisely!</strong></p>
          </MediumSpace >
          <AnimalChooser selectAnimal={handleSelectAnimal} />
        </Form >
      }
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
    </StyledContent >
  )
}

export default Profile;


