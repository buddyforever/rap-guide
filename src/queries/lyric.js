import gql from 'graphql-tag'

export const GET_LESSON_LYRICS_BY_GUIDE_ID = gql`
  query getLyrics(
    $guideID: ID!,
    $lessonID: ID!
    ) {
    lyrics(
      where: {
        guide: {
          id: $guideID
        }
      }
      orderBy: order_ASC
    ){
      id
      lyric
      order
      bar
      annotations(where: {
        lesson: {
          id: $lessonID
        }
        isApproved:true
      }) {
        id
        annotations
      }
    }
  }
`

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
