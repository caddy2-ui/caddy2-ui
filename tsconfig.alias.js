// @ts-check

/**@type {{[k:string]:[string]}} */
// @ts-ignore
let rawAlias = require('./tsconfig').compilerOptions.paths

/**@type {{[k:string]:string}} */
let alias = {}

for (let key in rawAlias) {
  let name = key.slice(0, -2)
  let dir = rawAlias[key][0].slice(0, -2)
  alias[name] = dir
}

exports.alias = alias