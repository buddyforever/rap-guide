import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import { Form, FormBlock } from '../../styles/FormStyles'
import { Split, MediumSpace } from '../../styles/PageStyles'

/* Utilities */
function getInitialsProfileImageSrc(nameFirst, nameLast) {
  return `https://ui-avatars.com/api/?background=1CA0D3&color=fff&name=${nameFirst || ''}+${nameLast || ''}`
}

export const ProfileForm = ({ profile }) => {

  /* Refs */
  const formRef = useRef()

  /* State */
  const [displayName, setDisplayName] = useState(profile.displayName || null)
  const [nameFirst, setNameFirst] = useState(profile.nameFirst || '')
  const [nameLast, setNameLast] = useState(profile.nameLast || '')
  const [profileType, setprofileType] = useState(profile.type)
  const [institutionName, setInstitutionName] = useState(profile.institutionName || '')
  const [instructorName, setInstructorName] = useState(profile.instructorName || '')
  const [isPublic, setIsPublic] = useState(profile.isPublic || false)
  const [twitter, setTwitter] = useState(profile.twitter || '')

  /* Functions */
  function onHandleSubmit(e) {
    e.preventDefault()
    console.log("submitted")
  }

  return (
    <>
      <StyledProfile>
        <div className="profile__image">
          <motion.div
            whileHover={{
              scale: 1.4
            }}
            className="profile-image">
            <img src={profile.image ||
              getInitialsProfileImageSrc(profile.nameFirst, profile.nameLast)}
              alt={profile.displayName}
            />
          </motion.div>
        </div>
        <div className="profile__details">
          <h2>
            {instructorName ? instructorName : nameFirst + ' ' + nameLast}
            {displayName &&
              <span> ({profile.displayName})</span>
            }
          </h2>
          <h4>{institutionName}</h4>
          <h3>{profileType}</h3>
        </div>
      </StyledProfile>
      <Form
        ref={formRef}
        onSubmit={onHandleSubmit}
      >
        <FormBlock>
          <Split>
            <div>
              <label>First Name</label>
              <input
                type="text"
                value={nameFirst}
                name="firstName"
                onChange={(e) => setNameFirst(e.target.value)}
                placeholder="First Name..."
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                value={nameLast}
                onChange={(e) => setNameLast(e.target.value)}
                name="lastName"
                placeholder="Last Name..."
              />
            </div>
          </Split>
        </FormBlock>
        {profileType === 'educator' &&
          <FormBlock>
            <label>Instructor Name & Designation</label>
            <input
              type="text"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              name="instructorName"
              placeholder="Dr. Samantha Edwards, phD..."
            />
          </FormBlock>
        }
        <FormBlock>
          <label>Institution/School Name</label>
          <input
            type="text"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
            name="institutionName"
            placeholder="My Hometown University..."
          />
        </FormBlock>
        <MediumSpace>
          <h3 className="blue" style={{ fontSize: "2.4rem" }}>Your Identity</h3>
          <p>Your anonymous animal display name is <strong className="blue">{profile.displayName || 'not chosen'}</strong></p>
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
          <AnimatePresence exitBeforeEnter>
            {isPublic &&
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0
                }}
                animate={{
                  opacity: 1,
                  height: 'auto'
                }}
                exit={{
                  opacity: 0,
                  height: 0
                }}>
                <p>Enter your <strong>Twitter</strong> handle to have your name link to your account:</p>
                <StyledTwitterInput>
                  <span className="icon">
                    <FontAwesomeIcon icon={faTwitter} />
                  </span>
                  <input
                    style={{ maxWidth: "300px" }}
                    type="text"
                    value={twitter}
                    placeholder="mytwitterhandle"
                    onChange={(e) => setTwitter(e.target.value)} />
                </StyledTwitterInput>
              </motion.div>
            }
          </AnimatePresence>
        </MediumSpace>
      </Form>
    </>
  )
}

const StyledTwitterInput = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  border: 1px solid black;
  border-radius: 2px;
  border-color: #CCCCCC;
  max-width: 300px;

  input[type=text] {
    border-color: transparent;
  }

  .icon {
    font-size: 2.8rem;
    color: #ccecf9;
    padding-left: 1rem;
  }
`

const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2.5rem 0;

  .profile__image {
    display: flex;
    justify-content: center;
    margin-bottom: 2.5rem;

    .profile-image {
      width: 125px;
      height: 125px;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.1),
                  0 0 8px 0 rgba(0,0,0,0.2),
                  0 0 4px 0 rgba(0,0,0,0.2),
                  0 0 2px 0 rgba(0,0,0,0.4);
    }
  }

  .profile__details {
    text-align: center;

    h2 { /* Display Name */
      text-transform: uppercase;
      font-size: 4rem;
      color: #1CA0D3;

      span {
        font-size: 1.8rem;
      }
    }
    h3 { /* Institution */
      font-size: 3rem;
    }
    h4 { /* Account Type */
      font-size: 2.2rem;
    }
  }
`
