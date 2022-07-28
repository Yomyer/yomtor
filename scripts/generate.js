const { generateTemplateFiles } = require('generate-template-files')
const { updateCursors } = require('./libs/update-cursors');

generateTemplateFiles([
    {
        option: 'Create UI Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './scripts/templates/default'
        },
        stringReplacers: [
            {
                question: 'Insert folder name (inside ./src)',
                slot: '__folder__'
            },
            {
                question: 'Atomic design level (atom | molecule | organism)',
                slot: '__atomicity__'
            },
            { question: 'Insert your component name', slot: '__name__' }
        ],
        output: {
            path: './packages/ui/src/__folder__(kebabCase)/__name__(pascalCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
            overwrite: false
        }
    },
    {
        option: 'Update Icon Crusors',
        entry: {
          folderPath: './packages/icons/source/cursors',
        },
        dynamicReplacers: [{ slot: '__name__', slotValue: 'test' }],
        output: {
          path: './packages/icons/src/cursors',
          overwrite: true,
        },
        onComplete: async (results) => {
          updateCursors('./projects/ui/src/icon', results.output.files);
        },
    },
    {
        option: 'Create UI Icon',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './scripts/templates/icon'
        },
        stringReplacers: [
            { question: 'Insert your component name', slot: '__name__' },
            { question: 'Insert your path svg', slot: '__path__' }
        ],
        output: {
            path: './packages/ui/src/icon/__name__(pascalCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
            overwrite: true
        }
    }
])
