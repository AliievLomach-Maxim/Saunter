const CracoLessPlugin = require('craco-less')

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							'@font-family': 'Roboto, sans-serif',
							'@primary-color': '#0A5C47',
							'@white': '#55C964',
							'@input-height-base': '40px',
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
}
