const path = require('path')
const fs = require('fs')

if (process.env.PORT) {
  const manager_f = path.join(__dirname, '../example/manager.json')
  let content = fs.readFileSync(manager_f, 'utf8')
  content = content.replace('localhost:2020', `0.0.0.0:${process.env.PORT}`)
  fs.writeFileSync(manager_f, content)
}

module.exports = {
  apps: [
    {
      name: 'caddy2-ui',
      cwd: '.',
      script: "./node_modules/.bin/next",
      args: ['start'],
    },
    {
      name: 'manager',
      cwd: 'example',
      script: "caddy2",
      args: 'run -config manager.json',
    },
    {
      name: 'caddy',
      cwd: 'example',
      script: "caddy2",
      args: 'run -config caddy.json',
    },
  ]
}
