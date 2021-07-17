import axios from 'axios';
import router from '../router';

 const service = axios.create({
   timeout: 60000,
   baseURL:process.env.BASE_URL
 })

 service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

 service.interceptors.request.use(config => {
  //  const token = localStorage.getItem('token');
  //  if (token) {
  //    config.headers['Authorization'] = token;
  //  }
   return config;
 }, error => {
   return Promise.reject(error)
 })

service.interceptors.response.use(response => {
  const responseCode = response.status
  if (responseCode === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  if (!error.response) {
    if (error.message.includes('timeout')) {
      console.log('超时了')
    } else {
      console.log('断网了')
    }
    return
  }
  const responseCode = error.response.status
  switch (responseCode) {
    case 401:
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      break
    case 403:
      console.log('登录信息过期')
      localStorage.removeItem('token')
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }, 1000);
      break
    case 404:
      console.log('网络请求不存在')
      break
    default:
      console.log(error.response.data.message)
  }
  return Promise.reject(error)
})

export default service
