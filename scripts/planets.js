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

    blackhole.addEventListener('mouseenter', function(){
      $(this).data('timeout', setTimeout(function(){
        blackhole.emit('expand')
      }, 2500));
    })
    //
    blackhole.addEventListener('mouseleave', function(){
      clearTimeout($(this).data('timeout'));
    })
})
