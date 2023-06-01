function GenerateGiftCode(){
  //img/icons.png
  //var giftBoxDesign_X = round(random(0,36));
  //var giftBoxDesign_Y = round(random(0,37));
  //"34 "+round(random(0,7)); - normal gift icons
  
  var giftString = ("MAIL|" + Date.now() + "|1000|10 6|Generated Cookies\ntaste stale.|");
  return btoa(giftString); 
}
