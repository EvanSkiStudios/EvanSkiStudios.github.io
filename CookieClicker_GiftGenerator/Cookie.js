class Cookie {
  
  constructor(img){
    this.img = img;
    this.x = random(windowWidth);
    this.y = -600;
    this.fallspeed = random(10,50);
    this.size = random(50,200);
  }
  
  show(){
    this.y += this.fallspeed;
    image(this.img, this.x, this.y, this.size, this.size);
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