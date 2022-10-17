/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
import Avatar from './Avatar'
import { Filter } from '@/types/ui'
import { LensProfile } from '@/types/lens'
import Skeleton from 'react-loading-skeleton'
import { numberWithCommas } from '@/lib/utils'
import getAttribute from '../lib/getAttributes'

const ProfileCard: FC<{ profile: LensProfile; i: number; filter: Filter; loading: Boolean }> = ({
	profile,
	i,
	filter,
	loading,
}) => {
	return (
		<table className="table-fixed sm:w-full text-left  w-[700px] overflow-x-scroll">
			<tbody className=" py-[15px] text-left border-b-2 border-[#3B3E3E]/20   text-[#A1A1A1]">
				<tr className="hover:bg-[#101010] hover:text-[#AAFE2E] transition duration-100">
					<td className="w-[70px]  text-center">
						{!loading ? (
							<div className={` ${i >= 1000 ? 'text-[16px] ' : i >= 100 ? 'text-[16px]' : ''}`}>{i}</div>
						) : (
							<Skeleton width={30} height={20} />
						)}
					</td>
					<td className="overflow-x-scroll mr-[50px] ">
						<div className="flex items-center space-x-[12px] ">
							<Avatar profile={profile} />

							<a
								target="_blank"
								href={profile ? `https://lenster.xyz/u/${profile?.handle}` : null}
								rel="noreferrer"
							>
								{!loading ? (
									profile?.handle ? (
										`@${profile.handle}`
									) : (
										'--'
									)
								) : (
									<Skeleton width={150} height={20} />
								)}
							</a>
						</div>
					</td>
					<td className="overflow-x-scroll flex space-x-[12px] items-center h-[70px]">
						{!loading ? (
							<>
								{/* <img
									className="w-[20px] h-[20px] opacity-70"
									src="https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"
									alt="twitter_svg"
								/> */}
								<div>
									{getAttribute(profile?.attributes, 'twitter') ? (
										<a
											href={`https://twitter.com/${getAttribute(profile?.attributes, 'twitter')}`}
											target="_blank"
											rel="noreferrer noopener"
										>
											@
											{getAttribute(profile?.attributes, 'twitter')?.replace(
												'https://twitter.com/',
												''
											)}
										</a>
									) : (
										<p>---</p>
									)}
								</div>
							</>
						) : (
							<Skeleton width={150} height={20} />
						)}
					</td>
					<td className="text-center w-[100px]">
						{!loading ? (
							<p className=" ">
								{numberWithCommas(profile ? filter && filter.item(profile) : <Skeleton width={40} />)}
							</p>
						) : (
							<Skeleton width={70} height={20} />
						)}
					</td>
				</tr>
			</tbody>
		</table>
	)
}

export default ProfileCard
