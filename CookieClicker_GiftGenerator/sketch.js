let cookies = [];
let cookie_ammount = 5;

let img;
let img_background;

function preload() {
  img = loadImage('assets/cookie.png');
  img_background = loadImage('assets/background.png');
}

function init_start_button(){
  button_title = 'Generate Gift';
  button = createButton(button_title);
  
  button_w = (width/2 - textWidth(button_title)/2);
  button.position(button_w, height/2);
  button.mousePressed(CreateGiftCode);
}

function CreateGiftCode(){
  var cookies = GenerateGiftCode();
  inp = createInput(cookies);
  cookiekey = inp.value();
}

function update_elements(){
  if (button != undefined){
    button.center();
  }
  
  //created gift
  if (inp != undefined){
    
    //remove old button
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
    fill(255);
    let enjoy = 'Enjoy your Cookies!';
    text(enjoy, ((width/2) - textWidth(enjoy)/2), _h - textSize());
    
    let inp_size = 650;
    inp.size(inp_size);
    inp.center();
  }
}  

function setup() {
  
  for (var i = 0; i < cookie_ammount; ++i){
    cookies[i] = new Cookie(img);
  }
  
  inp = undefined;
  
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  
  init_start_button();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 255, 255);
  
   if (inp != undefined){
     image(img_background, 0, 0, windowWidth, windowHeight);
     
     //cookies
     for (let cookie of cookies){
        cookie.show();
        cookie.update();
     }
   }
  
  update_elements();
}