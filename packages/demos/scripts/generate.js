const {
  updateBarrel
} = require('@yomtor/utils/src/update-barrel/update-barrel')

exports.demos = [
  {
    option: '[Demos] UI',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './packages/demos/scripts/templates/demo'
    },
    stringReplacers: [
      {
        question: 'Story Group Name',
        slot: '__folder__'
      },
      { question: 'Component', slot: '__component__' },
      { question: 'Name', slot: '__name__' }
    ],
    output: {
      path: './packages/demos/src/demos/ui/__component__(pascalCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false
    },
    onComplete: async (results) => {
      updateBarrel(results.output.path, { ignore: '*.stories.*' })
    }
  },
  {
    option: '[Demos] Global',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './packages/demos/scripts/templates/demo'
    },
    stringReplacers: [
      { question: 'Package', slot: '__package__' },
      { question: 'Component', slot: '__component__' },
      { question: 'Name', slot: '__name__' }
    ],
    output: {
      path: './packages/demos/src/demos/__package__(pascalCase)/__component__(pascalCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false
    },
    onComplete: async (results) => {
      updateBarrel(results.output.path, { ignore: '*.stories.*' })
    }
  },
  {
    option: '[Demos] UI Configurator',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './packages/demos/scripts/templates/configurator'
    },
    stringReplacers: [
      {
        question: 'Story Group Name',
        slot: '__folder__'
      },
      { question: 'Component', slot: '__component__' }
    ],
    output: {
      path: './packages/demos/src/demos/ui/__component__(pascalCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false
    },
    onComplete: async (results) => {
      updateBarrel(results.output.path, { ignore: '*.stories.*' })
    }
  }
]
