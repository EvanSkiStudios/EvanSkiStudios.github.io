async function fetchAsync(url) {
 try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

function alive_detector(data){
  if (!data || !data.extract) return false;
  return data.extract.includes("Donald John Trump is");
}

async function query_wiki(){
const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Donald_Trump';
  const data = await fetchAsync(url);
  if (!data) return null;
  return alive_detector(data);
}


function get_trump_status(){
    switch(trump_status){
      case true: status_text = 'Alive'; break;

      case false: status_text = 'Deceased'; break;

      default: status_text = "An Error has occured try again Later"; break;
    }
  
  return status_text
}