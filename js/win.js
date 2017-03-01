$(document).ready(function(){

  var lion = document.querySelector('#lion')
    // Squirrel action
  lion.addEventListener( 'mouseenter', function() {
      document.querySelector('#text').setAttribute("visible", true)
      document.querySelector('#text').emit('text_expand')
    })
  setTimeout(function(){
    document.querySelector('#kane-text').setAttribute('visible', true)
  }, 30000)
  // Next level action
})
