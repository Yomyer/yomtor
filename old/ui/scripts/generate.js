
exports.ui = [
    {
        option: 'Create UI Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './packages/ui/scripts/templates/default'
        },
        stringReplacers: [
            {
                question: 'Insert folder name (inside ./packages/ui/src)',
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
        option: 'Create UI Component (ref)',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './packages/ui/scripts/templates/ref'
        },
        stringReplacers: [
            {
                question: 'Insert folder name (inside ./packages/ui/src)',
                slot: '__folder__'
            },
            {
                question: 'Atomic design level (atom | molecule | organism)',
                slot: '__atomicity__'
            },
            { question: 'Component to ref', slot: '__component__' },
            { question: 'Insert your component name', slot: '__name__' }
        ],
        output: {
            path: './packages/ui/src/__folder__(kebabCase)/__name__(pascalCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
            overwrite: false
        }
    }
]
