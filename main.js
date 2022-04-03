//devfine vars
let sound;
let missed;

function setup() {
  //sets up stuff on start
  createCanvas(1000, 1000); 
  
  missed = 0;
  
  sound = createAudio('assets/honk.mp3');
  
  button_x = random(400);
  button_y = random(400);
  button = createButton('Click dis button');
}


function move_button(){
  //plays a sound, moves button, updates missed counter
  
  sound.play();
  button_x = random(400);
  button_y = random(400);
  
  missed += 1;
  let text_string = ['You have missed ', missed.toString(), ' times'];
}

function execute_button(){
  //if you manage to click the button, rickroll
  window.location.replace("https://youtu.be/YxjY_YTksKM?t=14");
}


function step(){
  //checks if you have moused over or pressed the button
  button.mouseOver(move_button);
  button.mousePressed(execute_button);
}


function draw() {
  clear(); //clears screen for new drawing
  
  
  //gets the amount of times missed and combines it into a string
  let text_string = [];
  text_string = ['You have missed ', missed.toString(), ' times'];
  let drawn_text = join(text_string, '');
  
  //draws the full string message
  textSize(32); 
  fill(color('red'));
  text(drawn_text,32,32);
  
  button.position(button_x, button_y);   //draws button
  step(); //calls custom step function
}