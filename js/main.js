console.log("connected");

const drawBigSquare = function(s) {

  let bigSquareDiv = `<div class="bigSquare"></div>`
  $('.right').append(bigSquareDiv)
  $('.bigSquare').width(s)
  $('.bigSquare').height(s)
  let t = (h - s) / 2;
  let l = (w - s) / 2;
  // todo - center this bigSquare div inside right div
}

const drawBoxes = function() {
  w = $('.right').width();
  h = $('.right').height();
  let bigSquareSize = w;
  if (h < w) { bigSquareSize = h }
  drawBigSquare(bigSquareSize)

  const smallSquareSize = 20;



}


$(document).ready( function () {
  console.log("ready");


  drawBoxes();

})
