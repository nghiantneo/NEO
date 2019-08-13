$(".slider.thumbs").slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  asNavFor: '.slider.text',
  dots: false,
  arrows: false,
  centerMode: true,
  focusOnSelect: true,
});
$(".slider.text").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  asNavFor: '.slider.thumbs',
});