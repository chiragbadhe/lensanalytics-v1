import FOLLOW_REVENUE from "@/queries/follow-revenue"
import TOTAL_REVENUE from "@/queries/total-revenue"
import { useQuery } from "@apollo/client"

export const TotalRevenue = (profileId: any) => {
	const { Id } = profileId
	const { data, loading, error, refetch } = useQuery(TOTAL_REVENUE, {
		variables: { profileId: Id },
	})
	const getPyblicationRevenue = data && data.profilePublicationRevenue && data.profilePublicationRevenue.items
	
	const totalRevenue =
		getPyblicationRevenue &&
		getPyblicationRevenue
			.map((mapData: any) => {
				return +mapData.revenue.total.value
			})
			.reduce((a: any, b: any) => a + b)

	return totalRevenue
}


export const FollowRevenue = (profileId: any) => {
	const { Id } = profileId
	const { data, loading, error, refetch } = useQuery(FOLLOW_REVENUE, {
		variables: { profileId: Id },
	})
	const followRevenue =
		data && data.profileFollowRevenue && data.profileFollowRevenue.revenues.value
			? data.profileFollowRevenue.revenues.value
			: '0'

	return followRevenue
}