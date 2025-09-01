let status_text = 'Checking...';
let trump_status = '';
let img;
let alive_img;
let dead_img;

let confetti = [];
const NUM_CONFETTI = 150;

function preload() {
  alive_img = loadImage('assets/trump_alive.png');
  dead_img = loadImage('assets/trump_dead.png');
  
  img = alive_img;
  
  music = createAudio('assets/Who Likes to Party.mp3');
}

async function check_trump(){
  trump_status = await query_wiki();
  get_trump_status(); 
  console.log('checked Wikipedia')
}


function party(){
  trump_status = false;
  get_trump_status();
  
  button.remove();
  button = undefined;
  
  music.play();
  clearInterval(intervalID);
}

function init_start_button(){
  button_title = "But what if he wasn't";
  button = createButton(button_title);
  
  button_w = (windowWidth/2) - textWidth(button_title)/2;
  button.position(button_w, height/2 + 250);
  button.mousePressed(party);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

async function setup() {
   // Call myFunction every 1 seconds
  intervalID = setInterval(check_trump, 1000);
  
  colorMode(HSB); // use Hue, Saturation, Brightness instead of RGB
  
    // initialize confetti
  for (let i = 0; i < NUM_CONFETTI; i++) {
    confetti.push(createConfetti());
  }
  updateConfetti()
  
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  
  trump_status = await query_wiki();
  get_trump_status();
  
  if (trump_status == true){
    init_start_button()
  }
}

function draw(){
  background(0);
  
  if (trump_status == true){
    img = alive_img;
    music.stop();
  }
  
  
  if (trump_status == false){
    img = dead_img;
    
    let hue = frameCount * 1 % 360; // cycles hue from 0 → 359
    background(hue, 100, 100); // full saturation, full brightness
  }
  textSize(48);
  fill(255);
  
  title = 'Donald Trump is...'
  text(title, 
        (width/2) - (textWidth(title)/2), 
        100
      );  
  
  // Donald Image
  if (img) {
    image(
      img,
      (width/2) - (img.width/2),
      (height/2) - (img.height/2),
      img.width, img.height
    );
  }
  
  textSize(24);
  // is bro dead
  text(status_text, 
        (width/2) - (textWidth(status_text)/2), 
        (height/2) + (img.height/2) + 50
      );  
  
  textSize(12);
  fill(125);
  // information
  information = "Calcualted by checking the 'tense' of Trump's wikipedia page"
  text(information, 
        (width/2) - (textWidth(information)/2), 
        25
      );  
  
  if (trump_status == false){
    updateConfetti();
    drawConfetti();
  }
  
  
  textSize(16);
  fill(255);
     let credit = ("\"Who Likes to Party\" by Kevin MacLeod (incompetech.com)\n"+"Licensed under Creative Commons: By Attribution 4.0 License\n"+"http://creativecommons.org/licenses/by/4.0/");
    text(credit, (windowWidth/2) - textWidth(credit)/2, windowHeight - textSize()*4);
}