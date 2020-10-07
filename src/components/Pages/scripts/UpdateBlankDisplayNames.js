import React, { useState, useEffect, useContext } from 'react'

import { StyledContent } from '../../styles/PageStyles'
import { animals } from '../../data/animals'

import { UPDATE_DISPLAY_NAME } from '../../queries/accounts'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

/* This file updates all accounts with blank
  display names to a random animal name-number. */

/* Functions */
function getDisplayname(animal) {
  let num = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
  let display = animal.replace(/\s+/g, '-').toLowerCase() + "-" + num
  return display
}

function chooseRandomAnimal() {
  return animals[Math.floor(Math.random() * animals.length)];
}

function updateAccountDisplaynames(updateData) {
  updateData.map(account => {
    console.log(account)
  })
  console.log(updateData)
}

/* Component */
const Temp = () => {

  const [updateData, setUpdateData] = useState(null)

  const { loading, data } = useQuery(GET_ACCOUNTS)
  const [updateDisplayName] = useMutation(UPDATE_DISPLAY_NAME)

  useEffect(() => {
    if (!data) return
    setUpdateData(
      data.accounts.map(account => {
        const animal = chooseRandomAnimal()
        return {
          id: account.id,
          displayName: getDisplayname(animal)
        }
      })
    )
  }, [data])

  useEffect(() => {
    if (!updateData) return
    updateData.map(account => {
      updateDisplayName({
        variables: {
          id: account.id,
          displayName: account.displayName
        }
      })
    })
  }, [updateData])

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

