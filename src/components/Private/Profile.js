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
  console.log(user);
  /* Queries */
  const { loading, data } = useQuery(GET_ACCOUNT_BY_EMAIL, {
    variables: {
      email: user.email
    }
  });
  const [updateAccount] = useMutation(UPDATE_ACCOUNT);

  /* State */
  const [displayName, setDisplayName] = useState(null)
  const [isPublic, setIsPublic] = useState(false)
  const [twitter, setTwitter] = useState("")

  /* Helpers */
  const [message, setMessage] = useState(null);

  /* Functions */
  function handleSelectAnimal(animal) {
    let num = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    let display = animal.replace(/\s+/g, '-').toLowerCase() + "-" + num;
    setDisplayName(display)
    saveProfile(display)
  }

  function saveProfile(display = displayName, pub = isPublic, twit = twitter) {
    updateAccount({
      variables: {
        email: user.email,
        type: user.type,
        displayName: display,
        isPublic: pub,
        twitter: twit,
        nameFirst: user.nickname || user.name || twit || ""
      }
    }).then((response) => {
      setMessage({
        type: 'success',
        title: 'Profile Saved',
        text: `Your profile has been saved.`
      })
    })
  }

  useEffect(() => {
    if (!loading) {
      setDisplayName(data.account.displayName || "")
      setIsPublic(data.account.isPublic || false)
      setTwitter(data.account.twitter || "")
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
        <>
          <p>Your anonymous animal display name is <strong>{displayName}</strong></p>
          <MediumSpace>
            <h3>Your Identity</h3>
            <p>By default your name is kept anonymous, you can <strong>choose</strong> to use your real name in association with your annotations on <a href="https://www.rapguide.com">RapGuide.com</a> by checking the following box: </p>
            <p>
              <label style={{ fontSize: "1.6rem", fontWeight: "700" }}>
                <input
                  style={{
                    transform: "scale(1.25)",
                    padding: "1rem",
                    marginRight: "1rem"
                  }}
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => {
                    setIsPublic(e.target.checked);
                  }}
                /> Use my real name</label>
            </p>
            {isPublic &&
              <MediumSpace>
                <p>Enter your Twitter handle to make your name link to your Twitter account:</p>
                <FormBlock>
                  <input
                    style={{ maxWidth: "300px" }}
                    type="text"
                    value={twitter}
                    placeholder="mytwitterhandle"
                    onChange={(e) => setTwitter(e.target.value)} />
                </FormBlock>
              </MediumSpace>
            }
          </MediumSpace>
          <MediumSpace>
            <Button onClick={() => saveProfile()}>Save Profile</Button>
          </MediumSpace>
        </>
      }
      {!displayName &&
        <Form>
          <MediumSpace>
            <p>Your identity will be kept a secret through the use of an animal display name. Select your own animal by searching through the available names, or get one chosen for you at random.</p>
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


