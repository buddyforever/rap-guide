import gql from 'graphql-tag'

export const GET_GUIDE_FOR_LESSON = gql`
  query getGuides {
    guides(where: { isLive: true }) {
      id
      videoId
      videoUrl
      videoTitle
    }
  }
`

export const GET_ALL_GUIDES = gql`
  query getGuides {
    guides(where: { isLive: true }) {
      id
      videoId
      videoUrl
      videoTitle
      videoThumb
      topics {
        id
        topic
        lessons {
          id
        }
      }
      lessons(where: {isLive:true}) {
        id
        status
        annotations(where: {isSubmitted:true}) {
          id
        }
        accounts {
          id
        }
      }
    }
    topics{
      id
      topic
      guides{
        id
      }
    }
  }
`

export const GET_GUIDE_BY_ID = gql`
  query getGuide($id:ID!) {
    guide(where: {id:$id}) {
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
`

export const CREATE_GUIDE = gql`
  mutation addGuide(
    $videoTitle:String!,
    $videoUrl:String!,
    $videoID:String!,
    $videoThumb: String!
    $topics:[TopicWhereUniqueInput!]){
      createGuide(data: {
        status: PUBLISHED
        videoTitle:$videoTitle
        videoUrl:$videoUrl
        videoId:$videoID
        videoThumb: $videoThumb
        topics: {
          connect: $topics
        }
      }){
        id
    }
  }
`