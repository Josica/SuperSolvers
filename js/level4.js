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

      blackhole.setAttribute("scale", "1.3 1.3 1.3")

      $(this).data('timeout', setTimeout(function(){
        $(this).css('z-index','99999');
        // blackhole.emit('grow')
        $('#overlay').fadeIn(2000);
        blackhole.emit('next_page')
        setTimeout(function(){
          window.open("level5.html", "_self")
        }, 3000)
      }, 2000));
      // $(this).data('timeout', setTimeout(function(){
      // }, 5000));
      // $('#overlay').fadeOut(1000);
    })
    //
    blackhole.addEventListener('mouseleave', function(){
      clearTimeout($(this).data('timeout'));
      blackhole.setAttribute("scale", "1 1 1")
    })
})
