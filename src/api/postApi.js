import service from 'service';
import qs from 'qs';
export function postApi (url, data) {
  return new Promise((resolve, reject) =>{
    service.post({
      url,
      method: 'POST',
      data: qs.stringify(data)
    }).then((res) =>{
      resolve(res.data)
    }).catch(err =>{
      reject(err)
    })
  })
}
