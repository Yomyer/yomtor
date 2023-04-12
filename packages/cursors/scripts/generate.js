/* eslint-disable @typescript-eslint/no-var-requires */
const { generateTemplateFiles } = require('generate-template-files')

const SVGFixer = require('oslllo-svg-fixer')
const cliProgress = require('cli-progress')
const path = require('path')

const { readFile, unlink } = require('fs/promises')
const {
  generateTemplateFilesBatch,
  StringUtility,
  CaseConverterEnum
} = require('generate-template-files')
const Offsets = require('./offsets')

const generate = ({
  d,
  stroke,
  fill,
  offset,
  name,
  path,
  paths,
  cursors,
  imports,
  exports
}) => {
  return new Promise((resolve, reject) => {
    generateTemplateFilesBatch([
      {
        option: '[Cursors] Generating Cursors',
        defaultCase: '(pascalCase)',
        entry: {
          folderPath: './packages/cursors/scripts/template'
        },
        dynamicReplacers: [
          { slot: '__name__', slotValue: name },
          { slot: '__path__', slotValue: d },
          { slot: '__paths__', slotValue: paths },
          { slot: '__stroke__', slotValue: stroke },
          { slot: '__fill__', slotValue: fill },
          { slot: '__x__', slotValue: offset.y || '' },
          { slot: '__y__', slotValue: offset.x || '' },
          { slot: '__cursors__', slotValue: cursors },
          { slot: '__imports__', slotValue: imports },
          { slot: '__exports__', slotValue: exports }
        ],
        output: {
          path: path,
          pathAndFileNameDefaultCase: '(pascalCase)',
          overwrite: true
        },
        onComplete: (results) => {
          resolve()
        }
      }
    ])
  })
}

const generateCursors = async (files) => {
  console.info = function () {
    //
  }

  const names = []
  const bar = new cliProgress.SingleBar(
    { format: '{bar} {percentage}%| "{file}" | {value}/{total}' },
    cliProgress.Presets.shades_classic
  )

  bar.start(files.length, 0)

  for (let x = 0; x < files.length; x++) {
    const file = files[x]
    const name = path.parse(file).name
    /*
        await SVGFixer(file, path.dirname(file), {
            showProgressBar: false
        }).fix()
        */

    const svg = await readFile(file, 'utf8')

    const d = [
      ...new Set(Array.from(svg.matchAll(/<path.*\sd="([^"]*)"/g), (m) => m[1]))
    ].join(' ')

    const paths =
      Array.from(svg.matchAll(/<path.*\sd="([^"]*)"([^>]*)\/>/g), (m) => m[0])
        .map((p) => `\n    '${p}'`)
        .join(',') + '\n  '
    let stroke =
      Array.from(svg.matchAll(/<path.*\sstroke="([^"]*)"/g), (m) => m[1])[0] ||
      '#000000'
    let fill =
      Array.from(svg.matchAll(/<path.*\sfill="([^"]*)"/g), (m) => m[1])[0] ||
      '#000000'

    if (fill === 'none') {
      fill = '#FFFFFF'
    }

    if (stroke === 'none') {
      stroke = ['#FFFFFF', 'white'].includes(fill) ? '#000000' : '#FFFFFF'
    }

    names.push(StringUtility.toCase(name, CaseConverterEnum.PascalCase))

    generate({
      d,
      stroke,
      paths,
      fill,
      offset: Offsets[name] ? Offsets[name] : {},
      name: name,
      path: path.dirname(file),
      cursors: names.join(',\n  '),
      imports: names
        .map((name) => {
          return `import ${name} from './${name}'`
        })
        .join('\n'),
      exports: names
        .map((name) => {
          return `export { default as ${name} } from './${name}'`
        })
        .join('\n')
    })

    await unlink(file)

    bar.update(x + 1, { file: path.basename(file) })
  }

  bar.stop()
}

exports.cursors = {
  option: '[Cursors] Generate Cursors',
  entry: {
    folderPath: './packages/cursors/source'
  },
  dynamicReplacers: [{ slot: '__name__', slotValue: 'test' }],
  output: {
    path: './packages/cursors/src/list',
    overwrite: true
  },
  onComplete: async (results) => {
    generateCursors(results.output.files)
  }
}
