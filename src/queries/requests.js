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
        isApproved: false
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
      where: { isApproved: true }
      orderBy:createdAt_DESC
      first: 30) {
      id
      title
      information
      updatedAt
    }
  }
`

// Need to make an approval process for the requests that get submitted. Then a commenting process.