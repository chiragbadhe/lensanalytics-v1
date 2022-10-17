import { gql } from '@apollo/client'

const GLOBAL_STATS = gql`
	query GlobalProtocolStats {
		globalProtocolStats(request: null) {
	    totalProfiles
	    totalBurntProfiles
	    totalPosts
	    totalMirrors
	    totalComments
	    totalCollects
	    totalFollows
	    totalRevenue {
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
`


export default GLOBAL_STATS

