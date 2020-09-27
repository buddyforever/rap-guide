import gql from 'graphql-tag'

export const GET_PLAYLIST_BY_SLUG = gql`
  query getPlaylist($slug: String!) {
    playlist(where: { slug: $slug }) {
      playlistId
      title
      slug
    }
  }
`