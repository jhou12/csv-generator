var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = 3000
var csv = require('./conversion.js')

app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/upload', (req, res) => {
  res.contentType('application/json')
  var parsed = JSON.parse(req.body.data)
  var csvFormat = csv(parsed)
  res.send(csvFormat)
})

app.post('/uploadFile', (req, res) => {
  res.contentType('application/json')
  var parsed = req.body
  var csvFormat = csv(parsed)
  res.send(csvFormat)
})

app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})