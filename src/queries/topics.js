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
        #status: PUBLISHED
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

export const PUBLISH_TOPIC = gql`
  mutation publishTopic($ID: ID!){
    publishTopic(where: { id: $ID }, to: PUBLISHED) {
      id
      note
      isExample
      lyrics(orderBy: order_ASC) {
        id
        topic
      }
  	}
  }
`