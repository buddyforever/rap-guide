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
      minLikes
      numAnnotations
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
      minLikes
      numAnnotations
      accounts {
        id
        image
        email
        nameFirst
        nameLast
        displayName
        isPublic
        twitter
        type
        annotations(
          orderBy: order_ASC
          where: { lesson: {id: $id }}) {
          id
          annotation
          isSubmitted
          isApproved
          isRequestRevisions
          updatedAt
          createdAt
          account {
            id
            nameFirst
            nameLast
            displayName
            isPublic
            twitter
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
        notes(where: { lesson: {id: $id }}) {
          id
          note
          isExample
          lyrics {
            lyric
            id
            order
          }
        }
        annotations(
          orderBy: order_ASC
          where: { lesson: {id: $id }}) {
          id
          annotation
          updatedAt
          createdAt
          isSubmitted
          isApproved
          isRequestRevisions
          account {
            id
            nameFirst
            nameLast
            displayName
            isPublic
            twitter
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
              displayName
              isPublic
              twitter
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
      likes(where: {
        annotation: {
          lesson: {
            id: $id
          }
        }
      }) {
        id
      }
      annotations(where: {
        lesson: {
          id: $id
        }
      }){
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
    $accounts: [AccountWhereUniqueInput!],
    $minLikes: Int!,
    $numAnnotations: Int!
  ) {
    createLesson(data: {
      status: PUBLISHED
      lessonTitle: $lessonTitle
      lessonDescription: $lessonDescription
      lessonStatus: "Draft"
      maxStudents: $maxStudents
      guide: { connect: $guide }
      accounts: { connect: $accounts }
      minLikes: $minLikes
      numAnnotations: $numAnnotations
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
    $maxStudents: Int!,
    $minLikes: Int!,
    $numAnnotations: Int!
  ) {
    updateLesson(
      where: { id: $id }
      data: {
        status: PUBLISHED
        lessonTitle: $lessonTitle
        lessonDescription: $lessonDescription
        maxStudents: $maxStudents
        minLikes: $minLikes
        numAnnotations: $numAnnotations
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

export const ENROLL_STUDENT = gql`
  mutation updateAccount(
    $email:String!,
    $lesson: [LessonWhereUniqueInput!]
  ){
    updateAccount(
      where: { email: $email }
      data: {
        type: "student"
        lessons: { connect: $lesson }
      }){
      id
      lessons {
        id
        lessonTitle
      }
    }
  }
`;