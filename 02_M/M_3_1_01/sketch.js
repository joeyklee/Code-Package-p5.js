// M_3_1_01.pde
//
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// First Edition, Hermann Schmidt, Mainz, 2009
// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draws a flat grid
 *
 * MOUSE
 * click + drag        : rotate
 */

'use strict';

// number of grid points horizontal
var xCount = 4;
// number of grid points vertical
var yCount = 4;

// variables for rotation
var offsetX = 0, offsetY = 0, clickX = 0, clickY = 0;
var rotationX = 0, rotationY = 0, targetRotationX = 0, targetRotationY = 0, clickRotationX, clickRotationY;


function setup() {
  createCanvas(400, 400, WEBGL);
  // smooth(8);

  fill(255);
  strokeWeight(1/80.0);
}


function draw() {
  background(255);

  setView();

  scale(40);

  // Draw Mesh
  for (var y = 0; y < yCount; y++) {
    beginShape(QUAD_STRIP);
    for (var x = 0; x <= xCount; x++) {
      vertex(x, y, 0);
      vertex(x, y+1, 0);
    }
    endShape();
  }
}



function mousePressed(){
  clickX = mouseX;
  clickY = mouseY;
  clickRotationX = rotationX;
  clickRotationY = rotationY;
}



function setView() {
  translate(width*0.5,height*0.5);

  if (mouseIsPressed) {
    offsetX = mouseX-clickX;
    offsetY = mouseY-clickY;
    targetRotationX = clickRotationX + offsetX/float(width) * TWO_PI;
    targetRotationY = min(max(clickRotationY + offsetY/float(height) * TWO_PI, -HALF_PI), HALF_PI);
    rotationX += (targetRotationX-rotationX)*0.25;
    rotationY += (targetRotationY-rotationY)*0.25;
  }
  rotateX(-rotationY);
  rotateY(rotationX);
}



function timestamp() {
  return String.format("%1$ty%1$tm%1$td_%1$tH%1$tM%1$tS", Calendar.getInstance());
}
