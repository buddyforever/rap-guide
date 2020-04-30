import gql from 'graphql-tag'

export const CREATE_COMMENT = gql`
  mutation createcomment(
    $comment: String!,
    $annotationId: ID!,
    $account: ID!
  ){
    createcomment(data: {
      status:PUBLISHED
      comment: $comment
      annotation:{
        connect: { id: $annotationId }
      }
      account: {
        connect: { id: $account }
      }
    }){
      id
      updatedAt
      comment
      account {
        nameFirst
        nameLast
        image
      }
    }
  }
`