const glob = require('glob')
const path = require('path')
const { appendFile, unlink } = require('fs/promises')

export function updateBarrel(folder: string, ignore = []) {
  const p = path.dirname(folder)
  const barrel = p + '/index.ts'
  const files = glob.sync(folder, {
    ignore: ignore.map((pattern) => p + '/' + pattern)
  })

  unlink(barrel)

  files.forEach((file) => {
    appendFile(
      barrel,
      `export * from '${file.replace(p, '.').replace(/\.[^/.]+$/, '')}'\n`
    )
  })
  console.log(files)
}
