import gql from 'graphql-tag'

export const GET_CODE = gql`
  query getAccessCode($code: String!) {
    code(where: {
      accessCode: $code
    }){
      id
      action
    }
  }
`