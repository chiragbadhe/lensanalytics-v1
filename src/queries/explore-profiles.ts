import { gql } from '@apollo/client'

const EXPLORE_PROFILES = gql`
	query ExploreProfiles($sortCriteria: ProfileSortCriteria!, $cursor: Cursor) {
		exploreProfiles(request: { sortCriteria: $sortCriteria, limit: 25, cursor: $cursor }) {
			items {
				name
				handle
				attributes {
      displayType
      traitType
      key
      value
    }
				picture {
					... on MediaSet {
						original {
							url
							mimeType
						}
					}
					... on NftImage {
						uri
					}
				}
				stats {
					totalPosts
					totalFollowers
					totalFollowing
					totalCollects
					totalPublications
				}
			}
		}
	}
`

export default EXPLORE_PROFILES
