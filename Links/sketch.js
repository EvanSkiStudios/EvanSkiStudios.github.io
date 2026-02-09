function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style('z-index', '-1');
  
  dot_color = color(70, 70, 70);

  max_dots_width = Math.ceil(windowWidth / dot_buffer);
  max_dots_height = Math.ceil(windowHeight / dot_buffer);
  //console.log(max_dots_width, max_dots_height, max_dots_width * max_dots_height);
  
  init_dots();
}

function draw() {
  background(color(38,38,38));
  display_dots();
}