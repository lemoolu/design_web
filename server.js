const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const proxy = require('http-proxy-middleware');

const proxyOptions = {
  target: 'http://127.0.0.1:7001',
  changeOrigin: true,
}

app.prepare().then(() => {
  const server = express()

  server.use('/api', proxy(proxyOptions));
  server.use('/public', proxy(proxyOptions));

  // server.get('/b', (req, res) => {
  //   return app.render(req, res, '/hello', req.query)
  // })

  // server.get('/posts/:id', (req, res) => {
  //   return app.render(req, res, '/posts', { id: req.params.id })
  // })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
