import SearchView from '../views/SearchView/SearchView.vue'
import HomeView from '../views/HomeView/HomeView.vue';
import SongDetailsView from '../views/SongDetails/SongDetailsView.vue'
// import player from '../views/HomeView/Player/Player.vue'
import PlayView from '../views/HomeView/PlayView.vue'
export default [
  //路径重定向
  {
    path: '/',
    redirect: '/HomeView'
  },
  {
    path: '/SearchView',
    component: SearchView
  },
  {
    path: '/HomeView',
    component: HomeView
  },
  {
    path: '/Login',
    component: () => import('@/views/HomeView/Login.vue')
  },
  {
    path: '/song',
    component: SongDetailsView
  },
  {
    path: '/UserInfo',
    component: () => import('@/views/HomeView/UserInfo')
  },
  {
    path: '/miFile',
    component: () => import('@/views/HomeView/miFile')
  },
  {
    path: '/nickname',
    component: () => import('@/views/HomeView/editInfo/nickname')
  },
  {
    path: '/College',
    component: () => import('@/views/HomeView/editInfo/College')
  },
  {
    path: '/PlayView',
    component: PlayView
  },
  // {
  //   path:'/player',
  //   component:player
  // },
]