


// import { gql } from '@apollo/client'

// const FOLLOW_REVENUE = gql`
// query ProfileFollowRevenue($profileId: ProfileFollowRevenueQueryRequest!) {
//     profileFollowRevenue(request: { profileId: $profileId }) {
//       revenues {
//         total {
//           asset {
//             name
//             symbol
//             decimals
//             address
//           }
//           value
//         }
//       }
//     }
//   }
	
// `

// export default FOLLOW_REVENUE


import { gql } from '@apollo/client'

const FOLLOW_REVENUE = gql`
query ProfileFollowRevenue($profileId: ProfileId!) {
  profileFollowRevenue(request: { profileId: $profileId }) {
    revenues {
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
}
	
`
export default FOLLOW_REVENUE
