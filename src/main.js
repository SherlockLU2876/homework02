import Vue from 'vue'
import App from './App.vue'
//引入router
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VueCookies from 'vue-cookies'
// import VueResource from 'vue-resource'
Vue.config.productionTip = false
    // Vue.use(VueResource)
Vue.use(VueCookies)

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(ViewUI);

new Vue({
        render: h => h(App),
        router: router,
    }).$mount('#app')
    // main.js

// Vue.prototype.getCookie = getCookie; /* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     template: '<App/>',
//     components: {
//         App,
//         ElementUI
//     },
//     watch: {
//         //监测router 检测网址、 地址栏变化 路由发生变化时 
//         "$route": 'checkLogin'
//     },
//     created() {
//         //Vue生命周期 上来就一顿执行 
//         this.checkLogin();
//     },
//     methods: {
//         checkLogin() { //检查是否存在session      //cookie操作方法在源码里有或者参考网上的即可     
//             if (!this.getCookie('session')) { //如果没有登录状态则跳转到登录页       
//                 this.$router.push('/login');
//             } else { //否则跳转到登录后的页面       
//                 this.$router.push('/user_info');
//             }
//         }
//     }
// })