/* eslint-disable @typescript-eslint/no-var-requires */
const { generateTemplateFiles } = require('generate-template-files')
const { cursors } = require('../packages/cursors/scripts/generate')
const { icons } = require('../packages/icons/scripts/generate')
const { ui } = require('../packages/ui/scripts/generate')


generateTemplateFiles([
    ...ui,
    cursors,
    icons
])
