import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

createApp(App).use(VueAxios, axios, Antd).mount('#app')
