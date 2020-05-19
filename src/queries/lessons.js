import gql from 'graphql-tag'

export const GET_LESSONS_BY_ACCOUNT = gql`
  query getLessons($id: ID!) {
    lessons(where: {accounts_some: { id: $id } }){
      id
      lessonTitle
      lessonDescription
      lessonStatus
      maxStudents
      dueDate
      accounts {
        id
        image
        email
        nameFirst
        nameLast
        type
        annotations {
          id
          annotation
        }
      }
      lyrics {
        id
        lyric
        notes {
          id
          note
          isExample
          lyrics {
            lyric
            id
            order
          }
        }
        annotations{
          id
          annotation
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
      topics {
        id
        topic
      }
      guide {
        id
        videoId
        videoUrl
        videoTitle
        videoThumb
        topics {
          topic
        }
        lyrics(orderBy: order_ASC) {
          id
          lyric
          order
          bar
        }
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
      lessonStatus
      maxStudents
      dueDate
      accounts {
        id
        image
        email
        nameFirst
        nameLast
        type
        annotations {
          id
          annotation
          isSubmitted
          isApproved
          isRequestRevisions
          updatedAt
          account {
            id
            nameFirst
            nameLast
            email
          }
          lyrics {
            id
            lyric
            order
          }
        }
      }
      lyrics {
        id
        lyric
        notes {
          id
          note
          isExample
          lyrics {
            lyric
            id
            order
          }
        }
        annotations {
          id
          annotation
          updatedAt
          isSubmitted
          isApproved
          isRequestRevisions
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
            order
          }
          comments {
            comment
            updatedAt
            account {
              id
              nameFirst
              nameLast
              image
              email
            }
          }
        }
      }
      topics {
        id
        topic
      }
      guide {
        id
        videoId
        videoUrl
        videoTitle
        videoThumb
        topics {
          topic
        }
        lyrics(orderBy: order_ASC) {
          id
          lyric
          order
          bar
        }
      }
    }
  }
`

export const GET_LESSON_STUDENTS = gql`
  query getAccounts($id: ID!) {
    accounts(where: {
      type_not: "educator"
      lessons_some: {
      	id: $id
      }
    }) {
 			id
      nameFirst
      nameLast
      email
      image
      annotations{
        id
        annotation
        isSubmitted
        isApproved
        isRequestRevisions
        updatedAt
        comments {
          id
          updatedAt
          comment
          account {
            id
            nameFirst
            nameLast
            email
            image
          }
        }
        account {
          id
          nameFirst
          nameLast
          email
          image
        }
        lyrics(orderBy: order_ASC) {
          id
          lyric
          order
        }
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
    $accounts: [AccountWhereUniqueInput!]
  ) {
    createLesson(data: {
      status: PUBLISHED
      lessonTitle: $lessonTitle
      lessonDescription: $lessonDescription
      maxStudents: $maxStudents
      guide: { connect: $guide }
      accounts: { connect: $accounts }
    }){
    id
    }
  }
`

export const UPDATE_LESSON_DETAILS = gql`
  mutation updateLesson(
    $id: ID!,
    $lessonTitle:String!,
    $lessonDescription:String!,
    $maxStudents: Int!
  ) {
    updateLesson(
      where: { id: $id }
      data: {
        status: PUBLISHED
        lessonTitle: $lessonTitle
        lessonDescription: $lessonDescription
        maxStudents: $maxStudents
      }){
    id
    }
  }
`

export const UPDATE_LESSON_STATUS = gql`
  mutation updateLesson(
    $id: ID!,
    $lessonStatus: String!
  ) {
    updateLesson(
      where: { id: $id }
      data: {
        lessonStatus: $lessonStatus
      }){
    id
    lessonStatus
    }
  }
`