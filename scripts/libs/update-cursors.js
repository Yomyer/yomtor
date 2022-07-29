/* eslint-disable @typescript-eslint/no-var-requires */
const SVGFixer = require('oslllo-svg-fixer')
const cliProgress = require('cli-progress')
const path = require('path')
const {
    promises: { readdir, rmdir }
} = require('fs')
const { readFile, unlink } = require('fs/promises')
const {
    generateTemplateFilesBatch,
    StringUtility,
    CaseConverterEnum
} = require('generate-template-files')

const generate = ({ d, stroke, fill, name, path, cursors, imports }) => {
    return new Promise((resolve, reject) => {
        generateTemplateFilesBatch([
            {
                option: 'Generating Cursor',
                defaultCase: '(pascalCase)',
                entry: {
                    folderPath: './scripts/templates/cursor'
                },
                dynamicReplacers: [
                    { slot: '__name__', slotValue: name },
                    { slot: '__path__', slotValue: d },
                    { slot: '__stroke__', slotValue: stroke },
                    { slot: '__fill__', slotValue: fill },
                    { slot: '__cursors__', slotValue: cursors },
                    { slot: '__imports__', slotValue: imports }
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

exports.updateCursors = async (files) => {
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

        /*
        await SVGFixer(file, path.dirname(file), {
            showProgressBar: false
        }).fix()
        */

        const svg = await readFile(file, 'utf8')

        const d = Array.from(
            svg.matchAll(/<path.*\sd="([^"]*)"/g),
            (m) => m[1]
        )[0]
        let stroke =
            Array.from(
                svg.matchAll(/<path.*\sstroke="([^"]*)"/g),
                (m) => m[1]
            )[0] || '#000000'
        let fill =
            Array.from(
                svg.matchAll(/<path.*\sfill="([^"]*)"/g),
                (m) => m[1]
            )[0] || '#000000'

        if (fill === 'none') {
            fill = '#FFFFFF'
        }

        if (stroke === 'none') {
            stroke = ['#FFFFFF', 'white'].includes(fill) ? '#000000' : '#FFFFFF'
        }

        names.push(
            StringUtility.toCase(
                path.parse(file).name,
                CaseConverterEnum.PascalCase
            )
        )

        generate({
            d,
            stroke,
            fill,
            name: path.parse(file).name,
            path: path.dirname(file),
            cursors: names.join(', '),
            imports: names
                .map((name) => {
                    return `import ${name} from './${name}'`
                })
                .join('\n')
        })

        await unlink(file)

        bar.update(x + 1, { file: path.basename(file) })
    }

    bar.stop()
}
