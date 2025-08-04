import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import '@/uilt/flexible'
import i18n from './lange';
import 'dayjs/locale/zh-cn';

import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn';



const app=createApp(App)

app.use(router)
app.use(i18n)
app.use(ElementPlus,{
    locale
 })
app.mount('#app')
