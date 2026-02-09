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


class background_dot{
  
  constructor(x, y, delay=0) {
    this.x = x;
    this.y = y;
    this.delay = delay;
  }
  
  display(frame) {
    let t = frame - this.delay;
    if (t <= 0) return;

    // normalized progress 0 → 1
    let p = constrain(t / fade_duration, 0, 1);

    // ease-in curve
    p = pow(p, 2); // quadratic ease-in

    let alpha = p * 255;

    fill(red(dot_color), green(dot_color), blue(dot_color), alpha);
    noStroke();
    circle(this.x, this.y, dot_size);
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


function display_dots(){
  let t = frameCount;
  
  if (!cascade_finished && t >= cascade_duration) {
    cascade_finished = true;
  }
  
  for (let i = 0; i < background_dots.length; ++i) {
    background_dots[i].display(t);
    //console.log(i);
  }
}