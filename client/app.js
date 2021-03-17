console.log('APP TEST')

// FORM SUBMIT
var formstuff = document.getElementById("data")
$("#submit").click(function(e) {
  console.log('SUBMIT TEXTAREA CLICKED')
  e.preventDefault();
  // console.log(formstuff.value) // MUST TARGET VALUE!!!
  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/upload',
    data: {data: formstuff.value}, // MUST BE OBJ!!!
    success: function(response) {
      console.log('RESPONSE', response)
      $("#results").html(response)
      download(response)
    },
    dataType: 'text' // MUST BE TEXT NOT JSON OR SUCCESS CB DOESN'T RUN (?!)
  })
})

// FILE SUBMIT
$("#submit2").click(function(e) {
  e.preventDefault();
  console.log('SUBMIT FILE CLICKED')
  var file = $('input:file')['0'].files[0] //SPECIAL SYNTAX
  var reader = new FileReader() // FILEREADER
  reader.onload = function(e) {
    console.log(reader.result)
    var text = reader.result
    run(text) // RUN AJAX AS FUNCTION AFTER TEXT READ BC ASYNC!
  }
  reader.readAsText(file)

  var run = function(text) {
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/uploadFile',
      data: text, // ALREADY OBJ IN REQ.BODY
      contentType: 'application/json',
      success: function(response) {
        console.log('RESPONSE', response)
        $("#results").html(response)
        download(response)
      },
      dataType: 'text' // MUST BE TEXT NOT JSON OR SUCCESS CB DOESN'T RUN (?!)
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
    downloadToFile(newtext, 'blobtest.txt', 'text/plain')
  })
}
