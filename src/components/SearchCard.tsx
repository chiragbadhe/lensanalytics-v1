import { useQuery } from '@apollo/client'
import React, { useMemo, useState } from 'react'
import SEARCH_PROFILES from '@/queries/search-profiles'

function Search({ setSearchInput: setSearchInput, searchInput: searchInput, setSearchResult: searchResult }) {
	const { data, loading, error, refetch } = useQuery(SEARCH_PROFILES, {
		variables: { searchProfile: searchInput },
	})

	const searchResults = useMemo(() => {
		if (loading) return [...new Array(10).keys()].map(() => null)
		return data?.search?.items
	}, [loading, data?.search?.items])

	searchResult(searchResults)

	const search = (e: { target: { value: any } }) => {
		var emitLens = e.target.value.replace('.lens', '')
		setSearchInput(emitLens)
	}

	// console.log(searchResults, searchResults?.name ?? searchResults?.handle)
	return (
		<div className="w-full sm:w-[250px]">
			<input
				type="text"
				placeholder="Search..."
				value={searchInput}
				onChange={search}
				className="w-full bg-[#101010]/60 border border-[#E7E7E7]/30 px-[12px] py-[8px] rounded-lg focus:outline-none focus:border focus:border-[#AAFE2E] "
			/>
		</div>
	)
}

export default Search
