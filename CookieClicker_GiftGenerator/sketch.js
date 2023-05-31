function CreateGiftCode(){
  var cookies = GenerateGiftCode();
  //console.log(cookies);
  //var out = CheckGiftCode(cookies);
  //console.log(out);
  inp = createInput(cookies);
  cookiekey = inp.value();
}

//checks if user pressed enter
function keyReleased() {
    if (keyCode === ENTER) {
       console.log(inp.value()); 
    }
   return false;
}

function setup() {
  inp = undefined;
  
  const canvas_w = 500;
  const canvas_h = 500;
  
  createCanvas(canvas_w, canvas_h);
  
  button_title = 'Generate Gift';
  button = createButton(button_title);
  
  button_w = (width/2 - textWidth(button_title)/2);
  button.position(button_w, canvas_h/2);
  button.mousePressed(CreateGiftCode);
}

function draw() {
  background(255, 255, 255);
  
  if (inp != undefined){
    button.remove();
    
    inp.value(cookiekey);
    
    let _h = (height / 2);
    textSize(32);
    let enjoy = 'Enjoy your Cookies!';
    text(enjoy, ((width/2) - textWidth(enjoy)/2), _h - textSize());
    
    let inp_size = 200;
    inp.size(inp_size);
    inp.position((width / 2) - (inp_size / 2),_h);
    
  }
}