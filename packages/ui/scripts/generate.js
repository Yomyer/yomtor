exports.ui = [
  {
    option: '[UI] Create Mantine Component',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './packages/ui/scripts/templates/mantine'
    },
    stringReplacers: [
      {
        question: 'Story Group Name',
        slot: '__folder__'
      },
      { question: 'Mantine Component', slot: '__mantine__' },
      { question: 'Insert your component name', slot: '__name__' }
    ],
    output: {
      path: './packages/ui/src/__name__(pascalCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false
    }
  },
  {
    option: '[UI] Create Mantine PolymorphicComponent',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './packages/ui/scripts/templates/polymorphic'
    },
    stringReplacers: [
      {
        question: 'Story Group Name',
        slot: '__folder__'
      },
      { question: 'Mantine Component', slot: '__mantine__' },
      { question: 'HTML Component', slot: '__html__' },
      { question: 'Insert your component name', slot: '__name__' }
    ],
    output: {
      path: './packages/ui/src/__name__(pascalCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false
    }
  }
]
