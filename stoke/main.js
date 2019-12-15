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
            $(this).children('.expert.d1').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.1s'});
            $(this).children('.expert.d2').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.2s'});
            $(this).children('.expert.d3').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.3s'});
            $(this).children('.expert.d4').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.4s'});
            $(this).children('.expert.d5').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.5s'});
            $(this).children('.expert.d6').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.6s'});
            $(this).children('.partner.d1').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.1s'});
            $(this).children('.partner.d2').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.2s'});
            $(this).children('.partner.d3').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.3s'});
            $(this).children('.partner.d4').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.4s'});
            $(this).children('.partner.d5').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.5s'});
            $(this).children('.partner.d6').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.6s'});
            $(this).children('.partner.d7').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.7s'});
            $(this).children('.partner.d8').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.8s'});
            $(this).children('.partner.d9').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '.9s'});
            $(this).children('.partner.d10').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '1s'});
            $(this).children('.partner.d11').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '1.1s'});
            $(this).children('.partner.d12').css({'animation':'fadeUp 1s ease','animation-fill-mode':'forwards','animation-delay': '1.2s'});
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
