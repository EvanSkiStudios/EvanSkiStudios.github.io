class Cookie {
  
  constructor(img){
    this.img = img;
    this.x = random(windowWidth);
    this.y = -600;
    this.startX = this.x;
    this.startY = this.y;
    this.fallspeed = random(10,50);
    this.size = random(50,200);
    this.rotation = random(361);
  }
  
  show(){
  //  push();
  //  translate(this.startX + this.size/2, this.startY + this.size/2);
  //  imageMode(CENTER);
 //   rotate(this.rotation);
    image(this.img, this.x, this.y, this.size, this.size);
 //   pop();
    
 //   translate(0,0);
  //  rotate(0);
    this.y += this.fallspeed;
  }
  
  update(){
     if (this.y > windowHeight){
        this.fallspeed = random(10,50);
        this.x = random(windowWidth);
        this.y = -600; 
        this.size = random(50,200);
     }
  }
  
}