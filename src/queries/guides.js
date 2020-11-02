import gql from 'graphql-tag'

export const GET_GUIDE_FOR_LESSON = gql`
  query getGuides {
    guides(where: { isLive: true }) {
      id
      videoId
      videoUrl
      videoTitle
      videoSlug
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
      videoSlug
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
      videoSlug
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

export const GET_GUIDE_BY_SLUG = gql`
  query getGuide($slug:String!) {
    guide(where: {videoSlug:$slug}) {
      id
      videoId
      videoUrl
      videoTitle
      videoThumb
      videoSlug
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
    $videoSlug: String!
    $topics:[TopicWhereUniqueInput!]){
      createGuide(data: {
        status: PUBLISHED
        videoTitle:$videoTitle
        videoUrl:$videoUrl
        videoId:$videoID
        videoThumb: $videoThumb
        videoSlug: $videoSlug
        topics: {
          connect: $topics
        }
      }){
        id
    }
  }
`

export const SEARCH_VIDEOS = gql`
  query searchVideos($term:String!) {
    guides(where: { _search: $term }) {
      id
      videoId,
			videoTitle,
      videoUrl,
      videoThumb,
      videoSlug,
      topics {
        id
        topic
      }
  	}
    topics(where: { _search: $term }) {
      id
      topic
      guides {
        id
      	videoId,
				videoTitle,
      	videoUrl,
      	videoThumb,
        videoSlug,
        topics {
          id
          topic
        }
      }
  	}
  }
`