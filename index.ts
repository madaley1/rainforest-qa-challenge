const startingUrl = 'https://www.letsrevolutionizetesting.com/challenge';

const fs = require('node:fs');

async function fetchUrl(url: string){
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json; charset=utf-8');
  const options = {
    headers,
    method: 'GET',
  };
  const response = await fetch(url, options);
  const json = await response.json();
  return json;  
}

async function recursiveFetch(url){
  const json = await fetchUrl(url);
  if(json.follow){
    console.log(json.follow);
    fs.appendFileSync('output.txt', json.follow + '\n');
    return recursiveFetch(json.follow);
  }else{
    console.log(json.message)
    fs.appendFileSync('output.txt', json.message + '\n');
    return json?.message;
  }
}

function main(startingUrl: string){
  console.log('Starting url: ', startingUrl);
  fs.writeFileSync('output.txt', 'Starting url: ' + startingUrl + '\n');
  recursiveFetch(startingUrl);
}

main(startingUrl);