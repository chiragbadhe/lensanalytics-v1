

import { gql } from '@apollo/client'

const GET_PROFILE = gql`
query Profile($userHandle: Handle!) {
    profile(request: { handle: $userHandle }) {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
    }
  }
`

export default GET_PROFILE


  




