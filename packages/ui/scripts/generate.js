const { demos } = require('../../demos/scripts/generate')
const { generateTemplateFilesBatch } = require('generate-template-files')

exports.ui = [
  {
    option: '[UI] Create Mantine Component',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './packages/ui/scripts/templates/mantine'
    },
    stringReplacers: [
      { question: 'Mantine Component', slot: '__mantine__' },
      { question: 'Insert your component name', slot: '__name__', slotValue: '__mantine__' },
      {
          question: 'Story Group Name',
          slot: '__folder__'
      },
    ],
    output: {
      path: './packages/ui/src/__name__(pascalCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false
    },
    onComplete: (results) => {
      var config = demos[2];
      var stringReplacers = results.stringReplacers
      console.log(stringReplacers)
      config.dynamicReplacers= [
        { slot: '__folder__', slotValue: results.stringReplacers[2].slotValue },
        { slot: '__component__', slotValue: results.stringReplacers[1].slotValue },
      ]

      delete config.stringReplacers;

      generateTemplateFilesBatch([demos[2]])
    }
  },
  {
    option: '[UI] Create Mantine PolymorphicComponent',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './packages/ui/scripts/templates/polymorphic'
    },
    stringReplacers: [
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
