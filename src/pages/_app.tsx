import '../styles/globals.css'
import Script from 'next/script'
import apollo from '@/lib/apollo'
import 'tailwindcss/tailwind.css'

import { ApolloProvider } from '@apollo/client'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'

const App = ({ Component, pageProps }) => (
	<div>
		<Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-EGY177WHTZ`} />
		<Script
			id="googleanalytics"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{
				__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EGY177WHTZ', {
              page_path: window.location.pathname,
            });
          `,
			}}
		/>

		<ApolloProvider client={apollo}>
			<SkeletonTheme baseColor="#222323" highlightColor="#3C3C3C" width={100}>
				<Component {...pageProps} />
			</SkeletonTheme>
		</ApolloProvider>
	</div>
)

export default App
