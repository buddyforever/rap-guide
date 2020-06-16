import gql from 'graphql-tag'

export const GET_ALL_TOPICS = gql`
  query getTopics {
    topics {
      id
      topic
      guides {
        id
      }
    }
  }
`

export const ADD_TOPIC_TO_GUIDE = gql`
  mutation addTopicToGuide(
    $topic:String!,
    $guideID: ID!){
      createTopic(data: {
        status: PUBLISHED
        topic: $topic,
        guides: {
          connect: { id: $guideID }
        }
      }){
        id
    }
  }
`

export const CONNECT_TOPIC_TO_GUIDE = gql`
  mutation connectTopicToGuide(
    $topicID:ID!,
    $guideID: ID!){
      updateGuide(
        where: { id: $guideID },
        data: {
        topics: {
          connect: { id: $topicID }
        }
      }){
        id
    }
  }
`