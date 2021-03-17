var recursiveSearch = function(node, results=[]) {
  var person = []
  for (key in node) {
    if (key !== 'children') {
      person.push(node[key])
    }
  }
  results.push(person.join(','))
  if (node.children.length > 0) {
    for (var i = 0; i < node.children.length; i++) {
      recursiveSearch(node.children[i], results)
    }
  }
return results
}

var removeFirstline = function(arr, raw) {
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
var array = recursiveSearch(parsed)
var final = removeFirstline(array, parsed)
var csvFormat = final.join('<br>')
return csvFormat
}

module.exports = csv