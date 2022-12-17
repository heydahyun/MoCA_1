var canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-100000000');
}

function draw() {
    let c = color('rgb(0, 0, 0)');
    fill(c);
    noStroke();
    rect(mouseX, mouseY, 28, 28);
}

function mousePressed() {
    canvas.show();
}

function resetSketch() {
    clear();
    location.reload();
}

