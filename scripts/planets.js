// $(document).ready(function(){
//   $('#scene').on('mouseenter', '.planet', function(event){
//       console.log("hello")
//   })
// })


document.querySelectorAll('.planet').forEach(function(planet){
  planet.addEventListener( 'mouseenter', function() {
    document.querySelectorAll('.planet-data').forEach(function(text){
      text.setAttribute("visible", false)
    })
    document.querySelector(`#${planet.id}-text`).setAttribute("visible", true)
  })
})
