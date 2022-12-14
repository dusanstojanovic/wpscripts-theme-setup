/**
 * External Dependencies
 */
const path = require('path');

/**
 * WordPress Dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	...defaultConfig,
	...{
		entry: {
			main: path.resolve(process.cwd(), 'src/js', 'main.js'),
			separate: path.resolve(process.cwd(), 'src/js', 'separate.js'),
			style: path.resolve(process.cwd(), 'src/scss', 'style.scss'),
		},
		module: {
			...defaultConfig.module,
			rules: [
				...defaultConfig.module.rules,
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader', 'postcss-loader'],
				},
			],
		},
	},
	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: './src/img',
					to: './img',
				},
			],
		}),
		new SVGSpritemapPlugin('./src/icons/**/*.svg', {
			output: {
				filename: '/img/icons.svg',
				svgo: true,
				svg4everybody: false,
			},
			sprite: {
				prefix: false,
			},
		}),
		new WebpackBuildNotifierPlugin({
			title: 'Webpack Build',
			suppressSuccess: false,
			successSound: 'tink',
			failureSound: 'Basso',
		}),
		new BrowserSyncPlugin({
			// prettier-ignore
			files: [
				'./../',
				'./',
				'!./node_modules',
				'!./package.json',
			],
			reloadDelay: 2,
			// https: {
			// 	key: '/Users/dusan/Library/Application Support/Local/run/router/nginx/certs/dtsquared.local.key',
			// 	cert: '/Users/dusan/Library/Application Support/Local/run/router/nginx/certs/dtsquared.local.crt',
			// },
		}),
	],
};
