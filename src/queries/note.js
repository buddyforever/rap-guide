import gql from 'graphql-tag'

export const CREATE_NOTE = gql`
  mutation createNote(
    $note: String!,
    $account: AccountWhereUniqueInput!,
    $lyrics: [LyricWhereUniqueInput!],
    $lesson: ID!
  ){
    createNote(
      data: {
        status: PUBLISHED
        note: $note
        account: { connect: $account }
        lyrics: { connect: $lyrics }
        lesson: {
          connect: {id: $lesson}
        }
    }) {
      id
    }
  }
`

export const DELETE_NOTE = gql`
  mutation deleteNote(
    $note: NoteWhereUniqueInput!
  ){
    deleteNote( where: $note ){
      id
    }
  }
`