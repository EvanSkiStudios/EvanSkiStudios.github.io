async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function alive_detector(data){
    let alive = false;
  
    if (data.extract.includes("Donald John Trump is")){
      alive = true;  
    }
    return alive;
}

async function query_wiki(){
  let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Donald_Trump'
  await fetchAsync(url).then(data => {
      status = alive_detector(data);
    });
  return status;
}


function get_trump_status(){
    switch(trump_status){
      case 'true': status_text = 'Alive'; break;

      case 'false': status_text = 'Deceased'; break;

      default: status_text = "An Error has occured try again Later"; break;
    }
  
  return trump_status
}