

import { gql } from '@apollo/client'

const SEARCH_PROFILES = gql`
query Search($searchProfile: Search!) {
    search(request: {query: $searchProfile, type: PROFILE, limit: 25,}) {
      ... on ProfileSearchResult {
        __typename 
        items {
          ... on Profile {
            ...ProfileFields
          }
        }
        pageInfo {
          prev
          totalCount
          next
        }
      }
    }
  }
  
  fragment MediaFields on Media {
    url
    mimeType
  }
  
  fragment ProfileFields on Profile {
    profileId: id,
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    isFollowedByMe
    isFollowing(who: null)
    followNftAddress
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
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
    followModule {
      ... on FeeFollowModuleSettings {
      type
      amount {
        asset {
          name
          symbol
          decimals
          address
        }
        value
      }
      recipient
      }
      ... on ProfileFollowModuleSettings {
        type
        contractAddress
      }
      ... on RevertFollowModuleSettings {
        type
        contractAddress
      }
      ... on UnknownFollowModuleSettings {
        type
        contractAddress
        followModuleReturnData
      }
    }
  }
`

export default SEARCH_PROFILES


  