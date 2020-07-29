import gql from 'graphql-tag'

export const CREATE_COMMENT = gql`
  mutation createComment(
    $comment: String!,
    $annotationId: ID!,
    $account: ID!,
    $isPublic: Boolean!
  ){
    createComment(data: {
      status:PUBLISHED
      comment: $comment
      isPublic: $isPublic
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
      isPublic
      account {
        id
        displayName
      }
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment(
    $id: ID!
  ){
    deleteComment(where: {
      id: $id
    }){
      id
    }
  }
`