function createConfetti(initial = false) {
  return {
    x: random(windowWidth),
    y: initial ? random(-windowHeight, windowHeight) : random(-20, 0), // spread out initially
    size: random(5, 12),
    speed: random(2, 6),
    hue: random(360),
    shape: random(["rect", "ellipse"])
  };
}

function updateConfetti() {
  for (let c of confetti) {
    c.y += c.speed;
    if (c.y > height) {
      c.x = random(width);
      c.y = random(-20, 0);
      c.speed = random(2, 6);
      c.hue = random(360);
      c.size = random(5, 12);
      c.shape = random(["rect", "ellipse"]);
    }
  }
}

function drawConfetti() {
  noStroke();
  for (let c of confetti) {
    fill(c.hue, 100, 100);
    if (c.shape === "rect") rect(c.x, c.y, c.size, c.size);
    else ellipse(c.x, c.y, c.size, c.size);
  }
}