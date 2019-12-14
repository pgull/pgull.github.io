(function(factory) {
  if (typeof exports === "object") {
    factory(require("jquery"));
  } else if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    factory(jQuery);
  }
}(function($) {
  $.extend({ bez: function(encodedFuncName, coOrdArray) {
    if ($.isArray(encodedFuncName)) {
      coOrdArray = encodedFuncName;
      encodedFuncName = 'bez_' + coOrdArray.join('_').replace(/\./g, 'p');
    }
    if (typeof $.easing[encodedFuncName] !== "function") {
      var polyBez = function(p1, p2) {
        var A = [null, null], B = [null, null], C = [null, null],
            bezCoOrd = function(t, ax) {
              C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
              return t * (C[ax] + t * (B[ax] + t * A[ax]));
            },
            xDeriv = function(t) {
              return C[0] + t * (2 * B[0] + 3 * A[0] * t);
            },
            xForT = function(t) {
              var x = t, i = 0, z;
              while (++i < 14) {
                z = bezCoOrd(x, 0) - t;
                if (Math.abs(z) < 1e-3) break;
                x -= z / xDeriv(x);
              }
              return x;
            };
        return function(t) {
          return bezCoOrd(xForT(t), 1);
        }
      };
      $.easing[encodedFuncName] = function(x, t, b, c, d) {
        return c * polyBez([coOrdArray[0], coOrdArray[1]], [coOrdArray[2], coOrdArray[3]])(t/d) + b;
      }
    }
    return encodedFuncName;
  }});
}));

var stagePosition = 0;
var carouselContent = [
    //title, background, midground, foreground, contentID
    ['Personal Work','small/A.jpg','personal-work'],
    ['Freightliner Cascadia','truck.gif','freightliner-configurator'],
    ['University of Tennessee','utkr.jpg','university-of-tennessee'],
    ['Evolution Design','edstorefront.jpg','evolution-design']

];

var parallax = false;
var menuOpen = false;
var articleOpen = false;

window.addEventListener('popstate', function(e) {
  history.scrollRestoration = 'manual';
  collapseStage();
  $('.article-wrapper').fadeOut();
  var id = e.state;
  console.log(id);
  if(id == null){
    console.log('home');
    unloadArticle();
    articleOpen = false;
  } else {
    if(articleOpen == true){
      $('.article-wrapper').fadeOut();
        console.log(id);
        loadArticle(id);
    } else {
      collapseStage();
      console.log(id);
      loadArticle(id);
    }
  }
});

function buildStage(x){
  $('.stage').css('opacity','1');
  $('.floor').height('100%');
  console.log(x);
  if(x == -1){
    x = 0;
    stagePosition = 0;
  }
  var title = carouselContent[x][0],
  bg = carouselContent[x][1],
  title = carouselContent[x][0],
  id = carouselContent[x][2],
  picy = $('.stage').height(),
  infox = $('#actor-info').width(),
  no = '0' + eval(x+1),
  slot = x+1;
  $('#view').attr('content', id);
  $('#page-count').html(no + ' / ' + '0' + carouselContent.length);
  $('#stage-image').css({'background-image':'url(img/' + bg +')'});
  $('#stage-info h1').html(title);
  setTimeout(function(){
    $('.stage').removeClass('collapsed-stage');
    $('#back-button, #next-button').removeClass('disabled');
    if(x > 0) {
      $('#back-button').removeClass('disabled');
      $('#next-button').removeClass('disabled');
    } else if(x == 0){
      $('#back-button').addClass('disabled');
      $('#next-button').removeClass('disabled');
    }
    if (slot == carouselContent.length) {
      $('#back-button').removeClass('disabled');
      $('#next-button').addClass('disabled');
    }
    $('#next-button, #back-button').fadeIn();
  },200);
  $('#stage-foreground').fadeIn();
  $('hr.guide').css('width','30%');
}
function collapseStage(){

  $('#view').css({'left':'-110%'});
  $('.floor').height('0%');
  $('.stage').addClass('collapsed-stage');
  $('#stage-foreground').fadeOut();
  var picy = $('.stage').height();
  var infox = $('#actor-info').width();
  $('#stage-midground').css({'background-position':'50% ' + picy + 'px'});
  $('.stage').css({'background-position':'50% ' + '-' + picy + 'px'});
  $('#actor-info h1').css('right', '-' + ($('#actor-info h1').outerWidth() + 50) + 'px');
  $('#actor-info h2').css('right', '-' + ($('#actor-info h2').outerWidth() + 100) + 'px');
  $('hr.guide').css('width','0');
}

function loadArticle(id){
  articleOpen = true;
  var no = '0' + eval(stagePosition+1);
  closeMenu();
  $('#page-count').html(no + ' / ' + '0' + carouselContent.length);
  $('#next-button').fadeOut();
  $('#back-button').fadeOut();
  setTimeout(function(){
    $('#' + id).show();
    $('#' + id  + ' .article-body').show();
  }, 1500);
}

function unloadArticle(){
  articleOpen == false;
  $('.article-wrapper').fadeOut();
  setTimeout(function(){
    if(stagePosition > 0) {
      $('#back-button').fadeIn();
      $('#next-button').fadeIn();
    } else if(stagePosition == 0){
      $('#back-button').addClass('disabled');
      $('#back-button').fadeIn();
      $('#next-button').fadeIn();
    }
    if (stagePosition == carouselContent.length) {
      $('#next-button').hide();
      $('#back-button').fadeIn();
    }
    buildStage(stagePosition);
  }, 1000);
}

