// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Needed for Expo Router
config.resolver.sourceExts.push('mjs', 'jsx', 'tsx', 'ts', 'cjs');

module.exports = withNativeWind(config, { input: './global.css' }); 