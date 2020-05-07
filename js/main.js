const NUM_SQUARES = 100
const MAX_SPEED = 1.5
const MIN_SIZE = 50
const MAX_SIZE = 100
let xs = []
let ys = []
let dxs = []
let dys = []
let sLens = []
let R = []
let G = []
let B = []

function setup() {
  createCanvas(innerWidth, innerHeight)
  background(0)
  stroke(0, 0, 0, 0)

  for (let i = 0; i < NUM_SQUARES; i++) {
    sLens.push(random(MIN_SIZE, MAX_SIZE))
    dxs.push(random(-MAX_SPEED, MAX_SPEED))
    dys.push(random(-MAX_SPEED, MAX_SPEED))
    xs.push(random(0, width - sLens[i]))
    ys.push(random(0, height - sLens[i]))
    R.push(random(100, 255))
    G.push(random(100, 255))
    B.push(random(100, 255))
  }
}

function draw() {
  background(0)
  for (let i = 0; i < NUM_SQUARES; i++) {
    drawOverlaps(i)

    xs[i] += dxs[i]
    ys[i] += dys[i]
    if (xs[i] < 0 || xs[i] > width - sLens[i]) {
      dxs[i] *= -1
    }
    if (ys[i] < 0 || ys[i] > height - sLens[i]) {
      dys[i] *= -1
    }
  }
}

function drawOverlaps(startIndex) {
  const leftBound = xs[startIndex]
  const rightBound = leftBound + sLens[startIndex]
  const topBound = ys[startIndex]
  const bottomBound = topBound + sLens[startIndex]
  for (let i = 0; i < NUM_SQUARES; i++) {
    if (i === startIndex) continue
    /* Looking for top left corner */
    fill(R[i], G[i], B[i], 75)
    if (xs[i] >= leftBound 
      && xs[i] <= rightBound 
      && ys[i] >= topBound 
      && ys[i] <= bottomBound) {
      rect(
        xs[i], 
        ys[i], 
        min(sLens[i], sLens[startIndex] - (xs[i] - leftBound)), 
        min(sLens[i], sLens[startIndex] - (ys[i] - topBound)))
    }
    /* Looking for bottom left corner */
    else if (xs[i] >= leftBound 
      && xs[i] <= rightBound 
      && ys[i] + sLens[i] >= topBound 
      && ys[i] + sLens[i] <= bottomBound) {
      rect(
        xs[i], 
        ys[startIndex], 
        min(sLens[i], sLens[startIndex] - (xs[i] - leftBound)), 
        ys[i] + sLens[i] - ys[startIndex])
    }
    /* Looking for top right corner */
    else if (xs[i] + sLens[i] >= leftBound 
      && xs[i] + sLens[i] <= rightBound 
      && ys[i] >= topBound 
      && ys[i] <= bottomBound) {
      rect(
        xs[startIndex], 
        ys[i], 
        sLens[i] - (xs[startIndex] - xs[i]), 
        min(sLens[i], sLens[startIndex] - (ys[i] - topBound)))
    }
  }
}