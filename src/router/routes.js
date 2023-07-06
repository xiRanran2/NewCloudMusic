import SearchView from '../views/SearchView/SearchView.vue'
import HomeView from '../views/HomeView/HomeView.vue';
import SongDetailsView from '../views/SongDetails/SongDetailsView.vue'

export default [
    //路径重定向
    {
      path:'/',
      redirect:'/HomeView'
    },
    {
      path:'/SearchView',
      component:SearchView
    },
    {
      path:'/HomeView',
      component:HomeView
    },
    {
      path:'/Login',
      component:() => import('@/views/HomeView/Login.vue')
    },
    {
      path:'/song',
      component:SongDetailsView
    }
]