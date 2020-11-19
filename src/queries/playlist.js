import gql from 'graphql-tag'

export const GET_PLAYLIST_BY_SLUG = gql`
  query getPlaylist($slug: String!) {
    playlist(where: { slug: $slug }) {
      playlistId
      title
      slug
      isShowFilter
    }
  }
`

export const GET_PLAYLISTS_FOR_FILTER = gql`
  query getPlaylist {
    playlists(where: { isShowFilter: true }) {
      title
      slug
    }
  }
`