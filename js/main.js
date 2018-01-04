console.log("connected");

let w = 0 // window width
let h = 0 // window height
let n = 0 // number of boxes per row / column
let x = 0 // for sine calculations
let smallBoxSize = 20 // small box size
let pie = Math.PI
let rateFactor = 0.1 // anglular distance - integer multiples of pi will give static colors
let speedConstant = 100 // how often to call the call the setInterval function
let pulseTimerDone
let rainbowTimerDone
let heartbeatTimerDone
let diagonalTimerDone
let mesmeriseTimerDone
let mesmer2TimerDone

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

  drawSmallBoxes(smallBoxSize, bigSquareSize)
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
    x = x + rateFactor + (pie / n);
    let r = Math.round((127 * Math.sin(x) + 128))
    let g = Math.round((127 * Math.sin(x + (pie/3)) + 128))
    let b = Math.round((127 * Math.sin(x - (pie/3)) + 128))
    $(`.smallSquare.row-${i}`).css('background-color', `rgb(${r},${g},${b})`)
  }
  $('.smallSquare').css('border', 'none')
}


const heartbeat = function () {
  for (var i = 1; i <= n; i++) {
    for (var j = 1; j <= n; j++) {
      x = x + rateFactor / 1000
      p = ((n/2-i) * (n/2-i))
      q = ((n/2-j) * (n/2-j))
      let r = Math.round((128 * Math.sin( x * (p + q)) + 127))
      let g = Math.round((128 * Math.cos( x * (p + q)) + 127))
      let b = Math.round((127 * Math.sin(x) + p + q))
      // x = ((i*i) + (j*j))


      $(`.smallSquare.col-${i}.row-${j}`).css('background-color', `rgb(255,${b},${b})`)
    }
  }
  $('.smallSquare').css('border', 'none')
}


const mesmerise = function () {
  for (var i = 1; i <= n; i++) {
    for (var j = 1; j <= n; j++) {
      x = x + rateFactor / 10000
      p = ((i) * (i))
      q = ((j) * (j))
      let r = Math.round((127 * Math.sin( x * (p + q) / n) + 128))

      $(`.smallSquare.col-${i}.row-${j}`).css('background-color', `rgb(0,${r},0)`)
    }
  }
  $('.smallSquare').css('border', 'none')
}


const mesmer2 = function () {
  for (var i = 1; i <= n; i++) {
    for (var j = 1; j <= n; j++) {
      x = x + rateFactor / 10000
      p = ((n/2-i) * (n/2-i))
      q = ((n/2-j) * (n/2-j))
      let r = Math.round((128 * Math.sin( x * (p + q)) + 127))
      let g = Math.round((128 * Math.cos( x * (p + q)) + 127))

      $(`.smallSquare.col-${i}.row-${j}`).css('background-color', `rgb(${r},${g},0)`)
    }
  }
  $('.smallSquare').css('border', 'none')
}





const diagonal = function () {
  for (var i = 1; i <= n; i++) {
    for (var j = 1; j <= n; j++) {
      x = x + (rateFactor) + (pie / n);
      let r = Math.round((127 * Math.sin(x) + 128))
      let g = Math.round((127 * Math.sin(x + (pie/2)) + 128))
      let b = Math.round((127 * Math.sin(x - (pie/2)) + 128))
      $(`.smallSquare.col-${i}.row-${j}`).css('background-color', `rgb(${r},${g},${b})`)
    }
  }
  $('.smallSquare').css('border', 'none')
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

  $('#diagonal').on('click', function() {
    getValues()
    stopAndRedraw();
    diagonalTimerDone = setInterval(diagonal, speedConstant);
  })


  $('#heartbeat').on('click', function() {
    getValues()
    stopAndRedraw();
    heartbeatTimerDone = setInterval(heartbeat, speedConstant);
  })

  $('#mesmerise').on('click', function() {
    getValues()
    stopAndRedraw();
    mesmeriseTimerDone = setInterval(mesmerise, speedConstant);
  })

  $('#mesmer2').on('click', function() {
    getValues()
    stopAndRedraw();
    mesmer2TimerDone = setInterval(mesmer2, speedConstant);
  })


  const stopAndRedraw = function () {
    x = 0
    clearInterval(pulseTimerDone);
    clearInterval(rainbowTimerDone);
    clearInterval(heartbeatTimerDone);
    clearInterval(diagonalTimerDone);
    clearInterval(mesmeriseTimerDone);
    clearInterval(mesmer2TimerDone);

    $('.right').html('')
    drawBoxes(w, h)
  }

  const getValues = function () {
    speedConstant = +( $('#interval').val() );
    smallBoxSize = +( $('#squareSize').val() );
    console.log(speedConstant, smallBoxSize);
  }

})
