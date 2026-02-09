let background_dots = [];

let dot_color;
let max_dots_width;
let max_dots_height;


const dot_size = 10;
const dot_buffer = dot_size * 8;

// start reveal
let reveal_speed = 6;
let max_dot_delay = 0;
let cascade_finished = false;


class background_dot{
  
  constructor(x, y, delay=0) {
    this.x = x;
    this.y = y;
    this.delay = delay;
  }
  
  display(frame) {
    if (frame < this.delay) return;
    fill(dot_color);
    noStroke();
    circle(this.x, this.y, dot_size)
  }
}


function init_dots(){
  background_dots.length = 0;

  for (let i = 0; i < max_dots_height; i++) {
    for (let j = 0; j < max_dots_width; j++) {
      let x = dot_size + (j * dot_buffer);
      let y = dot_size + (i * dot_buffer);

      let delay = (i + j) * reveal_speed;
      background_dots.push(new background_dot(x, y, delay));
      
      if (delay > max_dot_delay) {
        max_dot_delay = delay;
      }
    }
  }
}


function display_dots(){
  let t = frameCount;
  
  if (!cascade_finished && t >= max_dot_delay) {
    cascade_finished = true;
  }
  
  let dots_amnt = background_dots.length;
    //console.log(dots_amnt);
  for (let i = 0; i < dots_amnt; ++i) {
    background_dots[i].display(t);
    //console.log(i);
  }
}