import gql from 'graphql-tag'

export const GET_LESSONS_BY_ACCOUNT = gql`
  query getLessons($id: ID!) {
    lessons(where: {
      OR: [
        { account: { id: $id } }
        { lessonStudents_some: {
            account: {
              id: $id
            }
        }}
      ]
    }) {
      id
      lessonTitle
      lessonDescription
      maxStudents
      lessonStudents {
        account {
          id
        }
      }
      account {
        id
      }
      guide {
        videoTitle
        videoThumb
        lyrics {
          id
          lyric
        }
      }
      lessonLyrics {
        lyric {
          id
          lyric
        }
        isAssigned
      }
      lessonStudents {
        account {
          email
        }
      }
      topics {
        id
        topic
      }
    }
  }
`

export const GET_LESSON_BY_ID = gql`
  query getLesson($id: ID!) {
    lesson(where: { id: $id }) {
      id
      lessonTitle
      lessonDescription
      maxStudents
      account {
        id
      }
      guide {
        videoUrl
        videoTitle
        topics {
          id
          topic
        }
        lyrics {
          id
          lyric
          lessonLyrics(where: { lesson: {id: $id } }) {
            id
            annotations {
              id
              annotation
              isSubmitted
              isApproved
            }
            isAssigned
            isExample
            notes
          }
        }
      }
      lessonLyrics(where: { lesson: {id: $id } }) {
        lyric {
          id
          lyric
        }
        annotations{
          id
          annotation
          isSubmitted
          isApproved
        }
        isAssigned
      }
      lessonStudents(where: { lessons_some: {id: $id } }) {
        account {
          id
          nameFirst
          nameLast
          email
          image
          annotations(where: { lessonLyric: {lesson: {id: $id} } }) {
            isSubmitted
            isApproved
          }
        }
      }
      topics {
        id
        topic
      }
    }
  }
`

export const CREATE_LESSON = gql`
  mutation createLesson(
    $lessonTitle:String!,
    $lessonDescription:String!,
    $maxStudents: Int!,
    $guide: GuideWhereUniqueInput!,
    $account: AccountWhereUniqueInput!,
    $topics: [TopicCreateWithoutLessonsInput!],
    $lessonLyrics: [LessonLyricCreateWithoutLessonInput!]
  ) {
    createLesson(data: {
      status: PUBLISHED
      lessonTitle: $lessonTitle
      lessonDescription: $lessonDescription
      maxStudents: $maxStudents
      guide: { connect: $guide }
      account: { connect: $account }
      topics: { create: $topics }
      lessonLyrics: { create: $lessonLyrics }
    }){
    id
    }
  }
`