/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Skeleton from 'react-loading-skeleton'
import GET_PROFILE from '@/queries/get-profile'
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

import { Avatar, Cover } from '@/components/Avatar'

const Revenue = (profileId: any) => {
	const { Id } = profileId
	const { data, loading, error, refetch } = useQuery(FOLLOW_REVENUE, {
		variables: { profileId: Id },
	})
	console.log('data', data, profileId, error)

	return (
		<div className="bg-[#101010] rounded-[10px] p-[25px] flex space-x-[15px] items-center justify-center sm:row-span-2">
			<p className="flex sm:flex-col space-x-[12px] sm:space-x-0 items-center space-y-[12px]">
				<Image className="h-[50px] w-[50px]" src={revenue} alt="" />

				<div>
					<span className="text-[16px]">Follow Revenue</span>
					<p className="text-[30px] font-semibold">
						<span>
							{data && data.profileFollowRevenue && data.profileFollowRevenue.revenues.value
								? data.profileFollowRevenue.revenues.value
								: '0'}{' '}
						</span>
						<span className="font-thin opacity-50 text-[24px]">MATIC</span>
					</p>
				</div>
			</p>
		</div>
	)
}

const User = () => {
	const router = useRouter()
	const { id } = router.query
	const { data, loading, error, refetch } = useQuery(GET_PROFILE, {
		variables: { userHandle: id },
	})

	console.log(`Data for user id : ${id}`, data)

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
										<div className="flex space-x-[25px] mt-[30px] sm:-mt-[20px]">
											<div className=" rounded-[10px]  flex px-[15px] items-center justify-center">
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
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default User
