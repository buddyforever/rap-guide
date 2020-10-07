import gql from 'graphql-tag'

export const GET_ACCOUNT_BY_EMAIL = gql`
  query getAccount($email: String!) {
    account(where: {
      email: $email
    }){
      id
      type
      displayName
      isPublic
      twitter
      isViewOnly
    }
  }
`

export const UPDATE_ACCOUNT_TYPE = gql`
  mutation updateAccount($email: String!,$type: String!, $isViewOnly: Boolean! ) {
    updateAccount(
      where: { email: $email }
      data: {
      status: PUBLISHED
      type: $type
      isViewOnly: $isViewOnly
    }) {
      id
      type
    }
  }
`

export const UPDATE_DISPLAY_NAME = gql`
  mutation updateAccount($id: ID!, $displayName: String!) {
    updateAccount(
      where: { id: $id }
      data: {
        displayName: $displayName
    }) {
      id
      displayName
    }
  }
`

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!,
    $type: String!) {
    createAccount(data: {
      status: PUBLISHED
      email: $email
      type: $type
    }) {
      id
      email
      type
    }
  }
`

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $email: String!,
    $displayName: String!,
    $type: String!,
    $isPublic: Boolean!,
    $twitter: String!,
    $nameFirst: String!) {
    updateAccount(
      where: { email: $email }
      data: {
      status: PUBLISHED
      type: $type
      displayName: $displayName
      isPublic: $isPublic
      twitter: $twitter
      nameFirst: $nameFirst
    }) {
      id
      displayName
    }
  }
`