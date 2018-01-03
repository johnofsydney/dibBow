console.log("connected");

let w = 0 // window width
let h = 0 // window height
let n = 0 // number of boxes per row / column

const drawBigSquare = function(s) {
  let bigSquareDiv = `<div class="bigSquare"></div>`
  $('.right').append(bigSquareDiv)
  $('.bigSquare').outerWidth(s)
  $('.bigSquare').outerHeight(s)
  let t = (h - s) / 2;
  let l = (w - s) / 2;
  // todo - center this bigSquare div inside right div horizontally
}

const drawSmallBoxes = function(s,c) {
  console.log(s,c);
  n = ((c - (c%s)) / s);
  let smallSquareDiv = ''

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      smallSquareDiv = `<div class="smallSquare row-${i} col-${j}"></div>`
      $('.bigSquare').append(smallSquareDiv)
    }
  }

  $('.smallSquare').outerWidth(s)
  $('.smallSquare').outerHeight(s)
}

const drawBoxes = function() {

  console.log(`height: ${h}, width: ${w}`);
  let bigSquareSize = w;
  if (h < w) { bigSquareSize = h }
  drawBigSquare(bigSquareSize)

  drawSmallBoxes(20, bigSquareSize)
};


const simpleGradient = function () {
  for (var i = 1; i <= n; i++) {
    let x = Math.round((255 - (i * 255/ n)))
    $(`.smallSquare.col-${i}`).css('background-color', `rgb(${x},${x},${x})`)
    $('.smallSquare').css('border', 'none')
  }
}


$(document).ready( function () {
  console.log("ready");
  w = $('.right').width();
  h = $('.right').height();
  drawBoxes(w, h);

  $('#simpleGradient').on('click', function(e) {
    // e.preventDefault();
    simpleGradient();
  })


})




let resizeTimer;
$(window).on('resize', function(e) {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    drawBoxes();
    console.log("not quyite qorking yet");
  }, 1250);

});



//
// $(window).on('resize', function () {
//   var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
//
//   if (scrollBottom > 600) {
//     return; // Don't do anything until we are within 600 pixels of the bottom of the page.
//   }
//
//   var query = $('#query').val();
//   throttledSearchFlickr(query);
//   console.log("resize");
// });
