import gql from 'graphql-tag'

export const GET_ALL_GUIDES = gql`
  query getGuides {
    guides {
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