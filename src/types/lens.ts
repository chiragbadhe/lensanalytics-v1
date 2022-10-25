export type LensProfile = {
	attributes: any
	metadata: any
	name: string
	handle: string
	picture?: {
		original?: {
			url: string
			mimeType: string
		}
		uri?: string
	}
	coverPicture?: {
		original?: {
			url: string
			mimeType: string
		}
		uri?: string
	}
	stats: {
		totalPosts: number
		totalFollowers: number
		totalFollowing: number
		totalCollects: number
		totalPublications: number
	}
}

