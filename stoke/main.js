function parallaxIt(e, target, movement) {
  var $this = $("#hero");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 2, {
    x: (relX - $this.width() / 2) / $this.width() * movement,
    y: (relY - $this.height() / 2) / $this.height() * movement
  });
}
function parallaxScroll(e, target, movement) {
  var relY = window.pageYOffset;
  TweenMax.to(target, .5, {
    y: relY * movement
  });
  console.log(relY);
}

// $('#hero').mousemove(function(e){
//   parallaxIt(e, '#l1', -200);
//   parallaxIt(e, '#l2', -60);
//   parallaxIt(e, '#l3', -100);
//   parallaxIt(e, '#l4', -140);
// });
$(window).scroll(function(e){
  parallaxScroll(e, '#l1', -.3);
  parallaxScroll(e, '#l2', -.09);
  parallaxScroll(e, '#l3', -.15);
  parallaxScroll(e, '#l4', -.21);
});

$(window).scroll(function(e){
  $('.grid').each( function(i){
        var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 4 ;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if( bottom_of_window > (bottom_of_object) ){
            $(this).children('.header-block').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards'});
            $(this).children('.body-block').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay':'.1s'});
            $(this).children('.image').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay':'.3s'});
            $(this).children('.expert').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay':'.3s'});
        }
    });

});
$(document).ready(function(){
  var textWrapper = document.querySelector('.title-wrapper .huge-h');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline()
    .add({
      targets: '.letter',
      translateY: ["-100vw", 0],
      translateZ: 0,
      duration: 2000,
      easing: "easeOutExpo",
      delay: (el, i) => (150 * i) + 1100
    })
});

setTimeout(function(){
  $('.stoke-sandbox').show();
},1000);
