//devfine vars in global scope
let sound;
let missed;
let text_color;
let button_text;

function setup() {
  //sets up stuff on start
  createCanvas(1000, 1000); 

  missed = 0;

  sound = createAudio('assets/honk.mp3');

  button_x = random(400);
  button_y = random(400);
  button_text = 'Click dis button';
  button = createButton(button_text);

  text_color = color('black');
}

function recreate_button(ref, label){
  //destroys old button and replaces ref with new button
  
  ref.remove();
  ref = createButton(label);
  
  return(ref);
}


function move_button(){
  //plays a sound, moves button, updates missed counter

  sound.play();
  button_x = random(400);
  button_y = random(400);

  missed += 1;
  let text_string = ['You have missed ', missed.toString(), ' times'];
  
  switch(missed){
    case 10:{
      text_color = color('red');
      button_text = 'are you even trying?';
      
      button = recreate_button(button, button_text);
      
    }break;
    
    case 20:{
      text_color = color('orange');
      button_text = 'You need to try harder!';
      
      button = recreate_button(button, button_text);
    }break;
    
    case 30:{
      text_color = color('purple');
      button_text = 'Still not good enough!';
      
      button = recreate_button(button, button_text);
    }break;
    
    case 30:{
      text_color = color('green');
      button_text = 'FASTER!';
      
      button = recreate_button(button, button_text);
    }break;
    
     case 40:{
      text_color = color('red');
      button_text = 'Click this button!';
      
      button = recreate_button(button, button_text);
    }break;
  }
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
  fill(text_color);
  text(drawn_text,32,32);
  fill(color('black'));

  button.position(button_x, button_y);   //draws button
  step(); //calls custom step function
}