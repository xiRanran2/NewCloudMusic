<template>
  <div :class="{ dark: switchCheckStatus }">
    <!-- 内置组件  component：渲染其他的组件的组件 -->
    <!-- 声明式导航 -->

    <!-- <router-link to="/IndexView">go to index</router-link> -->
    <!-- 底部导航栏 -->
    <router-view />
    
    <div class="fixed bottom-0 left-0 w-[100%]" v-if="ifBottom">
      <!-- 播放器 -->
      <Player class="w-[100%] z-[60] px-[5vw]" v-if="ifShow"/>
    <!-- 菜单 -->
    <!-- <Menu /> -->
    <van-tabbar route :fixed="false" v-if="ifMid">
      <van-tabbar-item replace to="/HomeView">首页
        <template #icon>
          <span class="flex items-center justify-centerinline-block w-[7.75vw] h-[7.75vw] rounded-[50%] p-[1vw]">
            <Icon icon="tabler:brand-netease-music" class="w-[5.75vw] h-[5.38vw]"/>
          </span>
          
        </template> 

      </van-tabbar-item>
      <van-tabbar-item replace to="/MVListView">排行榜<template #icon>
        <span class="inline-block w-[7.75vw] h-[7.75vw] rounded-[50%] p-[1vw]"><Icon icon="solar:chart-outline" class="w-[5.75vw] h-[5.38vw]"/></span>
        
      </template></van-tabbar-item>
      <van-tabbar-item replace to="/UserInfo">我的 <template #icon>
        <span class="inline-block w-[7.75vw] h-[7.75vw] rounded-[50%] p-[1vw]"><Icon icon="mingcute:music-line" class="w-[5.75vw] h-[5.38vw]"/></span>
        
      </template></van-tabbar-item>
      <van-tabbar-item replace to="/miFile" icon="ion:person-add-outline">关注<template #icon>
        <span class="inline-block w-[7.75vw] h-[7.75vw] rounded-[50%] p-[1vw]"><Icon icon="ion:person-add-outline" class="w-[5.75vw] h-[5.38vw]"/></span>
        
      </template></van-tabbar-item>
    </van-tabbar>
    </div>
  </div>
</template>
<script>
import store from 'storejs';
export default {
  data() {
    return {
      switchCheckStatus: null,
      active: 'HomeView',
    };
  },
  methods: {},
  computed: {
    ifMid(){   //底部
      return this.$route.path !== '/UserInfo'&&  this.$route.path !== '/MVListView'
    },
    ifShow() {   //全部
      return   this.$route.path !== '/Login';
    },
    ifBottom(){
      return this.$route.path !== '/PlayView' && this.$route.path !== '/miFile' && this.$route.path !== '/VideoPlayView'
    },
  },
  async created() {
    this.switchCheckStatus = store.get('switch');
  },
};
</script>
<style>
@tailwind base;
@tailwind utilities;
@tailwind components;

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.van-tabbar{
  background-color: #7f7f7f !important;
}
.dark .van-tabbar{
  background-color: #f9fcfc !important;
}
.van-tabbar-item--active .van-tabbar-item__text{
  color: #eb4d44 !important; 
}
.van-tabbar-item--active{
  background:none !important;
}
.dark .van-tabbar-item--active{
  background: none !important;
}
.van-tabbar-item__icon{
  margin-bottom: 1px !important;
}
.van-tabbar-item--active .van-tabbar-item__icon{
  color: #fff !important;
}
.van-tabbar-item--active .van-tabbar-item__icon span{
  background-color: #e94855 !important;
}
</style>
