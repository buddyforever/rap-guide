import React, { useState, useEffect } from 'react'
import { StyledContent, Heading, TwoGrid } from '../../styles/PageStyles'
import { FormBlock, ButtonBlock, Button, Form, Autoreply } from '../../styles/FormStyles'
import { getLocalStorage } from '../../utilities/LocalStorage'
import auth from '../../auth/auth'
import useGlobal from '../../store/Store'

export const Profile = () => {

  const [globalState, globalActions] = useGlobal();

  const [nameFirst, setNameFirst] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

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

    globalActions.setName(nameFirst);
    globalActions.setType(type);
    auth.login(profile);

    setMessage({
      className: "success",
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
        {message && (
          <Autoreply
            className={message.className}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
          >
            {message.text}
          </Autoreply>
        )}
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
            <option value="export">Export</option>
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

export default Profile;

