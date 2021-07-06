import {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import Axios from 'axios';
import VueAxios from 'vue-axios';



const app = createApp(App) 
app.use(VueAxios)
.use(VueAxios,Axios).
use(ElementPlus)
.use(router)

app.config.errorHandler = (err,vm,info)=>{
  
}
app.config.performance = false


app.mount('#app')
