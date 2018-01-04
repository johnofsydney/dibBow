console.log("connected");

let w = 0 // window width
let h = 0 // window height
let n = 0 // number of boxes per row / column
let x = 0 // for sine calculations
let pie = Math.PI
let rateFactor = 0.1 // anglular distance - integer multiples of pi will give static colors
let speedConstant = 100 // how often to call the call the setInterval function
let pulseTimerDone
let rainbowTimerDone

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
  n = Math.round(c / s * 0.8);
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

  let bigSquareSize = w;
  if (h < w) { bigSquareSize = h }
  drawBigSquare(bigSquareSize)

  drawSmallBoxes(20, bigSquareSize)
};


const simpleGradient = function () {
  for (var i = 1; i <= n; i++) {
    let r = Math.round((255 - (i * 255/ n)))
    $(`.smallSquare.col-${i}`).css('background-color', `rgb(${r},${r},${r})`)
    $('.smallSquare').css('border', 'none')
  }
}

const pulse = function () {
  x = x + rateFactor * 3;
  let r = Math.round((127 * Math.sin(x) + 128))
  let g = Math.round((127 * Math.sin(x + (pie/3)) + 128))
  let b = Math.round((127 * Math.sin(x - (pie/3)) + 128))
  // console.log(r, g, b);
  $(`.smallSquare`).css('background-color', `rgb(${r},${g},${b})`)
  $('.smallSquare').css('border', 'none')
}


const rainbow = function () {
  for (var i = 1; i <= n; i++) {
    x = x + rateFactor + (pie / n );
    let r = Math.round((127 * Math.sin(x) + 128))
    let g = Math.round((127 * Math.sin(x + (pie/3)) + 128))
    let b = Math.round((127 * Math.sin(x - (pie/3)) + 128))
    // console.log(r, g, b);

    $(`.smallSquare.col-${i}`).css('background-color', `rgb(${r},${g},${b})`)
    $('.smallSquare').css('border', 'none')
  }




}


$(document).ready( function () {
  console.log("ready");
  w = $('.right').width();
  h = $('.right').height();
  drawBoxes(w, h);


  $('#simpleGradient').on('click', function() {
    getValues()
    stopAndRedraw();
    simpleGradient();
  })

  $('#pulse').on('click', function() {
    getValues()
    stopAndRedraw();
    pulseTimerDone = setInterval(pulse, speedConstant);
  })

  $('#stopPulse').on('click', function() {
    clearInterval(pulseTimerDone);
    clearInterval(rainbowTimerDone);
    $('.right').html('')
    drawBoxes(w, h)
  })

  $('#rainbow').on('click', function() {
    getValues()
    stopAndRedraw();
    rainbowTimerDone = setInterval(rainbow, speedConstant);
  })

  const stopAndRedraw = function () {
    clearInterval(pulseTimerDone);
    clearInterval(rainbowTimerDone);
    $('.right').html('')
    drawBoxes(w, h)
  }

  const getValues = function () {
    speedConstant = +( $('#interval').val() );
    console.log(speedConstant);
  }

})









//


// let resizeTimer;
// $(window).on('resize', function(e) {
//
//   clearTimeout(resizeTimer);
//   resizeTimer = setTimeout(function() {
//     w = $('.right').width();
//     h = $('.right').height();
//     drawBoxes(w, h);
//     console.log("not quyite qorking yet");
//   }, 250);
//
// });



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
