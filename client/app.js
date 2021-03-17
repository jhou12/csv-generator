// SUBMIT FORM

var formElement = document.getElementById("data")
$("#submit").click(function(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: '/upload',
    data: {data: formElement.value},
    success: function(response) {
      $("#results").html(response)
      download(response)
    },
    dataType: 'text' // must be text (not json) or success cb doesn't run
  })
})

// SUBMIT FILE

$("#submit2").click(function(e) {
  e.preventDefault();
  var file = $('input:file')['0'].files[0]
  var reader = new FileReader()
  reader.onload = function(e) {
    var text = reader.result
    convertToCSV(text)
  }
  reader.readAsText(file)

  var convertToCSV = function(text) {
    $.ajax({
      type: "POST",
      url: '/uploadFile',
      data: text,
      contentType: 'application/json',
      success: function(response) {
        $("#results").html(response)
        download(response)
      },
      dataType: 'text'
    })
  }
})

// DOWNLOAD

var download = function(res) {
  var arr = res.split('<br>')
  var newtext = arr.join('\n')

  var downloadToFile = function(newtext, filename, contentType) {
    var a = document.createElement('a')
    var file = new Blob([newtext], {type: contentType})
    a.href=URL.createObjectURL(file)
    a.download = filename
    a.click()
    URL.revokeObjectURL(a.href)
  }

  document.querySelector('#dl').addEventListener('click', () => {
    downloadToFile(newtext, 'csv.txt', 'text/plain')
  })
}
