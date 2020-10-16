import gql from 'graphql-tag'

export const GET_ACCOUNT_BY_EMAIL = gql`
  query getAccount($email: String!) {
    account(where: {
      email: $email
    }){
      id
      type
      email
      displayName
      image
      nameFirst
      nameLast
      isPublic
      twitter
      isViewOnly
      instructorName
      institutionName
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
  mutation updateAccount($email: String!, $displayName: String!) {
    updateAccount(
      where: { email: $email }
      data: {
        displayName: $displayName
    }) {
      id
      displayName
    }
  }
`

export const UPDATE_NAME_AND_PICTURE = gql`
  mutation updateAccount(
    $email: String!,
    $nameFirst: String!,
    $nameLast: String!,
    $image: String!
  ) {
    updateAccount(
      where: { email: $email }
      data: {
        nameFirst: $nameFirst
        nameLast: $nameLast
        image: $image
    }) {
      id
    }
  }
`

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!,
    $nameFirst: String!,
    $nameLast: String!,
    $image: String!,
    $type: String!) {
    createAccount(data: {
      status: PUBLISHED
      email: $email
      nameFirst: $nameFirst
      nameLast: $nameLast
      image: $image
      type: $type
    }) {
      id
      email
      nameFirst
      nameLast
      image
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