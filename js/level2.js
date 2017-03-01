$(document).ready(function(){
  var holding = false
  // hover over lion to see 1 textbox
  document.querySelector('#lion').addEventListener('mouseenter', introText)

  function introText() {
    document.querySelector('#text-3').setAttribute("visible", false)
    document.querySelector('#text-1').setAttribute("visible", true)
    document.querySelector('#lion').removeEventListener('mouseenter', introText)
  }
  // hover over 1 textbox to see 2a textbox
  document.querySelector('#text-1').addEventListener('mouseenter', function() {
    $(this).data('timeout', setTimeout(function(){
      document.querySelector('#text-1').setAttribute("visible", false)
      document.querySelector('#text-2a').setAttribute("visible", true)
    }, 3000));
    // hover over gems to see 2b textbox
    document.querySelectorAll('.gem').forEach(function(gem){
      gem.addEventListener( 'mouseenter', hoverGem)
    })
  })

  function hoverGem() {
    $(this).data('timeout', setTimeout(function(){
      document.querySelector('#text-2a').setAttribute("visible", false)
      document.querySelector('#text-2b').setAttribute("visible", true)
      document.querySelector('#drop').setAttribute("visible", true)
    }, 2000));
    document.querySelectorAll('.gem').forEach(function(gem){
      gem.removeEventListener( 'mouseenter', hoverGem)
    })
  }
  // hover over droplet to see 2c textbox, show ruby & 3 textbox
  document.querySelector('#drop').addEventListener('mouseenter', function() {
    document.querySelector('#drop').setAttribute("visible", false)
    document.querySelector('#text-2b').setAttribute("visible", false)
    document.querySelector('#text-2c').setAttribute("visible", true)
    $(this).data('timeout', setTimeout(function(){
      document.querySelector('#text-2c').setAttribute("visible", false)
      document.querySelector('#text-3').setAttribute("visible", true)
      document.querySelector('#ruby').setAttribute("visible", true)
    }, 5000));
  })
  // pick up the ruby
  document.querySelector('#ruby').addEventListener('mouseenter',
  function() {
    document.querySelector('#hold').setAttribute("visible", true)
    document.querySelector('#ruby').setAttribute("visible", false)
    holding = true
  })
  // give the ruby to the solid objects - receive hint
  document.querySelectorAll('.solid').forEach(function(solid){
    solid.addEventListener( 'mouseenter', function() {
      if (holding == true) {
        document.querySelector('#hold').setAttribute("visible", false)
        document.querySelector('#ruby').setAttribute("visible", true)
        document.querySelector('#hint-s').setAttribute("visible", true)
        holding = false
      }
    })
  })
  // give the ruby to the liquid objects - receive hint
  document.querySelectorAll('.liquid').forEach(function(liquid){
    liquid.addEventListener( 'mouseenter', function() {
      if (holding == true) {
        document.querySelector('#hold').setAttribute("visible", false)
        document.querySelector('#ruby').setAttribute("visible", true)
        document.querySelector('#hint-l').setAttribute("visible", true)
        holding = false
      }
    })
  })
  // give the ruby to the gas objects - open portal
  document.querySelectorAll('.gas').forEach(function(gas){
    gas.addEventListener( 'mouseenter', completeLevel)
  })

  function completeLevel(){
    if (holding == true) {
      document.querySelector('#hold').setAttribute("visible", false)
      // ??? move/animate lion position to next to portal ???
      document.querySelector('#portal').setAttribute('visible', true)
      document.querySelector('#portal').emit('expand')
      document.querySelectorAll('.gas').forEach(function(gas){
        gas.removeEventListener( 'mouseenter', completeLevel)
      })
      holding = false
    }
  }
  // go to level3 when you enter the portal
  document.getElementById('portal').addEventListener('mouseenter', function(event){
    $(this).css('z-index','99999');
    $('#overlay').fadeIn(1000);
    document.querySelector('#portal').emit('next_page')

    $(this).data('timeout', setTimeout(function(){
      window.open("level3.html", "_self")
    }, 1000));
    $('#overlay').fadeOut(1000);
  });

})
