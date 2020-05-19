import gql from 'graphql-tag'

export const CREATE_NOTE = gql`
  mutation createNote(
    $note: String!,
    $isExample: Boolean!,
    $account: AccountWhereUniqueInput!,
    $lyrics: [LyricWhereUniqueInput!],
    $lesson: ID!
  ){
    createNote(
      data: {
        status: PUBLISHED
        note: $note
        isExample: $isExample
        account: { connect: $account }
        lyrics: { connect: $lyrics }
        lesson: {
          connect: {id: $lesson}
        }
    }) {
      id
      note
      isExample
      lyrics(orderBy: order_ASC) {
        id
        lyric
        order
      }
    }
  }
`

export const UPDATE_NOTE = gql`
  mutation updateNote(
    $id: ID!,
    $note: String!,
    $isExample: Boolean!,
  ){
    updateNote(
      where: { id: $id }
      data: {
        note: $note
        isExample: $isExample
    }) {
      id
      note
      isExample
      lyrics {
        id
      }
    }
  }
`

export const DELETE_NOTE = gql`
  mutation deleteNote(
    $id: ID!
  ){
    deleteNote( where: { id: $id } ){
      id
    }
  }
`