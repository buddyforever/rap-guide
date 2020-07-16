import gql from 'graphql-tag'

export const CREATE_LIKE = gql`
  mutation createLike(
    $annotation: AnnotationWhereUniqueInput!,
    $account: AccountWhereUniqueInput!
  ){
    createLike(data: {
      status:PUBLISHED
      annotation: {
        connect:$annotation
      }
      account: {
        connect:$account
      }
    }){
      id
    }
  }
`

export const DELETE_LIKE = gql`
  mutation deleteLike(
    $id: ID!,
  ){
    deleteLike(where: {
      id: $id
    }){
      id
    }
  }
`

