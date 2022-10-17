import React from 'react'

function Footer() {
	return (
		<section className="p-[20px] sm:p-0">
			<div className="pb-[30px] pt-[40px] flex justify-between">
				<p className="flex-col space-x-[5px] hidden sm:flex sm:flex-row w-full">
					<span>Product of </span>
					<span>
						<a
							className="text-[#AAFE2E] hoer:text-[#003F1D] transition duration-300"
							target="_blank"
							href="https://addresszero.org/"
							rel="noreferrer"
						>
							@addresszero.org
						</a>
					</span>
				</p>

				<p className="w-full text-center sm:text-right">
					<span> Made With ❤️ by </span>
					<a
						className="text-[#AAFE2E] hoverr:text-[#003F1D] transition duration-300"
						href="https://lenster.xyz/u/ch1rag.lens"
					>
						@ch1rag.lens
					</a>
				</p>
			</div>
		</section>
	)
}

export default Footer
