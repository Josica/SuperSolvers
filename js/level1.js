$(document).ready(function(){

  var holding = false;
  var heldBox;
  var strikes = 0;
  var eightBox = document.getElementById('8')
  var portal = document.querySelector('#portal')

    // Pattern Instructions from Lion
  document.querySelector('#lion').addEventListener('mouseenter', function() {
      document.querySelector('#text-1').setAttribute("visible", true)
  })
  document.querySelector('#text-1').addEventListener('mouseenter', function() {
    $(this).data('timeout', setTimeout(function(){
      document.querySelector('#text-1').setAttribute("visible", false)
      document.querySelector('#text-2').setAttribute("visible", true)
    }, 4000));
  })
  document.querySelector('#text-2').addEventListener('mouseenter', function() {
    $(this).data('timeout', setTimeout(function(){
      document.querySelector('#text-2').setAttribute("visible", false)
      document.querySelector('#text-3').setAttribute("visible", true)
      document.querySelectorAll('.box').forEach(function(box){
          box.addEventListener('mouseenter', allowPickup)
          box.addEventListener('mouseleave', leaveBox)
      })
    }, 5000));
  })

  // Allow Cubes to be Picked Up
  function allowPickup(e) {
    if (holding == false) {
      e.target.emit('expand')
      $(this).data('timeout', setTimeout(function(){
          holding = true
          heldBox = e.target.id
          document.querySelector('#text').setAttribute("visible", false)

          if (heldBox % 2 == 0) {
            document.querySelector('#hold').setAttribute("color", "#e600e6")
          } else {
            document.querySelector('#hold').setAttribute("color", "#4f0a8f")
          }

          document.querySelector('#hold').setAttribute("visible", true)
          e.target.setAttribute("visible", false)
          document.querySelector('#lion').addEventListener( 'mouseenter', submitBox);
      }, 1200));
    }
  }

  // Animation for Mouseleave on Cubes
  function leaveBox(e) {
      e.target.emit('unexpand')
      clearTimeout($(this).data('timeout'));
    }

  function submitBox(){
    holding = false
    document.querySelector('#hold').setAttribute("visible", false)
    if (heldBox == "8"){
      correctBox();
    }
    else {
      wrongBox();
    }
    document.querySelector('#lion').removeEventListener( 'mouseenter', submitBox);
  }

  // 3 Failed Tries Action
  function lose(e) {
    $(this).css('z-index','99999');
    e.target.emit('next_page')
    $('#bad_overlay').fadeIn(1000);
    $(this).data('timeout', setTimeout(function(){
      window.open("tryagain.html", "_self")
    }, 1000));
    $('#bad_overlay').fadeOut(1000);
  }

  // >> Hint Message in Incorrect Cubes
  function wrongBox(){
    document.querySelector('#text').setAttribute("text", "value: Oh no, this isn't the right cube! Try again. Here's a hint: 0 + 1 = 1...\n 0, 1, 1... hmm...; align: center; width: 2; wrap-count: 20; color: #333333")
    document.querySelector('#text').setAttribute("visible", true)
    var box = document.getElementById(heldBox);
    strikes ++;

    // >> Redirect to TryAgain Page
    if (strikes == 3) {
      document.querySelector('#bad_portal').setAttribute('visible', true)
      document.querySelector('#bad_portal').emit('expand')
      document.querySelector('#bad_portal').addEventListener('mouseenter', lose)
      document.querySelectorAll('.box').forEach(function(box){
          box.removeEventListener('mouseenter', allowPickup)
          box.removeEventListener('mouseleave', leaveBox)
      })
    }
  }

  // Submit Correct Cube Action
  function correctBox(){
    eightBox.setAttribute("position", "-2 1.2 1")
    eightBox.setAttribute("scale", ".2 .2 .2")
    eightBox.setAttribute("visible", true)
    document.querySelector('#text').setAttribute("text", "value: Great job finishing the pattern! A new portal just opened up, let's go!; align: center; width: 2; wrap-count: 20; color: #333333")
    document.querySelector('#text').setAttribute("visible", true)
    portal.setAttribute('visible', true)
    portal.emit('expand')
    document.querySelectorAll('.box').forEach(function(box){
        box.removeEventListener('mouseenter', allowPickup)
        box.removeEventListener('mouseleave', leaveBox)
    })
  }

  // >> Redirect to Next Level
  portal.addEventListener('mouseenter', function(event){
    $(this).css('z-index','99999');
    $('#overlay').fadeIn(1000);
    portal.emit('next_page')
    $(this).data('timeout', setTimeout(function(){
      window.open("level2.html", "_self")
    }, 1000));
    $('#overlay').fadeOut(1000);
  });
})
