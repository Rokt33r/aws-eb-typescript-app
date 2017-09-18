import express = require('express')

const app = express()

app.use((req, res) => {
  res.send('hi')
})

app.listen(3000, () => {
  console.log('server is ready.')
})
