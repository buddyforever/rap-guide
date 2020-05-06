import gql from 'graphql-tag'

export const REVIEW_ANNOTATION = gql`
  mutation reviewAnnotation(
    $id: ID!,
    $isSubmitted: Boolean!,
    $isApproved: Boolean!,
    $comment: String,
    $teacherAccountId: ID
  ) {
    updateAnnotation(
      where: { id: $id },
      data: {
      	isSubmitted: $isSubmitted
      	isApproved:$isApproved
        comments: {
          create: {
            status: PUBLISHED
            comment: $comment
            account: {
              connect: {
                id: $teacherAccountId
              }
            }
          }
        }
    }){
      id
    }
  }
`

export const CREATE_ANNOTATION = gql`
  mutation createAnnotation(
    $isSubmitted: Boolean!,
    $account: ID!,
    $lesson: ID!,
    $annotation: String!,
    $lyrics: [LyricWhereUniqueInput!],
  ){
    createAnnotation(data: {
      status:PUBLISHED
      isSubmitted: $isSubmitted
      annotation: $annotation
      account: {
        connect: { id: $account }
      }
      lesson: {
        connect: { id: $lesson }
      }
      lyrics: { connect: $lyrics }
    }){
      id
      annotation
      updatedAt
      isSubmitted
      isApproved
      account {
        id
        nameFirst
        nameLast
        email
        image
      }
      lyrics {
        id
        lyric
      }
    }
  }
`

export const UPDATE_ANNOTATION = gql`
  mutation updateAnnotation(
    $id: ID,
    $isSubmitted: Boolean!,
    $annotation: String!,
    $lyrics: [LyricWhereUniqueInput!],
  ){
    updateAnnotation(
      where: { id: $id },
      data: {
      status:PUBLISHED
      isSubmitted: $isSubmitted
      annotation: $annotation
            lyrics: { connect: $lyrics }
    }){
      id
      annotation
      updatedAt
      isSubmitted
      isApproved
      account {
        id
        nameFirst
        nameLast
        email
        image
      }
      lyrics {
        id
        lyric
      }
    }
  }
`