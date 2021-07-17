import service from "../service";

export function getApi (url) {
  return new Promise((resolve, reject) =>{
    service.get({
      url,
      method: 'GET'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getApi1 (url, params) {
  return new Promise((resolve, reject) =>{
    service.get({
      url,
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
