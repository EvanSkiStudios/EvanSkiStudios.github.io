let nextDateText = "The GMC Jam 52"
let jamDate = "May 30"
let countDownDate = new Date(jamDate + ", 2024 06:00:00").getTime();


function Clock(){
  // Get today's date and time
  let timeNow = new Date().getTime();

  // Find the distance between now and the count down date
  let timeDistance = countDownDate - timeNow ;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(timeDistance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeDistance % (1000 * 60)) / 1000);

  hours += days * 24;
  
  //days + "d " + hours + "h " + minutes + "m " + seconds + "s "
  dateString = (hours + "h " + minutes + "m " + seconds + "s ");
  
  return(dateString);
}

function setup() {
  Dosis = loadFont('fonts/Dosis-SemiBold.ttf');
  
  createCanvas(windowWidth, windowHeight);
  
  fourmLink = createA('https://forum.gamemaker.io/index.php?forums/gmc-jam.9/', 'Forum Link');
  fourmLink.style('color', '#88d658');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#292929');
    
  let halfHeight = (height/2);
  let halfWidth = (width/2);
  
  textFont('Arial');
  textSize(16);
  textAlign(CENTER);
  text("Welcome!\nThe GMC Jam is a game jam hosted on the YoYo Games Forums.\nMembers can compete to create the best game using GameMaker.\nCompetitors are advised to follow a theme and must complete their game within 4 days.",halfWidth,48);
  
  fourmLink.position(halfWidth - textWidth('Forum Link')/2, 120);
  
  textAlign(LEFT);
  textFont(Dosis);
  fill('#88d658');
  textSize(48);

  tW = (halfWidth - textWidth(nextDateText) * 0.5);
  text(nextDateText, tW, halfHeight - 124);
  
  let startsInText = "starts in:"
  tW = (halfWidth - textWidth(startsInText) * 0.5);
  text(startsInText, tW, halfHeight - 82);
  
  let dateText = Clock();
  tW = ( halfWidth - textWidth(dateText) * 0.5 );
  text(dateText, tW, halfHeight);
}