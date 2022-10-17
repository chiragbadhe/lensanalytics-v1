import React, { useState } from 'react'

function Header() {
	const [scrollY, setScrollY] = useState(0)
	const playVideoOnscroll = scrollY > 300

	return (
		<div>
			<div className="flex flex-col sm:items-center items-start">
				<p className="font-bold text-[32px] sm:text-[38px] pt-[55px] flex flex-col sm:flex-row">
					<span className="text-[#AAFE2E]">Lens</span><span className='pl-0 sm:pl-[10px]'> Analytics</span>
				</p>
				<p className="pt-[15px] text-[16px] font-bold text-[#A1A1A1]">
					The most followed Lens accounts on Lens Ecosystem 🌿
				</p>
			</div>
		</div>
	)
}

export default Header
