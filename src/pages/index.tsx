/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import { Filter } from '@/types/ui'
import Footer from '@/components/Footer'
import { useQuery } from '@apollo/client'
import { LensProfile } from '@/types/lens'
import Header from '@/components/HeaderCard'
import DownArrow from '../assets/arrow-down.svg'
import ProfileCard from '@/components/ProfileCard'
import HeaderStats from '@/components/HeaderStats'
import { FC, useEffect, useMemo, useState } from 'react'
import EXPLORE_PROFILES from '@/queries/explore-profiles'

import SearchCard from '@/components/SearchCard'

const PAGE_LENGTH = 25

const filters: Record<'followers' | 'posts' | 'collects' | 'active' | 'curated', Filter> = {
	followers: {
		label: 'Followers',
		key: 'MOST_FOLLOWERS',
		item: (profile: LensProfile) => profile.stats.totalFollowers,
	},
	posts: { label: 'Posts', key: 'MOST_POSTS', item: (profile: LensProfile) => profile.stats.totalPosts },
	active: {
		label: 'Active',
		key: 'MOST_PUBLICATION',
		item: (profile: LensProfile) => profile.stats.totalPublications,
	},
	collects: { label: 'Collects', key: 'MOST_COLLECTS', item: (profile: LensProfile) => profile.stats.totalCollects },
	curated: {
		label: 'Curated',
		key: 'CURATED_PROFILES',
		item: function (LensProfile: any): number {
			throw new Error('Function not implemented.')
		},
	},
}

const Home: FC = () => {
	const [filterBy, setFilter] = useState<Filter>(filters.followers)
	const [searchInput, setSearchInput] = useState('')
	const [searchResult, setSearchResult] = useState([])

	const [value, setValue] = useState('Followers')
	const [isDropdownOpen, setIsDropdownOpen] = useState(null)

	const [page, setPage] = useState<number>(null)

	const { data, loading, error } = useQuery(EXPLORE_PROFILES, {
		variables: { sortCriteria: filterBy.key, cursor: JSON.stringify({ offset: page * PAGE_LENGTH }) },
	})

	const [scrollY, setScrollY] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}
		handleScroll()
		window.addEventListener('scroll', handleScroll)
	}, [])

	const showNavOnScroll = scrollY > 300

	const changeFilter = (filter: Filter) => {
		setFilter(filter)
		setPage(null)
	}

	const profiles = useMemo<LensProfile[] | null>(() => {
		if (loading) return [...new Array(10).keys()].map(() => null)

		return data?.exploreProfiles?.items
	}, [loading, data?.exploreProfiles?.items])

	return (
		<>
			<div className="container mx-auto max-w-[1200px]">
				<div className="px-[20px] sm:px-0">
					<Header />
					<HeaderStats />
					<div
						className={`flex items-end sm:items-center justify-between sm:flex-row flex-col   ${
							showNavOnScroll
								? 'py-[20px] fixed top-0 sm:w-[1300px] sm:-ml-[50px] z-20 transition bg-[#151617] shadow-[0_40px_60px_-30px_rgba(0,0,0,0.3)] hidden sm:flex'
								: 'mt-[50px]'
						}`}
					>
						<SearchCard
							setSearchInput={setSearchInput}
							searchInput={searchInput}
							setSearchResult={setSearchResult}
						/>

						{showNavOnScroll ? (
							<>
								<div className="items-center flex flex-col ">
									<Image
										width={16}
										height={16}
										src={DownArrow}
										alt="down-arrow"
										className="transform rotate-180"
									/>
									<button
										className="button duration-400 text-[16px] text-[#E7E7E7]/20"
										onClick={() => window.scrollTo(0, 0)}
									>
										Scroll To Top
									</button>
								</div>
							</>
						) : (
							''
						)}

						<div className="flex flex-col items-start space-y-[10px] mt-[15px]">
							<div className="flex items-center space-x-4 text-white relative ">
								<div className="bg-[#101010]/60 border border-[#E7E7E7]/30 px-[12px] py-[8px] rounded-lg">
									<p>
										Sort By :{' '}
										<span
											onClick={() =>
												isDropdownOpen ? setIsDropdownOpen(false) : setIsDropdownOpen(true)
											}
											className="text-[#AAFE2E] cursor-pointer"
										>
											{value}
										</span>
									</p>
								</div>

								{isDropdownOpen ? (
									<div className="bg-black flex flex-col rounded-lg p-[15px] items-start absolute top-[50px] border border-[#3B3E3E]/50 right-0">
										{Object.entries(filters).map(([filterName, filter]) => (
											<button
												key={filterName}
												className={`font-medium transition  ${
													filterBy.label == filter.label ? '' : ''
												}`}
												// onClick={() => changeFilter(filter)}
												onClick={() => {
													changeFilter(filter)
													setValue(filter.label)
													setIsDropdownOpen(false)
												}}
											>
												{filter.label}
											</button>
										))}
									</div>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col  w-full   mt-[30px]">
					{error && (
						<div className="flex items-center justify-center pt-12">
							<p className="">{error.message}</p>
						</div>
					)}
					<div className="container mx-auto  overflow-scroll ">
						<table className="table-fixed sm:w-full w-[700px] ">
							<thead>
								<tr className="text-left border-b-2 border-[#3B3E3E]/50 font-bold  text-[#A1A1A1]">
									<th className="w-[70px] py-[15px] text-center">Id</th>
									<th>Lens Handle</th>
									<th className="">Twitter Handle</th>
									<th className="text-center w-[100px]">{filterBy.label}</th>
								</tr>
							</thead>
						</table>

						{!searchInput
							? profiles &&
							  profiles.map((profile, i) => (
									<ProfileCard
										profile={profile}
										filter={filterBy}
										loading={loading}
										key={profile?.handle ?? i}
										i={page * PAGE_LENGTH + i + 1}
									/>
							  ))
							: searchResult &&
							  searchResult.map((profile, i) => (
									<ProfileCard
										profile={profile}
										filter={filterBy}
										loading={loading}
										key={profile?.handle ?? i}
										i={page * PAGE_LENGTH + i + 1}
									/>
							  ))}
					</div>

					<div className="flex justify-end mt-[30px] px-[20px] sm:px-0 space-x-[17px] ">
						{page && (
							<button
								onClick={() => setPage(page - 1)}
								className="border px-[12px] py-[8px] rounded-lg bg-[#101010] border-[#E7E7E7]/30 hover:border-[#AAFE2E] duration-300 transition active:border-[#AAFE2E]"
							>
								Prev
							</button>
						)}
						<button
							onClick={() => setPage(page + 1)}
							className="border px-[12px] py-[8px] rounded-lg bg-[#101010] border-[#E7E7E7]/30 hover:border-[#AAFE2E] duration-300 transition active:border-[#AAFE2E]"
						>
							Next
						</button>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default Home
