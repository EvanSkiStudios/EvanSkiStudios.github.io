function CreateGiftCode(){
  var cookies = GenerateGiftCode();
  inp = createInput(cookies);
  cookiekey = inp.value();
}

function setup() {
  inp = undefined;
  
  const canvas_w = 500;
  const canvas_h = 500;
  
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  
  button_title = 'Generate Gift';
  button = createButton(button_title);
  
  button_w = (width/2 - textWidth(button_title)/2);
  button.position(button_w, canvas_h/2);
  button.mousePressed(CreateGiftCode);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 255, 255);
  
  if (button != undefined){
    button.center();
  }
  
  if (inp != undefined){
    if (button != undefined){
      button.remove();
      button = undefined;
    }
    
    var _b = (inp.value() === cookiekey);
    if (!_b){
      inp.value(cookiekey);
    }
    
    let _h = (height / 2);
    textSize(32);
    let enjoy = 'Enjoy your Cookies!';
    text(enjoy, ((width/2) - textWidth(enjoy)/2), _h - textSize());
    
    let inp_size = 650;
    inp.size(inp_size);
    inp.center();
    
  }
}