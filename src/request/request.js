import axios from "axios";
// import { ElMessage } from "element-plus";
// import { useRouter } from "vue-router";
// const router=new useRouter()
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const service = axios.create({
  url: "https://noda.ac.cn/",
  timeout: 5000,
  withCredentials: true, // 携带cookie
});

service.interceptors.request.use((config) => {
  // if (localStorage.getItem('token')) {
  //     config.headers['token'] = localStorage.getItem('token');
  //     // config.headers['timestamp'] = Date.parse(new Date())
  // }
  return config;
}),
  (error) => {
    return Promise.reject(error);
  },

 // 响应拦截器
service.interceptors.response.use(
  response => response,
  error => {
     // 处理302重定向
    //  if (error.response?.status === 302) {
    //   const redirectUrl = error.response.headers.location
      
    //   // 如果是API路径重定向（如登录过期）
    //   if (redirectUrl.includes('/login')) {
    //     router.push('/login?redirect=' + encodeURIComponent(router.currentRoute.fullPath))
    //     return Promise.reject('会话过期，请重新登录')
    //   }
      
    //   // 外部URL重定向
    // //   window.location.href = redirectUrl
      return Promise.reject(error)
    // }
    
    // // 其他错误处理
    // ElMessage.error(error.message)
    // return Promise.reject(error)
  }
)

export default service;
