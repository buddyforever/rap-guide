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

export const GET_LESSON_LIKES_BY_ACCOUNT = gql`
  query getLikes(
    $accountid: ID!,
  	$lessonid: ID!
  ) {
    likes(where: {
      account: {
        id:$accountid
      }
      annotation: {
        lesson:{
          id: $lessonid
        }
      }
    }
    ) {
			id
    }
  }
`