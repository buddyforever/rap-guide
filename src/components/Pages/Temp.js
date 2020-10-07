import React, { useState, useEffect, useContext } from 'react'

import { StyledContent } from '../../styles/PageStyles'
import { animals } from '../../data/animals'

import { UPDATE_DISPLAY_NAME } from '../../queries/accounts'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

/* Functions */

/* Component */
const Temp = () => {

  const [updateData, setUpdateData] = useState(null)

  const { loading, data } = useQuery(GET_ACCOUNTS)
  const [updateDisplayName] = useMutation(UPDATE_DISPLAY_NAME)

  if (loading || !updateData) return null
  return (
    <StyledContent style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Update Display Names to Animal Names</h1>
      {updateData.length} accounts are being updated.
    </StyledContent>
  )
}

export default Temp;

const GET_ACCOUNTS = gql`
  query getAccounts {
    accounts(where: { displayName: null }) {
      id
			displayName
    }
  }
`

