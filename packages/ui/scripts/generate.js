
exports.ui = [
    {
        option: 'Create Mantine UI Component',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './packages/ui/scripts/templates/mantine'
        },
        stringReplacers: [
            {
                question: 'Insert folder name (inside ./packages/ui/src)',
                slot: '__folder__'
            },
            { question: 'Mantine Component', slot: '__mantine__' },
            { question: 'Insert your component name', slot: '__name__' }
        ],
        output: {
            path: './packages/ui/src/__folder__(kebabCase)/__name__(pascalCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
            overwrite: false
        }
    }
    {
        option: 'Create Mantine UI PolymorphicComponent',
        defaultCase: '(pascalCase)',
        entry: {
            folderPath: './packages/ui/scripts/templates/polymorphic'
        },
        stringReplacers: [
            {
                question: 'Insert folder name (inside ./packages/ui/src)',
                slot: '__folder__'
            },
            { question: 'Mantine Component', slot: '__mantine__' },
            { question: 'Insert your component name', slot: '__name__' }
        ],
        output: {
            path: './packages/ui/src/__folder__(kebabCase)/__name__(pascalCase)',
            pathAndFileNameDefaultCase: '(pascalCase)',
            overwrite: false
        }
    }
]
