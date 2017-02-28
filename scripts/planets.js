$(document).ready(function(){
  document.querySelectorAll('.planet').forEach(function(planet){
    planet.addEventListener( 'mouseenter', function() {
      document.querySelectorAll('.planet-data').forEach(function(text){
        text.setAttribute("visible", false)
      })
      document.querySelector(`#${planet.id}-text`).setAttribute("visible", true)
      setTimeout(function(){
        document.querySelector(`#${planet.id}-text`).setAttribute("visible", false)
      }, 8000);
    })
  })

  document.querySelector('#lion').addEventListener( 'mouseenter', function() {
      document.querySelector('#lion-text').setAttribute("visible", true)
      setTimeout(function(){
        document.querySelector('#lion-text').setAttribute("visible", false)
        document.querySelector('#lion-text').setAttribute("visible", false)
        document.querySelector('#lion').emit("test")
      }, 12000);
    })

    var blackhole = document.querySelector('#black-hole')
    var portal = document.querySelector('#portal')


    blackhole.addEventListener('mouseenter', function(){

      blackhole.emit('expand')
      portal.emit('grow')
      portal.emit('next_page')
      $(this).data('timeout', setTimeout(function(){
        $(this).css('z-index','99999');
        $('#overlay').fadeIn(2000);
      }, 3000));
      $(this).data('timeout', setTimeout(function(){
        window.open("index.html", "_self")
      }, 5000));
      $('#overlay').fadeOut(1000);
    })
    //
    // blackhole.addEventListener('mouseleave', function(){
    //   clearTimeout($(this).data('timeout'));
    // })
})
