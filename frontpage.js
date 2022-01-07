var stickyOffset = $('.headers').offset().top;

$(window).scroll(function(){
  var sticky = $('.headers'),
      scroll = $(window).scrollTop();
    
  if (scroll >= stickyOffset) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
});