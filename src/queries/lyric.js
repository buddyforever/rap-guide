import gql from 'graphql-tag'

export const ASSIGN_LYRIC = gql`
  mutation assignLyric(
    $lessonId: ID!,
    $lyricId: ID!
  ){
    updateLesson(
      where: { id:$lessonId }
      data: {
        lyrics: {
          connect: { id: $lyricId }
        }
    }) {
      id
    }
  }
`

export const UNASSIGN_LYRIC = gql`
  mutation unAssignLyric(
    $lessonId: ID!,
    $lyricId: ID!
  ){
    updateLesson(
      where: { id:$lessonId }
      data: {
        lyrics: {
          disconnect: { id: $lyricId }
        }
    }) {
      id
    }
  }
`