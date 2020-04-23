import gql from 'graphql-tag'

export const GET_ACCOUNT_BY_EMAIL = gql`
  query getAccount($email: String!) {
    account(where: {
      email: $email
    }){
      id
      accountId
      email
      nameFirst
      nameLast
      type
    }
  }
`

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount($email: String!,$nameFirst: String!,$nameLast: String!,$type: String!,$accountId: String!) {
    updateAccount(
      where: { accountId: $accountId }
      data: {
      status: PUBLISHED
      email: $email
      nameFirst: $nameFirst
      nameLast: $nameLast
      type: $type
    }) {
      id
      accountId
      nameFirst
      nameLast
      email
      type
    }
  }
`
