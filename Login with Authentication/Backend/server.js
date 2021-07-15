const express = require('express')
const app = express()
const PORT = 2022

app.use(require('./routes/posts'))
app.use(require('./routes/users'))

app.listen(PORT, (req,res) => {
  console.log('Server running on port ', PORT)
})

app.get('/test', (req,res) => {
  res.sendStatus(200)
  console.log('furrula')
})

