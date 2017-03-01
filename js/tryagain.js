$(document).ready(function(){

  var blackhole = document.getElementById('blackhole')

    document.querySelector('#dragon').addEventListener('click', function() {
      document.querySelector('#text').setAttribute("visible", true)
      document.querySelector('#text').emit('text_expand')
      document.querySelector('#blackhole').setAttribute("visible", true)
      document.querySelector('#blackhole').emit('expand')
    })

    // Next level action
    blackhole.addEventListener('mouseenter', function(event){
      $(this).css('z-index','99999');
      $('#overlay').fadeIn(1600);
      blackhole.emit('next_page')
      $(this).data('timeout', setTimeout(function(){
        window.open("tutorial.html", "_self")
      }, 1700));
      $('#overlay').fadeOut(1000);
    });
})
