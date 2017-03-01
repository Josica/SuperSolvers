$(document).ready(function(){
  // Start loading screen
   $("#img").fadeIn("slow");
   $(this).data('timeout', setTimeout(function(){
     $("#loader").fadeOut("slow");
   }, 2000))

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
