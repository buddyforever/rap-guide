import gql from 'graphql-tag'

export const GET_ACCOUNT_BY_EMAIL = gql`
  query getAccount($email: String!) {
    account(where: {
      email: $email
    }){
      id
      type
      displayName
    }
  }
`

export const UPDATE_ACCOUNT_TYPE = gql`
  mutation updateAccount($email: String!,$type: String!) {
    updateAccount(
      where: { email: $email }
      data: {
      status: PUBLISHED
      type: $type
    }) {
      id
      type
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
  mutation updateAccount($email: String!,$displayName: String!, $type: String!) {
    updateAccount(
      where: { email: $email }
      data: {
      status: PUBLISHED
      type: $type
      displayName: $displayName
    }) {
      id
      displayName
    }
  }
`