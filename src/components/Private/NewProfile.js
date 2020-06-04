import React, { useState, useEffect, useContext } from 'react'

import { StyledContent, Heading, TwoGrid } from '../../styles/PageStyles'
import { UserContext } from '../../context/UserContext'

export const NewProfile = () => {

  const { user, setUser } = useContext(UserContext);

  if (!user) return null;
  return (
    <StyledContent>
      <Heading>
        <h1>Profile</h1>
      </Heading>
    </StyledContent>
  )
}

export default NewProfile;


