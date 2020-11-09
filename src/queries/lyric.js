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
      isGap
      annotations(
        orderBy: order_ASC
        where: {
          lesson: {
            id: $lessonID
          }
          #isApproved:1
      }) {
        id
        annotation
        lyrics {
          id
          lyric
          order
        }
        comments {
          id
          updatedAt
          comment
          account {
            id
            displayName
            nameFirst
            isPublic
            twitter
          }
        }
        updatedAt
        createdAt
        account {
          id
          displayName
          email
        }
        likes {
          id
          account {
            id
          }
        }
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

export const GET_PUBLIC_LYRICS_BY_GUIDE_ID = gql`
  query getLyrics(
    $guideID: ID!
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
      isGap
      seconds
      annotations(
        orderBy: order_ASC
        where: {isPublic: true}) {
        id
        annotation
        lyrics {
          id
          lyric
          order
        }
        comments {
          id
          updatedAt
          comment
          account {
            id
            displayName
            nameFirst
            isPublic
            twitter
          }
        }
        updatedAt
        createdAt
        account {
          id
          displayName
        }
        likes {
          id
          account {
            id
          }
        }
      }
    }
  }
`