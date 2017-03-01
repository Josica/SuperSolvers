$(document).ready(function(){
  
  var lion = document.querySelector('#lion')
  var coin1 = document.querySelector('#coin1')

  // get instructions from lion
  document.querySelector('#bubble').addEventListener('mouseenter', function() {
      document.querySelector('#text').setAttribute("visible", true)
      document.querySelector('#chest').setAttribute("visible", true)
  })
  document.querySelector('#chest').addEventListener('mouseenter', function() {
      document.querySelector('#coin1').setAttribute("visible", true)
      document.querySelector('#coin2').setAttribute("visible", true)
      document.querySelector('#coin3').setAttribute("visible", true)
  })

  //correct coin
  function correctAnswer() {
      coin1.emit('select')
      $(this).data('timeout', setTimeout(function(){
        document.querySelector('#portal').setAttribute('visible', true)
        document.querySelector('#portal').emit('expand')
        coin1.removeEventListener('mouseenter', correctAnswer);
      }, 2000));
  }

  function correctAnswerLeave() {
    coin1.emit('deselect')
    clearTimeout($(this).data('timeout'));
  }

  coin1.addEventListener('mouseenter', correctAnswer);
  coin1.addEventListener('mouseleave', correctAnswerLeave);

  // Correct answer redirect
  document.querySelector('#portal').addEventListener('mouseenter', function(){
    $(this).css('z-index','99999');
    $('#overlay').fadeIn(1000);
    document.querySelector('#portal').emit('next_page')

    $(this).data('timeout', setTimeout(function(){
      window.open("win.html", "_self")
    }, 1000));
    $('#overlay').fadeOut(1000);
  })

  // Bad coin
  function BadAnswerOne() {
      coin2.emit('select')
      $(this).data('timeout', setTimeout(function(){
        coin1.removeEventListener('mouseenter', correctAnswer);
        coin2.removeEventListener('mouseenter', BadAnswerOne);
        coin3.removeEventListener('mouseenter', BadAnswerTwo);
        document.querySelector('#bad_portal').setAttribute('visible', true)
        document.querySelector('#bad_portal').emit('expand')
      }, 2000));
  }

  function BadAnswerOneLeave() {
    coin2.emit('deselect')
    clearTimeout($(this).data('timeout'));
  }

  function BadAnswerTwo() {
      coin3.emit('select')
      $(this).data('timeout', setTimeout(function(){
        coin1.removeEventListener('mouseenter', correctAnswer);
        coin2.removeEventListener('mouseenter', BadAnswerOne);
        coin3.removeEventListener('mouseenter', BadAnswerTwo);
        document.querySelector('#bad_portal').setAttribute('visible', true)
        document.querySelector('#bad_portal').emit('expand')
      }, 2000));
  }

  function BadAnswerTwoLeave() {
    coin3.emit('deselect')
    clearTimeout($(this).data('timeout'));
  }

  // Correct answer redirect
  document.querySelector('#bad_portal').addEventListener('mouseenter', function(){
    $(this).css('z-index','99999');
    $('#wrong_overlay').fadeIn(1000);
    document.querySelector('#bad_portal').emit('next_page')

    $(this).data('timeout', setTimeout(function(){
      window.open("tryagain.html", "_self")
    }, 1000));
    $('#wrong_overlay').fadeOut(1000);
  })

  coin2.addEventListener('mouseenter', BadAnswerOne);
  coin3.addEventListener('mouseenter', BadAnswerTwo);

  coin2.addEventListener('mouseleave', BadAnswerOneLeave);
  coin3.addEventListener('mouseleave', BadAnswerTwoLeave);

})
