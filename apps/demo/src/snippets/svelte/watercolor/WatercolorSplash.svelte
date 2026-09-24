<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="280" height="280" role="img" aria-hidden="true">
	<defs>
		<filter
			id="wash-splash-filter-1284-blob"
			x="-30%"
			y="-30%"
			width="160%"
			height="160%"
			color-interpolation-filters="sRGB"
		>
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.045"
				numOctaves="3"
				seed="287"
				result="noise"
			/>
			<feDisplacementMap
				in="SourceGraphic"
				in2="noise"
				scale="18.9"
				xChannelSelector="R"
				yChannelSelector="G"
				result="displaced"
			/>
			<feGaussianBlur in="displaced" stdDeviation="1.80" />
		</filter>
		<radialGradient id="wash-splash-gradient-1284-blob" cx="42%" cy="38%" r="68%">
			<stop offset="0%" stop-color="#276c8e" stop-opacity="0.72" />
			<stop offset="58%" stop-color="#b87524" stop-opacity="0.52" />
			<stop offset="100%" stop-color="#b87524" stop-opacity="0" />
		</radialGradient>
	</defs>
	<g transform="rotate(12 50 50)" filter="url(#wash-splash-filter-1284-blob)">
		<path
			d="M 81.67 50.00 Q 81.67 50.00 79.31 59.79 Q 76.96 69.59 67.89 73.38 Q 58.83 77.17 48.23 82.61 Q 37.63 88.06 31.08 78.28 Q 24.53 68.50 15.78 59.25 Q 7.02 50.00 15.00 40.19 Q 22.99 30.38 31.22 23.96 Q 39.46 17.55 50.25 16.77 Q 61.05 16.00 70.66 22.00 Q 80.26 28.01 80.97 39.01 Z"
			fill="url(#wash-splash-gradient-1284-blob)"
		/>
	</g>
</svg>
