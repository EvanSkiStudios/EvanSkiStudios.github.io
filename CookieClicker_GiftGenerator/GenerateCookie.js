function GenerateGiftCode(){
  var giftString = "MAIL|"+Date.now()+"|1000|34 3|Generated Cookies|"
  return btoa(giftString); 
}

function CheckGiftCode(str){
    giftBoxDesigns=[[34,6],[16,9],[34,3],[34,4],[34,5],[34,7],[34,8],[34,9],[34,10],[34,11],[34,12]];
  
    var out={cookies:1,message:false,icon:giftBoxDesigns[0]};
    str=atob(str);
    if (!str) return false;
    str=str.split('|');
    if (str[0]!=='MAIL') return false;

    var val=parseInt(str[1]||0);
        if (Math.abs(Date.now()-val)>1000*60*60*24*2) return -1;

    val=parseInt(str[2]||0);
        if (val<1) val=1;
        if (val>1000) val=1000;
        val=val||1;
        out.cookies=val;

    val=str[3]||0;
        if (val=='-') val=0;
        if (val) val=val.split(' ');
        if (val.length!=2 || isNaN(val[0]) || isNaN(val[1])) val=0;
        if (val) val=[parseInt(val[0]),parseInt(val[1])];
        if (val) out.icon=val;

    val=(str[4]||'').split('\n').slice(0,4);
        for (var i=0;i<val.length;i++){val[i]=val[i].substring(0,25);}
        val=val.join('\n');
        val=val.replace(/\/\$\//g,'|');
        val=val.substring(0,100);
        if (val) out.message=val;

    return out;
}
