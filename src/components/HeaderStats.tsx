import React, { useState } from 'react'
import { nFormatter } from '@/lib/utils'
import { useQuery } from '@apollo/client'
import GLOBAL_STATS from '@/queries/getStats'
import Skeleton from 'react-loading-skeleton'

function HeaderStats() {
	const { data, loading, error } = useQuery(GLOBAL_STATS)

	return (
		<div className="flex items-center justify-center">
			<div className="pt-[35px] text-left">
				<div className="flex font-bold space-x-[15px] sm:space-x-[30px]">
					<div className="flex flex-col items-start sm:items-center">
						<p className="text-[24px] sm:text-[32px]">
							{!loading ? (
								data && nFormatter(data.globalProtocolStats.totalPosts)
							) : (
								<Skeleton width={100} height={30} />
							)}{' '}
						</p>
						<p className="text-[14px] sm:text-[16px] text-[#696A6A]">Total Posts</p>
					</div>

					<span className="border border-[#696A6A]/50"></span>

					<div className="flex flex-col items-center  ">
						<p className="text-[24px] sm:text-[32px]">
							{' '}
							{!loading ? (
								data && nFormatter(data.globalProtocolStats.totalCollects)
							) : (
								<Skeleton width={100} height={30} />
							)}{' '}
						</p>
						<p className="text-[14px] sm:text-[16px] text-[#696A6A]">Total Collects</p>
					</div>
					<span className="border border-[#696A6A]/50"></span>

					<div className="flex flex-col items-end sm:items-center">
						<p className="text-[24px] sm:text-[32px]">
							{!loading ? (
								data && nFormatter(data.globalProtocolStats.totalProfiles)
							) : (
								<Skeleton width={100} height={30} />
							)}{' '}
						</p>
						<p className="text-[14px] sm:text-[16px] text-[#696A6A]">Total Profiles</p>
					</div>
					<span className="border border-[#696A6A]/50 hidden sm:block"></span>

					<div className="flex flex-col items-center hidden sm:block ">
						<p className="text-[24px] sm:text-[32px]">
							{' '}
							{!loading ? (
								data && nFormatter(data.globalProtocolStats.totalMirrors)
							) : (
								<Skeleton width={100} height={30} />
							)}{' '}
						</p>
						<p className="text-[14px] sm:text-[16px] text-[#696A6A]">Total Mirror</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeaderStats
