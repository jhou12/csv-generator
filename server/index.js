var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = 3000

app.use(express.static('client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var formatting = function(node, results=[]) {
    var person = []
    for (key in node) {
      if (key !== 'children') {
        person.push(node[key])
      }
    }
    results.push(person.join(','))
    if (node.children.length > 0) {
      for (var i = 0; i < node.children.length; i++) {
        formatting(node.children[i], results)
      }
    }
  return results
}

var firstline = function(arr, raw) {
  var line = []
  for (key in raw) {
    if (key !== 'children') {
      line.push(key)
    }
 }
 arr.unshift(line.join(','))
 return arr
}

var csv = function(parsed) {
  var answer = formatting(parsed)
  var final = firstline(answer, parsed)
  var csvFormat = final.join('<br>')
  return csvFormat
}

app.post('/upload', (req, res) => {
  res.contentType('application/json')
  console.log('req.body', req.body)

  var parsed = JSON.parse(req.body.data)
  var csvFormat = csv(parsed)
  res.send(csvFormat)
})

app.post('/uploadFile', (req, res) => {
  res.contentType('application/json')
  console.log('req.body', req.body)

  var parsed = req.body
  var csvFormat = csv(parsed)
  res.send(csvFormat)
})

app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})