$('#view').click(function(){
  collapseStage();
  loadArticle($(this).attr('content'));
  history.pushState($(this).attr('content'),null,'/');
});
$('#next-button').click(function(){
  $('#next-button, #back-button').addClass('disabled');
  stagePosition++;
  collapseStage();
  setTimeout(function(){
    buildStage(stagePosition);
  },1000);
});
$('#back-button').click(function(){
  $('#next-button, #back-button').addClass('disabled');
  stagePosition--;
  collapseStage();
  setTimeout(function(){
    buildStage(stagePosition);
  },1000);
});

$(window).mousemove(function(e){
  parallaxIt(e, '#stage-image', -100);
  parallaxIt(e, '#stage-info', -10);
});
$(window).scroll(function(e){
  parallaxIt(e, '#l0', -.1);
  parallaxIt(e, '#l1', -1);
  parallaxIt(e, '#l2', -1.3);
  parallaxIt(e, '#l3', -1.53);
});

$(window).on('load',function(){
  anime.timeline()
  .add({
    targets: '.word',
    translateY: ["3em", 0],
    translateZ: 0,
    duration: 2000,
    easing: "easeOutExpo",
    delay: (el, i) => 200 * i
  });
  anime.timeline()
  .add({
    targets: '.line',
    translateY: ["3em", 0],
    translateZ: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: (el, i) => (100 * i) + 750
  });

  collapseStage();
  $('.ui').fadeIn(1000,function(){
      $('.stage').css('opacity','1');
      buildStage(0);
  });
  for(i=0;i<carouselContent.length; i++){
    $('.nav-content').append('<div class="nav-item" no="'+i+'" content="'+carouselContent[i][2]+'" ><div class="nav-item-container" style="animation-delay:' + i/10 + 's">' + carouselContent[i][0] + '</div></div>');
  }
  // var fiddyx = $(window).width()/2;
  // var fiddyy = $(window).width()/2;
  // var x = (0 - fiddyx)*-1;
  // var y = (10 - fiddyy)*-1;
  // $('#stage-foreground').css({'transform':'translateX('+ x / 30 +'px) translateY('+ y / 100 +'px)'});
  // $('#actor-info').css({'transform':'translateX('+ x / 100 +'px) translateY('+ y / 200 +'px)'});
  // $('.stage').css({'transform':'translate(-' + (50 - (x/200)) + '%, -' + (50 - (y/100)) + '%'});
});

 $(document).on('click','.nav-item',function(){
   if($(this).attr('id') == 'home'){
     closeMenu();
     unloadArticle();
     history.pushState(null, null,'/');
   } else {
     stagePosition = eval($(this).attr('no'));
     $('.article-wrapper').fadeOut();
      console.log($(this).attr('content'));
      collapseStage();
      loadArticle($(this).attr('content'));
      history.pushState($(this).attr('content'),null,'/');
   }
});

$('.article-continue-buttons').click(function(){
  stagePosition = eval($(this).attr('no'));
  $('.article-wrapper').fadeOut();
   console.log($(this).attr('content'));
   collapseStage();
   loadArticle($(this).attr('content'));
   history.pushState($(this).attr('content'),null,'/');
});

$('#nav').click(function(){
  $('html,body').animate({ scrollTop: 0 }, 1500, $.bez([.5, .5, .5, 1]) );
});

function parallaxHae(e){
  if(parallax == true){
    var fiddyx = $(window).width()/2;
    var fiddyy = $(window).width()/2;
    var x = (e.clientX - fiddyx);
    var y = (e.clientY - fiddyy);
    $('#stage-image').css({'background-position':((x/500) + 50) + '% ' + ((y/500) + 50) + '%'});
    // $('#stage-foreground').css({'transform':'translateX('+ x / 120 +'px) translateY('+ y / 400 +'px)'});
    // $('#actor-info').css({'transform':'translateX('+ x / 400 +'px) translateY('+ y / 800 +'px)'});
    $('#stage-info').css({'transform':'translate(-' + (50 - (x/400)) + '%, -' + (50 - (y/200)) + '%'});
  }
}

function parallaxIt(e, target, movement) {
  var $this = $(".masonry");
  var relY = window.pageYOffset;

  TweenMax.to(target, .5, {
    y: relY * movement
  });

  console.log(relY);
}


$('#logo').click(function(){
  if(articleOpen == true){
      unloadArticle();
      history.pushState(null, null,'/');
  } else {
  }
});

function toggleMenu(){
  console.log(menuOpen);
  $('.burger-bun').toggleClass('active');
  $('.menu-bg').toggleClass('expanded');
  if(menuOpen == false){
    menuOpen = true;
    $('#return').addClass('disabled');
    $('.nav-item').show();
    $('#nav').css('pointer-events','none');
    setTimeout(function(){
      $('#nav').css('pointer-events','all');
    },500);
  } else {
    menuOpen = false;
    $('#return').removeClass('disabled');
    $('#nav').css('pointer-events','none');
    setTimeout(function(){
      $('#nav').css('pointer-events','all');
      $('.nav-item').hide();
    },500);
  }
}

function closeMenu(){
  $('.burger-bun').removeClass('active');
  $('.menu-bg').removeClass('expanded');
  menuOpen = false;
  $('#return').removeClass('disabled');
  $('#nav').css('pointer-events','none');
  setTimeout(function(){
    $('#nav').css('pointer-events','all');
    $('.nav-item').hide();
  },500);
}

function openMenu(){
  $('.burger-bun').addClass('active');
  $('.menu-bg').addClass('expanded');
  menuOpen = true;
  $('#return').addClass('disabled');
  $('.nav-item').show();
  $('#nav').css('pointer-events','none');
  setTimeout(function(){
    $('#nav').css('pointer-events','all');
  },500);
}
