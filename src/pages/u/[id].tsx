/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Skeleton from 'react-loading-skeleton'
import GET_PROFILE from '@/queries/get-profile'
import TOTAL_REVENUE from '@/queries/total-revenue'
import FOLLOW_REVENUE from '@/queries/follow-revenue'

import revenue from '../../assets/revenue.svg'
import mirrors from '../../assets/mirrors.svg'
import collects from '../../assets/collects.svg'
import comments from '../../assets/comments.svg'
import lensterLogo from '../../assets/lenster.svg'
import openseaLogo from '../../assets/opensea.svg'
import arrowRight from '../../assets/right-arrow.svg'

import publication from '../../assets/publication.svg'

import polygonLogo from '../../assets/polygon.png'

import { useState } from 'react'
import { nFormatter } from '@/lib/utils'
import ReactTooltip from 'react-tooltip'
import { Avatar, Cover } from '@/components/Avatar'

const RevenueByPost: any = (profileId: any) => {
	const [postRevenue, setPostRevenue] = useState(null)
	const { Id } = profileId
	const { data, loading, error } = useQuery(TOTAL_REVENUE, {
		variables: { profileId: Id },
	})


	const getPyblicationRevenue = data && data.profilePublicationRevenue && data.profilePublicationRevenue.items

	console.log({ getPyblicationRevenue })

	if (!getPyblicationRevenue) return 'loading'

	return (
		<>
			{getPyblicationRevenue.length ? (
				getPyblicationRevenue.map((data, i) => {
					return (
						<tr
							key={i}
							className="text-left border-b-2 border-[#3B3E3E]/50  text-[#A1A1A1] hover:text-[#AAFE2E] duration-300 hover:bg-[#101010]"
						>
							<td className=" py-[15px] text-center w-[100px]">{i + 1}</td>
							<td>
								<a
									className=""
									href={`https://lenster.xyz/posts/${
										data && data.publication && data.publication.id
									}`}
								>
									{data && data.publication && data.publication.id}{' '}
								</a>
							</td>
							<td className="text-center w-[200px]">
								{data && data.revenue && data.revenue.total && data.revenue.total.value} MATIC
							</td>
						</tr>
					)
				})
			) : (
				<div>
					<p className="text-center w-[1100px] mt-[20px]">No posts available.</p>
				</div>
			)}
		</>
	)
}

const TotalRevenue = (profileId: any) => {
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
			.reduce((a: any, b: any) => a + b, 0)

	return totalRevenue
}

