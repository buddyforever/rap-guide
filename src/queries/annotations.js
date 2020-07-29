import gql from 'graphql-tag'

export const GET_ANNOTATIONS_BY_ACCOUNT = gql`
  query getAnnotations(
    $id: ID!
  	$maxNum: Int = 5
  ) {
    annotations(
      first: $maxNum
      orderBy: updatedAt_ASC
      where: {
      account: {
	      id: $id
      }
    }){
      id
      annotation
      isSubmitted
      isApproved
      isRequestRevisions
      lyrics {
        lyric
      }
      updatedAt
      lesson {
        id
        lessonTitle
      }
      comments {
        id
        updatedAt
        comment
        account {
          id
          nameFirst
          nameLast
        }
      }
    }
  }
`

export const REVIEW_ANNOTATION = gql`
  mutation reviewAnnotation(
    $id: ID!,
    $isSubmitted: Boolean!,
    $isApproved: Boolean!,
    $isRequestRevisions: Boolean!,
    $comment: String,
    $teacherAccountId: ID
  ) {
    updateAnnotation(
      where: { id: $id },
      data: {
      	isSubmitted: $isSubmitted
      	isApproved:$isApproved
        isRequestRevisions: $isRequestRevisions
        comments: {
          create: {
            status: PUBLISHED
            isPublic: false
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

export const GET_ANNOTATIONS_BY_LESSON_ID = gql`
  query getAnnotations(
    $id: ID!
  ) {
    annotations(
      where: {
      lesson: {
	      id: $id
      }
      isSubmitted: true
    }){
      id
      annotation
      isSubmitted
      isApproved
      isRequestRevisions
      lyrics {
        lyric
      }
      updatedAt
      lesson {
        id
        lessonTitle
      }
      likes {
        account {
          id
        }
      }
      comments {
        id
        updatedAt
        comment
        account {
          id
          nameFirst
          nameLast
        }
      }
      account {
        nameFirst
        nameLast
        email
        twitter
        isPublic
        displayName
      }
    }
  }
`