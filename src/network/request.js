import axios from "axios";

export function request(config) {
  const request = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // request.interceptors.request.use(config => {
  //   //console.log(config);
  //   return config
  // },error => {
  //   //console.log(error);
  // })
  //
  // request.interceptors.response.use(result => {
  //   //console.log(result);
  //   return result.data
  // },error => {
  //   console.log(error);
  // })

  return request(config)
}
