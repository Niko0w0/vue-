import VueRouter from 'vue-router';
import Vue from 'vue';
// import Home from '../components/Home'
// import About from '../components/About'
// import User from '../components/User'

const Home = () => import('../components/Home');
const HomeNews = () => import('../components/HomeNews');
const HomeMessage = () => import('../components/HomeMessage');

const About = () => import('../components/About');
const User = () => import('../components/User');
const Profile = () => import('../components/Profile');

Vue.use(VueRouter);
const routes = [
  {
    path: '',
    //重定向
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta:{
      title : '首页'
    },
    children:[
      {
        path: '',
        redirect:'news'
      },
      {
        // 子组件路径不需要加/
        path:'news',
        component: HomeNews
      },
      {
        path:'message',
        component:HomeMessage
      }
    ]
  },
  {
    path: '/about',
    component: About,
    meta:{
      title : '关于'
    },
  },
  {
    path: '/user/:userId',
    component: User,
    meta:{
      title : '用户'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta:{
      title : '档案'
    }
  }
]
const router = new VueRouter({
  routes,
  // 可以去掉#，强行使用history模式
  mode: 'history',
  // linkActiveClass: 'active'
})

// 前置钩子(hook)
router.beforeEach((to, from, next) =>{
  // console.log('beforeEach');
  // 从from跳转到tu
  document.title = to.matched[0].meta.title
  next()
})

// 后置钩子
router.afterEach((to, from) => {
  // console.log('afterEach');
});

export default router