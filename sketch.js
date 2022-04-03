function setup() {
}

function draw() {
  button = createButton('Click dis button');
  button.position(width/2, height/2);
  button.mousePressed(execute_button);
}

function execute_button(){
  window.location.replace("https://youtu.be/YxjY_YTksKM?t=14");
}