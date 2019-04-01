import express from 'express'
import getPort from 'get-port'

export async function createResultsServer () {
  const port = await getPort()
  return new Promise(function (resolve, reject) {
    let server
    const app = express()
    app.use(express.json())
    app.post('/', function (req, res) {
      const { failed, logs } = req.body
      logs.forEach(function (log) {
        console.log(log)
      })
      res.end()
      server.close(function () {
        process.exit(failed ? 1 : 0)
      })
    })
    server = app.listen(port, function (error) {
      if (error) {
        reject(error)
        return
      }
      resolve(`http://0.0.0.0:${port}/`)
    })
  })
}
