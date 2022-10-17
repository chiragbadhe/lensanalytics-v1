import Image from 'next/image'
import { FC, useMemo } from 'react'
import { normalizeUrl } from '@/lib/utils'
import { LensProfile } from '@/types/lens'

const Avatar: FC<{ profile: LensProfile; className?: string }> = ({ profile, className = '' }) => {
	const avatarUrl = useMemo(() => {
		if (!profile) return
		if (!profile?.picture) return `https://avatar.tobi.sh/${profile.handle}.png`

		if (profile.picture?.uri) return normalizeUrl(profile.picture?.uri)
		return normalizeUrl(profile.picture.original.url)
	}, [profile])

	return (
		<div className={`relative flex items-center ${className}`}>
			{avatarUrl ? (
				<>
					<div className=" rounded-full bg-white/60 animate-pulse" />
					<Image
						src={avatarUrl}
						alt={profile?.name ?? profile?.handle}
						width={35}
						height={35}
						className="rounded-full"
					/>
				</>
			) : (
				''
			)}
		</div>
	)
}

export default Avatar
