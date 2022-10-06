const glob = require('glob')
const path = require('path')
const { appendFile, unlink, access, lstat } = require('fs/promises')
const { merge, concat } = require('lodash')

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

function updateBarrel(folder, options = { find: '*', ignore: [] }) {
  options = merge(
    { find: '*' },
    { find: options.find, ignore: concat(options.ignore, ['index.*']) }
  )

  folder = path.join(folder)

  return new Promise(async (resolve) => {
    let list = []
    const barrel = folder + '/index.ts'

    const files = glob.sync(path.join(folder, options.find), {
      ignore: options.ignore.map((pattern) => path.join(folder, pattern))
    })

    if (await exists(barrel)) {
      await unlink(barrel)
    }

    for (const file of files) {
      let include = false
      if ((await lstat(file)).isDirectory()) {
        const response = await updateBarrel(file, options)
        if (response.length) {
          include = true
          list = concat(list, response)
        }
      } else {
        include = true
        list.push(file.replace(folder, '.').replace(/\.[^/.]+$/, ''))
      }

      if (include) {
        await appendFile(
          barrel,
          `export * from '${file
            .replace(folder, '.')
            .replace(/\.[^/.]+$/, '')}'\n`
        )
      }
    }

    resolve(list)
  })
}

exports.updateBarrel = updateBarrel
