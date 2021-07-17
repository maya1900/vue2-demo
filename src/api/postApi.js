import service from 'service';

export function postApi (url, data) {
  return new Promise((resolve, reject) =>{
    service.post({
      url,
      data
    }).then((res) =>{
      resolve(res.data)
    }).catch(err =>{
      reject(err)
    })
  })
}
