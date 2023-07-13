<template>
    <div :class="{ dark: switchCheckStatus }">
      <!-- 音乐日历标题 -->
      <div
          class="ml-[4vw] mt-[3vw] w-[90vw] flex m-auto justify-between items-center"
        >
          <div>
            <span class="text-[#fff] dark:text-[#000] ">音乐日历</span>
            <span  class="text-[#fff] text-[1vw] dark:text-[#000] bg-[#4f5054] dark:bg-[#fff] rounded-[3vw] p-[1vw]">今日{{ calendar.length }}条<Icon icon="bi:chevron-right" class="inline-block text-[3vw] text-[#fff] dark:text-[#000] " /></span>
            
          </div>
          
          <span @click="show = !show">
            <Icon icon="uim:ellipsis-v" class="text-[#aea4a4] dark:text-[#4b4545]" />
          </span>
      </div>
      <!-- 音乐日历 -->
      <ul class=" rounded-[2vw] w-[89vw] ml-[3vw] mt-[2vw] mb-[2vw] bg-[#272930] dark:bg-[#fff]">
        <li
          class="flex items-center justify-around mb-[2vw]"
          v-for="item in name"
          :key="item.id"
        >
          <div class="w-[60vw]">
            <div class="flex items-center">
              <p class="text-[2.5vw] text-[#ccc] dark:text-[rgb(166,172,105)]">今天 {{ dayjs(onlineTime).format('MM/DD') }}</p>
            </div>
            <p class="text-[3vw] text-[#fff] dark:text-[rgb(0,0,0)]">{{ item.title }}</p>
          </div>
          <img
            :src="item.imgUrl"
            alt=""
            class="w-[13vw] rounded-[2vw] mt-[1vw]"
          />
        </li>
      </ul>
      <van-popup
          v-model="show"
          closeable
          position="bottom"
          :style="{ height: '25%', backgroundColor: '#7d7373' }"
          
          round
        >
          <p class="text-[#e5e7eb] text-[1vw] p-[4vw]">音乐日历</p>
          <ul class="text-[white]">
            <li
              class="text-[5vw] w-[31vw] h-[9vw] flex justify-evenly items-center ml-[3vw]"
            >
              <Icon icon="icon-park-outline:good-one" color="white" />
              <span>优先推选</span>
            </li>
            <li
              class="text-[5vw] w-[31vw] h-[9vw] flex justify-evenly items-center ml-[3vw]"
            >
              <Icon icon="basil:heart-off-outline" color="white" />
              <span>减少推荐</span>
            </li>
            <li
              class="text-[5vw] w-[31vw] h-[9vw] flex justify-evenly items-center ml-[3vw]"
            >
              <Icon icon="mingcute:more-4-line" color="white" />
              <span>更多内容</span>
            </li>
          </ul>
        </van-popup>
    </div>
</template>
  
  <script>
  import dayjs from 'dayjs';
  import store from 'storejs';
  import Vue from 'vue';
  Vue.prototype.dayjs = dayjs;
  
  export default {
    name: 'musiccalender',
    props: ['calendar'],
    data() {
      return {
        // calendar:[],
        show:false,
        switchCheckStatus:null,
        onlineTime: "" // 设置初始值
      };
    },
    methods: {
      clickMe() {
        this.$emit('updateMsg', this.$refs.getTitle.innerHTML);
      },
    },
    computed: {
      name() {
        return this.calendar.filter((item, index) => index < 2);
      },
    },
    created(){
        this.switchCheckStatus = store.get('switch');
      },
  };
  </script>