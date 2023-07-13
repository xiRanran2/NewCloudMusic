<template>
  <div :class="{ dark: switchCheckStatus }">
    <!-- 内置组件  component：渲染其他的组件的组件 -->
    <!-- 声明式导航 -->

    <!-- <router-link to="/IndexView">go to index</router-link> -->
    <!-- 底部导航栏 -->
    <router-view />
    <!-- 播放器 -->
    <Player class="fixed bottom-0 w-[100%] z-[60]" v-if="ifShow" />
    <!-- 菜单 -->
    <!-- <Menu /> -->
  </div>
</template>
<script>
import store from 'storejs';
export default {
  data() {
    return {
      switchCheckStatus: null,
    };
  },
  methods: {},
  computed: {
    ifShow() {
      return this.$route.path !== '/PlayView' &&  this.$route.path !== '/Login';
    },
  },
  async created() {
    this.switchCheckStatus = store.get('switch');
    // this.$watch('$route',function(route){
    //   console.log(route)
    // });  //监听
    // this.$on("hook:beforeDestory",() => {})
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
</style>
