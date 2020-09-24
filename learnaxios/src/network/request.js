import axios from 'axios';

export function request(config) {
  // 创建axios的示例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })

  // axios的拦截器
  instance.interceptors.request.use(config => { 
    console.log(config)
    // 比如说config中的某些信息不符合服务器要求
    // 比如每次发送网络请求时，都希望再界面时显示一个请求的图标
    // 某些网络请求，比如登录，必须携带一些特殊的信息
    return config;
  }, err => { 
    console.log(err);
  });

  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err =>{
    console.log(err);
  });
  // 发送真正的网络请求
  return instance(config);
}

// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: 'http://152.136.185.210:8000/api/z8',
//       timeout: 5000
//     })

//     instance(config)
//       .then( res =>{
//         resolve(res)
//       })
//       .catch( err =>{
//         reject(err)
//       })
//   })
// }
// export function request(config) {
//   const instance = axios.create({
//     baseURL: 'http://152.136.185.210:8000/api/z8',
//     timeout: 5000
//   })

//   instance(config.baseConfig)
//     .then(res => {
//       // console.log(res);
//       config.success(res);
//     })
//     .catch(err => {
//       // console.log(err);
//       config.failure(err);
//     })
// }


// export function request(config, success, failure) {
//   const instance = axios.create({
//     baseURL: 'http://152.136.185.210:8000/api/z8',
//     timeout: 5000
//   })

//   instance(config)
//     .then(res => {
//       // console.log(res);
//       success(res);
//     })
//     .catch(err => {
//       // console.log(err);
//       failure(err);
//     })
// }