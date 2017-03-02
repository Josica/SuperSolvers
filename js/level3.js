$(document).ready(function(){

  // Start text pop-up
  var lion = document.querySelector('#lion')
  var text = document.querySelector('#text')
  var eq = document.querySelector('#equation')
  var answer1 = document.querySelector('#answer1')
  var answer2 = document.querySelector('#answer2')
  var answer3 = document.querySelector('#answer3')
  var boxes = document.querySelectorAll('a-box')
  var iceTexts = document.querySelectorAll('.ice_text')
  var numbers = document.querySelectorAll('.a_text')
  var portal = document.getElementById('portal')
  var badPortal = document.getElementById('bad_portal')
  var ice = document.getElementById('ice')

    lion.addEventListener( 'mouseenter', introText)

    function introText(){
      text.setAttribute("visible", true)
      text.emit('text_expand')
      eq.setAttribute("visible", true)
      ice.emit('grow_ice')
      setTimeout(function(){
        text.setAttribute("visible", false)
      }, 8000)
      lion.removeEventListener( 'mouseenter', introText)
    }

    // lion.addEventListener( 'mouseleave', function() {
    //   text.setAttribute("visible", false)
    // });

    function answersShow(){
        answers.setAttribute('visible', true)
        answers.emit('solve1')
        answers.emit('solve2')
        $(this).data('timeout', setTimeout(function(){
          numbers.forEach(function(number){
            number.setAttribute('visible', true)
          })
        }, 2000))
        boxes.forEach(function(box){
          box.setAttribute('visible', true)
        })
      eq.removeEventListener('mouseenter', answersShow);
    }

    eq.addEventListener('mouseenter', answersShow);

    // Correct answer action
    function correctAnswer() {
        answer1.emit('select')
        $(this).data('timeout', setTimeout(function(){
          answer1.setAttribute('color', '#7AB800')
          answer2.setAttribute('color', 'red')
          answer3.setAttribute('color', 'red')
          eq.setAttribute('text', 'value', 'Correct!')
          eq.setAttribute('text', 'color', 'white')
          eq.setAttribute('material', 'color', '#7AB800')
          answer1.removeEventListener('mouseenter', correctAnswer);
          document.querySelector('#portal').setAttribute('visible', true)
          document.querySelector('#portal').emit('expand')
        }, 2000));
    }

    function correctAnswerLeave() {
      answer1.emit('deselect')
      clearTimeout($(this).data('timeout'));
    }

    answer1.addEventListener('mouseenter', correctAnswer);
    answer1.addEventListener('mouseleave', correctAnswerLeave);


    // Bad answer
    function BadAnswerOne(e) {
        answer2.emit('select')
        $(this).data('timeout', setTimeout(function(){
          answer2.setAttribute('color', 'red')
          answer3.setAttribute('color', 'red')
          answer1.setAttribute('color', '#7AB800')
          eq.setAttribute('text', 'color', 'white')
          eq.setAttribute('text', 'value', 'Ohh sorry!')
          eq.setAttribute('material', 'color', '#F23127')
          answer1.removeEventListener('mouseenter', correctAnswer);
          answer2.removeEventListener('mouseenter', BadAnswerOne);
          answer3.removeEventListener('mouseenter', BadAnswerTwo);
          document.querySelector('#bad_portal').setAttribute('visible', true)
          document.querySelector('#bad_portal').emit('expand')
        }, 2000));
    }

    function BadAnswerOneLeave() {
      answer2.emit('deselect')
      clearTimeout($(this).data('timeout'));
    }

    function BadAnswerTwo(e) {
        answer3.emit('select')
        $(this).data('timeout', setTimeout(function(){
          answer2.setAttribute('color', 'red')
          answer3.setAttribute('color', 'red')
          answer1.setAttribute('color', '#7AB800')
          eq.setAttribute('text', 'value', 'Ohh sorry!')
          eq.setAttribute('text', 'color', 'white')
          eq.setAttribute('material', 'color', '#F23127')
          answer1.removeEventListener('mouseenter', correctAnswer);
          answer2.removeEventListener('mouseenter', BadAnswerOne);
          answer3.removeEventListener('mouseenter', BadAnswerTwo);
          document.querySelector('#bad_portal').setAttribute('visible', true)
          document.querySelector('#bad_portal').emit('expand')
        }, 2000));
    }

    function BadAnswerTwoLeave() {
      answer3.emit('deselect')
      clearTimeout($(this).data('timeout'));
    }

    answer2.addEventListener('mouseenter', BadAnswerOne);
    answer3.addEventListener('mouseenter', BadAnswerTwo);

    answer2.addEventListener('mouseleave', BadAnswerOneLeave);
    answer3.addEventListener('mouseleave', BadAnswerTwoLeave);

    boxes.forEach(function(box){
      box.addEventListener( 'mouseenter', function() {
        iceTexts.forEach(function(text){
          text.setAttribute('visible', true)
        })
      })
      box.addEventListener( 'mouseleave', function() {
        iceTexts.forEach(function(text){
          text.setAttribute('visible', false)
        })
      });
    })

    // Portal Redirect to Next Page
    portal.addEventListener('mouseenter', function(event){
      $(this).css('z-index','99999');
      $('#overlay').fadeIn(1000);
      portal.emit('next_page')

      $(this).data('timeout', setTimeout(function(){
        window.open("level4.html", "_self")
      }, 1000));
      $('#overlay').fadeOut(1000);
    });

    badPortal.addEventListener('mouseenter', function(event){
      $(this).css('z-index','99999');
      $('#wrong_overlay').fadeIn(1000);
      badPortal.emit('next_page')

      $(this).data('timeout', setTimeout(function(){
        window.open("tryagain.html", "_self")
      }, 1000));
      $('#wrong_overlay').fadeOut(1000);
    });
})
