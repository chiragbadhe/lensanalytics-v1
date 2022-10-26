import { gql } from "@apollo/client"

const TOTAL_REVENUE = gql`
query Revenue($profileId: ProfileId!) {
    profilePublicationRevenue(request: { profileId: $profileId, limit: 10 }) {
      items {
        revenue {
          total {
            asset {
              name
              symbol
              decimals
              address
            }
            value
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
	
`
export default TOTAL_REVENUE
