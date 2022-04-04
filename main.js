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

  BAD_button_x = random(400);
  BAD_button_y = random(400);
  
  button_x = random(400);
  button_y = random(400);
  button_text = 'Click dis button';
  button = createButton(button_text);

  BAD_button = false;
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
  
  BAD_button_x = button_x;
  BAD_button_y = button_y;
  
  button_x = random(400);
  button_y = random(400);

  missed += 1;
  let text_string = ['You have missed ', missed.toString(), ' times'];
  
  //progression
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
       
      BAD_button_text = 'DON\'T Click this button!';
      BAD_button = createButton(BAD_button_text); 
       
    }break;
  }
}

function execute_button(){
  //if you manage to click the button, play reward video
  window.location.replace("https://youtu.be/YxjY_YTksKM?t=14");
}

function execute_BAD_button(){
  
  BAD_button.remove();
  
  missed = 0;
  
  BAD_button_x = random(400);
  BAD_button_y = random(400);
  
  button_x = random(400);
  button_y = random(400);
  button_text = 'Click dis button';

  BAD_button = false;
  text_color = color('black');
}


function step(){
  //checks if you have moused over or pressed the button
  button.mouseOver(move_button);
  button.mousePressed(execute_button);
  
  if (BAD_button != false){
    BAD_button.mousePressed(execute_BAD_button);
  }
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
  
  if (BAD_button != false){
    BAD_button.position(BAD_button_x, BAD_button_y);
  }
  
  step(); //calls custom step function
}