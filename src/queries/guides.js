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