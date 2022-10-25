import Image from 'next/image'
import { FC, useMemo } from 'react'
import { normalizeUrl } from '@/lib/utils'
import { LensProfile } from '@/types/lens'

export const Avatar: FC<{ profile: LensProfile; className?: string; height?: any; width?: any }> = ({
	profile,
	height,
	width,
	className = '',
}) => {
	const avatarUrl = useMemo(() => {
		if (!profile) return
		if (!profile?.picture) return `https://avatar.tobi.sh/${profile.handle}.png`
		if (profile.picture?.uri) return normalizeUrl(profile.picture?.uri)
		return normalizeUrl(profile && profile.picture && profile.picture.original && profile.picture.original.url)
	}, [profile])

	return (
		<div className={`relative flex items-center ${className}`}>
			{avatarUrl ? (
				<>
					<div className=" rounded-full bg-white/60 animate-pulse" />
					<Image
						src={avatarUrl}
						alt={profile?.name ?? profile?.handle}
						width={height}
						height={width}
						className="rounded-full"
					/>
				</>
			) : (
				''
			)}
		</div>
	)
}

export const Cover: FC<{ profile: LensProfile; className?: string; height?: any; width?: any }> = ({
	profile,
	height,
	width,
	className = '',
}) => {
	const avatarUrl = useMemo(() => {
		if (!profile) return
		if (!profile?.picture) return `https://avatar.tobi.sh/${profile.handle}.png`
		if (profile.picture?.uri) return normalizeUrl(profile.picture?.uri)
		return normalizeUrl(profile && profile.coverPicture && profile.coverPicture.original.url)
	}, [profile])

	return (
		<div className={`relative flex items-center ${className}`}>
			{avatarUrl ? (
				<>
					<div className=" bg-white/60 animate-pulse" />
					<Image
						src={avatarUrl}
						loading="lazy"
						alt={profile?.name ?? profile?.handle}
						width={width}
						height={height}
						className=""
					/>
				</>
			) : (
				''
			)}
		</div>
	)
}
