const withSass = require('@zeit/next-sass')
const withFonts = require('next-fonts')

const resolve = require('resolve')
const withCSS = require('@zeit/next-css')

module.exports = withSass(withFonts(withCSS()))