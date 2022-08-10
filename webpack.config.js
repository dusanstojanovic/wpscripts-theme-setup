/**
 * External Dependencies
 */
const path = require("path");

/**
 * WordPress Dependencies
 */
const defaultConfig = require("@wordpress/scripts/config/webpack.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = {
	...defaultConfig,
	...{
		entry: {
			main: path.resolve(process.cwd(), "src/js", "main.js"),
			style: path.resolve(process.cwd(), "src/scss", "style.scss"),
		},
		module: {
			...defaultConfig.module,
			rules: [
				...defaultConfig.module.rules,
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader", "postcss-loader"],
				},
			],
		},
	},
	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin({
			filename: "style.css",
		}),
		new CopyPlugin({
			patterns: [
				{
					from: "./src/img",
					to: "./img",
				},
			],
		}),
		new SVGSpritemapPlugin("./src/icons/**/*.svg", {
			output: {
				filename: "/img/icons.svg",
				svgo: true,
				svg4everybody: false,
			},
			sprite: {
				prefix: false,
			},
		}),
		new WebpackBuildNotifierPlugin({
			title: "Webpack Build",
			suppressSuccess: false,
			successSound: "tink",
			failureSound: "Basso",
		}),
	],
};
