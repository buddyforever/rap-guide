import gql from 'graphql-tag'

export const CREATE_REQUEST = gql`
  mutation createRequest(
    $title: String!,
    $name: String!,
    $email: String!,
    $information: String!
  ){
    createRequest(
      data: {
        status: PUBLISHED
        title: $title
        name: $name
        email: $email
        information: $information
    }) {
      id
      title
      information
    }
  }
`

export const GET_REQUESTS = gql`
  query getRequests {
    requests(
      orderBy:createdAt_DESC
      first: 30) {
      id
      title
      information
      updatedAt
    }
  }
`