import gql from 'graphql-tag'

export const REVIEW_ANNOTATION = gql`
  mutation reviewAnnotation(
    $id: ID!,
    $isSubmitted: Boolean!,
    $isApproved: Boolean!,
    $note: String,
    $teacherAccountId: ID
  ) {
    updateAnnotation(
      where: { id: $id },
      data: {
      	isSubmitted: $isSubmitted
      	isApproved:$isApproved
        notes: {
          create: {
            status: PUBLISHED
            note: $note
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
