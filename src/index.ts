import express = require('express')

const app = express()

app.use((req, res) => {
  res.send('hi')
})

app.listen(process.env.PORT, () => {
  console.log('server is ready.')
})
