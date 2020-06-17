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

export const CREATE_TOPIC = gql`
  mutation addTopic(
    $topic:String!){
      createTopic(data: {
        status: PUBLISHED
        topic: $topic
      }){
        id
        topic
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