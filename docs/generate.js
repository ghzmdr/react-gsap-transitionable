const {readdirSync, writeFileSync, readFileSync} = require('fs')
const jsdoc = require('jsdoc-api')
const nunjucks = require('nunjucks')
nunjucks.configure({autoescape: false})

const {model} = require('./model-data')

const templateRoot = readFileSync('./docs/partials/readme-root.hbs', 'utf8')

const packages = ['react-gsap-transitionable']

const baseData = {
  name: 'react-gsap-transitionable',
  description: '',
  url: 'https://github.com/ghzmdr/react-gsap-transitionable/'
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function generate() {
  await asyncForEach(packages, async name => {
    const packageData = model(await jsdoc.explain({
      files: './index.js',
      configure: './docs/jsdoc.config.js'
    }), baseData)
    packageData.pkgName = name
    const markdown = nunjucks.renderString(templateRoot, packageData)
    writeFileSync('./README.md', markdown)
  })
}

generate()
