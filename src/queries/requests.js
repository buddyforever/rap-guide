import gql from 'graphql-tag'

export const CREATE_REQUEST = gql`
  mutation createRequest(
    $title: String!,
    $account: ID!,
    $urls: String!,
    $thumb: String!,
    $information: String!
  ){
    createRequest(
      data: {
        #status: PUBLISHED
        title: $title
        account: {
          connect: { id: $account }
        }
        urls: $urls
        thumb: $thumb
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
      urls
      account {
        id
        email
        image
        nameFirst
        nameLast
        twitter
        isPublic
        displayName
      }
      updatedAt
    }
  }
`

export const PUBLISH_REQUEST = gql`
  mutation publishRequest($ID: ID!){
    publishRequest(where: { id: $ID }, to: PUBLISHED) {
    	id
      title
      information
  	}
  }
`

// Need to make an approval process for the requests that get submitted. Then a commenting process.