const Revenue = (profileId: any) => {
	const [toggleRevenue, setToggleRevenue]: any = useState(null)
	const { Id } = profileId
	const { data, loading, error, refetch } = useQuery(FOLLOW_REVENUE, {
		variables: { profileId: Id },
	})

	const getFollowRevenueValue =
		data &&
		data.profileFollowRevenue &&
		data.profileFollowRevenue.revenue &&
		data.profileFollowRevenue.revenue.total &&
		data.profileFollowRevenue.revenue.total.value

	const followRevenue = getFollowRevenueValue ? getFollowRevenueValue : '0'

	const totalRevenue = TotalRevenue(profileId)

	return (
		<div className="bg-[#101010] rounded-[10px] p-[25px] sm:p-0 flex space-x-[15px] items-center justify-center sm:row-span-2">
			<div className="flex sm:flex-col space-x-[12px] sm:space-x-0 items-center space-y-[12px]">
				<Image className="h-[50px] w-[50px]" src={revenue} alt="" />

				<div className="text-center">
					<span className="text-[16px] opacity-60">Total Revenue</span>
					<p className="text-[30px] font-semibold">
						<span>{nFormatter(totalRevenue + followRevenue)}</span>
						<span className="font-thin opacity-50 text-[20px]">&nbsp; MATIC</span>
					</p>
					<button
						onClick={() => (!toggleRevenue ? setToggleRevenue(true) : setToggleRevenue(false))}
						className="text-[14px] opacity-50 mt-[12px] underline"
					>
						View Breakdown
					</button>

					{toggleRevenue ? (
						<div className="flex text-left space-x-[20px] mt-[12px]">
							<div>
								<span className="text-[16px]">Follow</span>

								<p>
									<span>{nFormatter(followRevenue)}</span>
									<span className="font-thin opacity-50 text-[16px]">&nbsp; MATIC</span>
								</p>
							</div>
							<div>
								<span className="text-[16px]">Collects </span>
								<p>
									<span>{nFormatter(totalRevenue)}</span>
									<span className="font-thin opacity-50 text-[16px]">&nbsp; MATIC</span>
								</p>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	)
}

const User = () => {
	const router = useRouter()
	const { id } = router.query
	const { data, loading, error, refetch } = useQuery(GET_PROFILE, {
		variables: { userHandle: id },
	})

	return (
		<main>
			<section className="container mx-auto max-w-[1100px]">
				<Link href="/">
					<p className="py-[30px] cursor-pointer">
						<span className="arro">
							<Image src={arrowRight} height={10} alt="" />
						</span>

						<span>Go Back</span>
					</p>
				</Link>
				<div>
					<div>
						<div className="w-full ">
							<div className="overflow-hidden  rounded-[10px] opacity-80">
								{!loading && data.profile.coverPicture ? (
									<Cover height={300} width={1100} profile={data.profile} />
								) : (
									<div className="h-[300px] w-[1100px] bg-gradient-to-r from-cyan-500 to-blue-500 bg-opacity-70  items-center flex justify-center">
										{!loading ? 'Cover picture not found 😢' : 'loading...'}
									</div>
								)}
							</div>
						</div>

						<div className="w-full px-[15px] sm:px-[30px]">
							<div>
								<div className=" flex sm:-mt-[75px] -mt-[50px] justify-between ">
									<div className="  rounded-full  shadow">
										{!loading ? (
											<>
												<div className="sm:hidden">
													<Avatar height={100} width={100} profile={data.profile} />
												</div>
												<div className="hidden sm:block">
													<Avatar height={170} width={170} profile={data.profile} />
												</div>
											</>
										) : (
											''
										)}
									</div>
									<div className="justify-end flex items-center space-x-[12px] mt-[50px]">
										{!loading ? (
											<>
												<a
													target="_blank"
													href={`https://lenster.xyz/u/${data.profile.handle}`}
													rel="noreferrer"
												>
													<Image
														loading="lazy"
														src={lensterLogo}
														height={35}
														width={35}
														alt=""
													/>
												</a>

												<a
													target="_blank"
													href={`https://polygonscan.com/address/${data.profile.ownedBy}`}
													rel="noreferrer"
												>
													<Image
														loading="lazy"
														src={polygonLogo}
														height={35}
														width={35}
														alt=""
													/>
												</a>

												<a
													target="_blank"
													href={`https://opensea.io/assets/matic/${data.profile.handle}`}
													rel="noreferrer"
												>
													<Image
														loading="lazy"
														src={openseaLogo}
														height={35}
														width={35}
														alt=""
													/>
												</a>
											</>
										) : (
											''
										)}
									</div>
								</div>

								<div className="mt-[25px] flex flex-col sm:flex-row justify-between">
									<div>
										{!loading ? (
											<>
												<p className="text-[26px] font-semibold ">
													{data.profile.name} (#{data.profile.id})
												</p>
												<p className="text-[16px] opacity-80  text-[#AAFE2E]">
													@{data.profile.handle}{' '}
												</p>

												<p className="text-[14px] max-w-[500px] opacity-70 mt-[14px]">
													{data.profile.bio}
												</p>
											</>
										) : (
											''
										)}
									</div>

									{!loading ? (
										<div className=" rounded-[10px]  flex px-[15px] items-center justify-center mt-[30px] sm:mt-0">
											<div className="flex space-x-[25px]  ">
												<p className="flex flex-col text-right ">
													<span className="text-[18px] opacity-60"> Followers</span>
													<span className="text-[30px] font-semibold">
														{data.profile.stats.totalFollowers}
													</span>
												</p>
											</div>

											<div className=" rounded-[10px]  flex px-[15px]  items-center justify-center">
												<p className="flex flex-col text-right">
													<span className="text-[18px] opacity-60">Following</span>
													<span className="text-[30px] font-semibold">
														{data.profile.stats.totalFollowing}
													</span>
												</p>
											</div>
										</div>
									) : (
										''
									)}
								</div>
							</div>

							<div className="my-[45px]">
								<p className="text-[24px]">Metrics</p>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-[35px] mt-[20px]">
									{!loading ? (
										<>
											<div className="bg-[#101010] rounded-[10px] p-[25px] flex space-x-[15px] items-center justify-center ">
												<Image loading="lazy" src={collects} height={50} width={50} alt="" />{' '}
												<p className="flex flex-col ">
													<span className="text-[16px] opacity-60">Total Collects</span>
													<span className="text-[30px] font-semibold">
														{data.profile.stats.totalCollects}
													</span>
												</p>
											</div>
											<div className="bg-[#101010] rounded-[10px] p-[25px] flex space-x-[15px] items-center justify-center">
												<Image loading="lazy" src={comments} height={50} width={50} alt="" />{' '}
												<p className="flex flex-col ">
													<span className="text-[16px] opacity-60">Total Comments</span>
													<span className="text-[30px] font-semibold">
														{data.profile.stats.totalComments}
													</span>
												</p>
											</div>

											<Revenue Id={!loading ? data.profile.id : ''} />

											<div className="bg-[#101010] rounded-[10px] p-[25px] flex space-x-[15px] items-center justify-center">
												<Image loading="lazy" src={mirrors} height={50} width={50} alt="" />{' '}
												<p className="flex flex-col ">
													<span className="text-[16px] opacity-60">Total Mirrors</span>
													<span className="text-[30px] font-semibold">
														{data.profile.stats.totalMirrors}
													</span>
												</p>
											</div>
											<div className="bg-[#101010] rounded-[10px] p-[25px] flex space-x-[15px] items-center justify-center">
												<Image loading="lazy" src={publication} height={50} width={50} alt="" />{' '}
												<p className="flex flex-col ">
													<span className="text-[16px] opacity-60">Total Publication</span>
													<span className="text-[30px] font-semibold">
														{data.profile.stats.totalPublications}
													</span>
												</p>
											</div>
										</>
									) : (
										''
									)}
								</div>
							</div>

							<div className="container mx-auto  overflow-scroll mb-[100px]">
								<p className="text-[24px]">Posts Revenue</p>

								<table className="table-fixed sm:w-full w-[700px] mt-[20px]">
									<thead className="bg-[#101010] rounded-sm">
										<tr className="text-left border-b-2 border-[#3B3E3E]/50 font-bold  text-[#A1A1A1]">
											<th className=" py-[15px] text-center w-[100px]">Id</th>
											<th>Post</th>
											<th className="text-center w-[200px]">Revenue Collected</th>
										</tr>
									</thead>
									<tbody>
										<RevenueByPost Id={!loading ? data.profile.id : null} />
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default User
