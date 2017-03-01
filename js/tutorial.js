$(document).ready(function(){

  var lion = document.querySelectorAll('#lion')
  var haveGem = false
  var portal = document.getElementById('portal')

  // Lion textbox action
  lion.forEach(function(element){
    element.addEventListener( 'mouseenter', function() {
      debugger
      document.querySelector('#text').setAttribute("visible", true)
      document.querySelector('#text').emit('text_expand')
      document.querySelector('#orange').setAttribute("visible", true)
    })
  })

  // Grab orange action
  if (haveGem === false) {
    document.querySelector('#orange').addEventListener( 'mouseenter', function() {
      document.querySelector('#key').setAttribute("visible", true)
      document.querySelector('#orange').setAttribute("visible", false)
      haveGem = true
      document.querySelector('#lion').addEventListener( 'mouseenter', function() {
        document.querySelector('#orange').setAttribute("position", "-1 1.45 -4.75")
        document.querySelector('#orange').setAttribute("scale", "1 1 1")
        document.querySelector('#orange').setAttribute("visible", true)
        document.querySelector('#key').setAttribute("visible", false)
        document.querySelector('#text').setAttribute("text", "value: Thanks!\n I'm trying to find the right portal home... come along!; align: center; width: 2; wrap-count: 20; color: #333333")
        document.querySelector('#portal').setAttribute('visible', true)
        document.querySelector('#portal').emit('expand')

        setTimeout(function(){
          document.querySelector('#orange').setAttribute("visible", false)
        }.bind(this), 1000)
      })
    })
  }

  // Next level action
  document.getElementById('portal').addEventListener('mouseenter', function(event){
    $(this).css('z-index','99999');
    $('#overlay').fadeIn(1000);
    portal.emit('next_page')
    $(this).data('timeout', setTimeout(function(){
      window.open("level1.html", "_self")
    }, 1000));
    $('#overlay').fadeOut(1000);
  });
})
