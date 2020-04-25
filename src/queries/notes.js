import gql from 'graphql-tag'

export const CREATE_NOTE = gql`
  mutation createNote(
    $note: String!,
    $annotationId: ID!,
    $account: ID!
  ){
    createNote(data: {
      status:PUBLISHED
      note: $note
      annotation:{
        connect: { id: $annotationId }
      }
      account: {
        connect: { id: $account }
      }
    }){
      id
      updatedAt
      note
      account {
        nameFirst
        nameLast
        image
      }
    }
  }
`