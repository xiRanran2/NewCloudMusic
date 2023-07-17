import SearchView from '../views/SearchView/SearchView.vue'
import HomeView from '../views/HomeView/HomeView.vue';
import SongDetailsView from '../views/SongDetails/SongDetailsView.vue'
import MVListView from  '@/views/HomeView/MVListView.vue'
import PlayView from '../views/HomeView/PlayView.vue'
import VideoPlayView from '../views/HomeView/VideoPlayView.vue'
export default [
  //路径重定向
  {
    path: '/',
    redirect: '/MVListView'
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
    path: '/PlayView',
    component: PlayView
  },
  {
    path:'/MVListView',
    component:MVListView
  },
  {
    path: '/VideoPlayView',
    name: 'VideoPlayView',
    component: VideoPlayView,
  },
]