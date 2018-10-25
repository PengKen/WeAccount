import {API_URL} from "./constant";

export default class HttpUtil {
  static get(url) {
    return new Promise((resolve,reject) => {
      fetch(API_URL+url,{
        // body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'accept':'application/json',
          'content-type': 'application/json'
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      })
        .then(response => {
          if(response.ok) {
            return response.json()
          }else{
            throw new Error('网络异常');
          }
          })
        .then(json => resolve(json))
        .catch(error => {
          console.warn('There has been a problem with your fetch operation: ', error.message);
        })
    })

  }
}