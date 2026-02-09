let background_dots = [];

let dot_color;
let max_dots_width;
let max_dots_height;


const dot_size = 10;
const dot_buffer = dot_size * 8;

// start reveal
let cascade_duration = 60 * 2.25; // frames (3 seconds at 60fps)
let max_dot_delay = 0;
let cascade_finished = false;
let fade_duration = 20;

let movement_started = false;
const neighbor_distance = dot_size * 12; // maximum distance to consider a neighbor


class background_dot{
  
  constructor(x, y, delay=0) {
    this.x = x;
    this.y = y;
    this.delay = delay;
    
     // movement targets
    this.destX = x;
    this.destY = y;
    this.speed = 0;
    
    this.neighbors = [];
    this.lineProgress = new Map(); // tracks 0→1 progress for each neighbor
  }
  
   displayCircle(frame) {
    let t = frame - this.delay;
    if (t <= 0) return;

    let p = constrain(t / fade_duration, 0, 1);
    p = pow(p, 2); // ease-in
    let alpha = p * 255;

    fill(red(dot_color), green(dot_color), blue(dot_color), alpha);
    noStroke();
    circle(this.x, this.y, dot_size);
  }

  drawLines() {
   let connection_color = color(50,50,50); // RGB + alpha (0-255)

    stroke(connection_color);
    strokeWeight(1);

    for (let neighbor of this.neighbors) {
      let progress = this.lineProgress.get(neighbor) || 0;

      if (progress < 1) {
        progress += 0.02; // line growth speed
        if (progress > 1) progress = 1;
        this.lineProgress.set(neighbor, progress);
      }

      let targetX = lerp(this.x, neighbor.x, progress);
      let targetY = lerp(this.y, neighbor.y, progress);

      line(this.x, this.y, targetX, targetY);
    }
  }

   update_position() {
  let dx = this.destX - this.x;
  let dy = this.destY - this.y;
  let dist = sqrt(dx * dx + dy * dy);

  if (dist <= this.speed) {
    // close enough, snap to destination
    this.x = this.destX;
    this.y = this.destY;
    this.pick_new_destination();
    return;
  }

  // move toward destination
  this.x += (dx / dist) * this.speed;
  this.y += (dy / dist) * this.speed;
}
  
  pick_new_destination() {
    this.destX = random(dot_size, windowWidth - dot_size);
    this.destY = random(dot_size, windowHeight - dot_size);
    this.speed = random(0.5, 2.5);
  }
  
}




function init_dots(){
  background_dots.length = 0;

 const max_sum = (max_dots_width - 1) + (max_dots_height - 1);

  for (let i = 0; i < max_dots_height; i++) {
    for (let j = 0; j < max_dots_width; j++) {
      let x = dot_size + (j * dot_buffer);
      let y = dot_size + (i * dot_buffer);

      let norm = (i + j) / max_sum;          // 0 → 1
      let delay = norm * cascade_duration;  // 0 → duration

      background_dots.push(new background_dot(x, y, delay));
    }
  }
}


function assign_neighbors() {
  for (let i = 0; i < background_dots.length; i++) {
    let dot = background_dots[i];
    dot.neighbors = [];
    dot.lineProgress = new Map(); // reset

    for (let j = 0; j < background_dots.length; j++) {
      if (i === j) continue;
      let other = background_dots[j];
      let dx = abs(dot.x - other.x);
      let dy = abs(dot.y - other.y);

      // only horizontal or vertical neighbors
      if ((dx === 0 && dy <= neighbor_distance) || (dy === 0 && dx <= neighbor_distance)) {
        dot.neighbors.push(other);
        dot.lineProgress.set(other, 0); // start at 0
      }
    }
  }
}


function allLinesFinished() {
  for (let dot of background_dots) {
    for (let neighbor of dot.neighbors) {
      if (dot.lineProgress.get(neighbor) < 1) return false;
    }
  }
  return true;
}


function display_dots() {
  let t = frameCount;

  if (!cascade_finished && t >= cascade_duration + fade_duration) {
    cascade_finished = true;
    assign_neighbors();
  }

  if (cascade_finished && !movement_started && allLinesFinished()) {
    movement_started = true;
  }

  // 1. Draw all lines first
  for (let dot of background_dots) {
    if (cascade_finished) {
      dot.drawLines();
    }
  }

  // 2. Draw all circles on top
  for (let dot of background_dots) {
    dot.displayCircle(t);
    if (movement_started) {
      dot.update_position();
    }
  }
}