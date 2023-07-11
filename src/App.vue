<template>
  <div :class="{ dark: switchCheckStatus }">
    <!-- 内置组件  component：渲染其他的组件的组件 -->
    <!-- 声明式导航 -->

    <!-- <router-link to="/IndexView">go to index</router-link> -->
    <router-view />
    <!-- 播放器 -->
    <Player class="fixed bottom-0 w-[100%] z-[60]"  v-if="shouldShowMyComponent" :is="myComponentName"/>
    <!-- 菜单 -->
    <Menu />
  </div>
</template>
<script>
import store from 'storejs';
import Player from '@/views/HomeView/Player/Player.vue';
import Menu from '@/views/HomeView/Menu/Menu.vue';
export default {
  components: { Player , Menu },
  data(){
    return{
      switchCheckStatus: null,
      isPlaying: false,
      show: false,    //菜单
    }
  },
  methods:{
    togglePlay() {
        this.isPlaying = !this.isPlaying;
    }
  },
  computed: {
    darkMode() {
      // return store.state.darkMode;
    },
    spinStyle() {
        return this.isPlaying ? { animation: 'spin 2s linear infinite' } : {};
    },
    shouldShowMyComponent() {
      // 判断当前路由是否在需要显示 MyComponent 的页面中
      const showOnRoutes = ['/HomeView', '/song','/UserInfo','miFile'] // 修改为你需要显示的页面路径
      return showOnRoutes.includes(this.$route.path)
    },
    myComponentName() {
      return Player
    }
  },
  async created() {
    this.switchCheckStatus = store.get('switch');
    // setTimeout(() => {
    //   //编程式导航
    //   this.$router.push('/IndexView')
    // },10000)
  },
};
</script>
<style>
@tailwind base;
@tailwind utilities;
@tailwind components;

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
