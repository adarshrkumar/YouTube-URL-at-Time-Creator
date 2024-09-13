let input = document.getElementById('id')
input.value = String(localStorage.getItem('id')).replace('null', '')
let result = document.getElementById('result')
document.querySelector('button#go').addEventListener('click', go)

function go() {
  let time = document.getElementsByName('time')[0].value
  if (time.includes(':')) {
    time = time.split(':')
    let MM = Number(time[0])
    if (!!MM === false && MM !== 0) {
      alert('ERROR: Minutes not a number.')
      return
    }
    
    let SS = Number(time[1])
    if (!!SS === false && SS !== 0) {
      alert('ERROR: Seconds not a number.')
      return
    }
    
    let nSec = MM*60+SS
    let id = document.getElementsByName('id')[0].value
    localStorage.setItem('id', id)
    let url = `https://youtu.be/${id}?t=${nSec}`
    result.getElementsByTagName('input')[0].value = url
    result.getElementsByTagName('input')[0].tabindex = 1
    result.style.display = ''
    result.getElementsByTagName('input')[0].focus()
  }
}

input.addEventListener('keypress', function(e) {
  checkValue(e)
})

function checkValue(e) {
  let watchS = [
    'watch', 
    'embed', 
    'shorts', 
  ]
  let value = e.target.value
  if (value.includes('://')) {
    value = value.split('://')[1]
    value = value.split('/')[1]
    if (value.includes('?')) {
      value = value.split('?')[1]
      value = value.splt('v=')[1]
      if (value.includes('&')) {
        value.split('&')[0]
      }
    }
    watchS.forEach(function(w) {
      if (value.includes(`/${w}`)) {
        value = value.split(w)[1]
        if (value.includes('/')) {
          value = value.split('/')[0]
        }
      }
    })
  }
  document.getElementById('id').value = value
}