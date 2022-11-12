import VueRouter from 'vue-router'
import TableAdd from '../pages/TableAdd.vue'
import TableInfo from '../pages/TableInfo.vue'
import FileUpload from '../pages/FileUpload.vue'
import FileList from '../pages/FileList.vue'
import LoginScreen from '../components/LoginScreen.vue'
// import {
//     Message
// } from 'element-ui'
// import { getCookie } from '../utils/cookie'
import { Message } from 'element-ui'
const router = new VueRouter({
    routes: [{
            name: 'TableAdd',
            path: '/TableAdd',
            component: TableAdd,

        }, {
            name: 'TableInfo',
            path: '/TableInfo',
            component: TableInfo,

        },
        {
            name: 'FileUpload',
            path: '/FileUpload',
            component: FileUpload,
            meta: {
                requireAuth: true
            }
        },
        {
            name: 'FileList',
            path: '/FileList',
            component: FileList,
            meta: {
                requireAuth: true
            }
        },
        {
            name: 'LoginScreen',
            path: '/LoginScreen',
            component: LoginScreen,
            meta: {
                requireAuth: false
            }
        }


    ]
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

// function getCookie(name) {
//     var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
//     // return arr
//     if (arr != null) {
//         return unescape(arr[2])
//     } else {
//         return null
//     }
// }
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (sessionStorage.username) {
            next();
        } else {
            Message.warning({
                message: "还未登录,请先登录"
            })
            next({
                path: '/LoginScreen',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next();
    }
    // if (getCookie("mk_l") === '1') {
    //     next()
    // } else {
    //     if (to.path === "/LoginScreen") {
    //         next()
    //     } else {
    //         next('/LoginScreen')
    //     }
    // }

})
export default router