<template>
    <div :class="{ dark: switchCheckStatus }">
      <!-- 音乐日历标题 -->
      <div
          class="ml-[4vw] mt-[3vw] w-[90vw] flex m-auto justify-between items-center"
        >
          <div>
            <span class="text-[#fff] dark:text-[#000] ">音乐日历</span>
            <span  class="text-[#fff] text-[1vw] dark:text-[#000] bg-[#4f5054] dark:bg-[rgb(232,211,210)] rounded-[3vw]">今日{{ calendar.length }}条<Icon icon="bi:chevron-right" class="inline-block text-[3vw] text-[#fff] dark:text-[#000] " /></span>
            
          </div>
          <Icon icon="uim:ellipsis-v" class="text-[#aea4a4] dark:text-[rgb(166,172,105)]" />
        </div>
      <!-- 音乐日历 -->
      <ul class=" rounded-[2vw] w-[89vw] ml-[3vw] mt-[2vw] bg-[#4f5054] dark:bg-[rgb(232,211,210)]">
        <li
          class="flex items-center justify-around"
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
            class="w-[13vw] rounded-[2vw]"
          />
        </li>
      </ul>
    </div>
</template>
  
  <script>
  import dayjs from 'dayjs';
  Vue.prototype.dayjs = dayjs;
  
  export default {
    name: 'musiccalender',
    props: ['calendar'],
    data() {
      return {
        calendar:[],
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
  };
  </script>