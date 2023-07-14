<template>
  <div
    :class="{ dark: switchCheckStatus }"
    class=" bg-[#151515] dark:bg-[#fff]"
  >
    <div class="m-auto h-[100vh] overflow-y-auto bg-[#151515] dark:bg-[#fff] dark:text-[#333334] text-[#fff]">
      <!-- 头部 -->
      <header
        class="px-[4.96vw] w-screen flex h-[17.9vw] items-center pl-[2vw] fixed top-0 left-0 bg-[#151515] dark:bg-[#fff] z-[99]"
      >
        <Icon
          @click.native="$router.push('/HomeView')"
          icon="iconamoon:arrow-up-2-light"
          :rotate="3"
          class="text-[8vw]"
        />
        <span class="ml-[30.09vw] text-[5vw]">MV排行榜</span>
      </header>
      <!-- Tab标签页 -->
      <van-tabs
        @change="changeTab"
        swipeable
        animated
        offset-top="17.9vw"
        class="mt-[17vw] bg-[#151515] px-[4.19vw]"
      >
        <van-tab v-for="items in title" :key="items.id" :title="items">
          <!-- 更新时间 -->
          <div class="h-[11vw] flex items-center">
            <p class="ml-[2vw]">最近更新</p>
            <Icon
              icon="mdi:warning-circle-outline"
              class="text-[#464646] dark:text-[#d8d9d9] ml-[3vw] text-[5vw]"
            />
          </div>
          <ul class="flex flex-col mt-[2.57vw]">
            <li
              v-for="(item, index) in MVList"
              :key="item.id"
              class="mb-[6vw] relative"
            >
              <img
                :src="item.cover"
                class="w-[91.62vw] h-[51.62vw] rounded-[4vw] m-auto"
              />
              <!-- 播放量 -->
              <div class="flex absolute top-[1vw] right-[2vw] items-center">
                <Icon icon="ph:play" />
                <span class="">{{ wan(item.playCount) }}</span>
              </div>
              <div class="flex mt-[2.74vw]">
                <div class="w-[13.33vw] h-[11.37vw] flex relative">
                  <p v-if="index <= 8" class="font-[700] text-[7vw]">
                    <span
                      class="text-[#e14d44] dark:text-[#cd443e]"
                      v-if="index < 3"
                      >0{{ index + 1 }}</span
                    >
                    <span class="text-[#ccc] dark:text-[#999]" v-else
                      >0{{ index + 1 }}</span
                    >
                  </p>
                  <p
                    v-else
                    class="text-[#ccc] dark:text-[#999] font-[700] text-[7vw]"
                  >
                    {{ index + 1 }}
                  </p>
                  <Icon
                    icon="uil:line-alt"
                    class="absolute text-[#606060] left-[2.2vw] top-[4.4vw] rotate-[16deg] text-[7vw]"
                  />
                  <div class="flex absolute right-[-2vw] bottom-[-1vw]">
                    <span
                      v-if="item.lastRank == index + 1"
                      class="text-[#898989] flex"
                      ><Icon icon="ci:line-m" :rotate="1"
                    /></span>
                    <span
                      v-else-if="item.lastRank <= index + 1 && item.lastRank != -1"
                      class="text-[#71b3e2] flex text-[2vw] items-center"
                      ><Icon icon="ph:triangle-fill" :rotate="2" /><i>{{
                        index + 1 - item.lastRank
                      }}</i></span
                    >
                    <span
                      v-else-if="item.lastRank >= index + 1"
                      class="text-[#e66263] flex text-[2vw] items-center"
                      ><Icon icon="ph:triangle-fill" /><i>{{
                        item.lastRank - (index + 1)
                      }}</i></span
                    >
                    <span
                      v-else
                      class="text-[#6d9c65] flex text-[1vw] items-center absolute right-0 bottom-0"
                      >NEW</span
                    >
                  </div>
                </div>
                <div class="flex flex-col ml-[4.56vw]">
                  <p class="w-[76.62vw] truncate">{{ item.mv.title }}</p>
                  <p
                    class="text-[#666] dark:text-[#999] text-[3.08vw] mt-[0.5vw] w-[80vw] truncate"
                  >
                    <span
                      v-for="(itemar, index1) in item.artists"
                      :key="index1"
                    >
                      {{ index1 > 0 ? '/' : '' }}{{ itemar.name }}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { MVList } from '@/request';
import store from 'storejs';
export default {
  data() {
    return {
      title: ['内地', '港台', '欧美', '韩国', '日本'],
      switchCheckStatus: null,
      initial: '内地',
      MVList: [],
      artists: [],
    };
  },
  methods: {
    changeTab(e, title) {
      this.initial = title;
      console.log(e);
      console.log(this.initial);
    },
    wan(num) {
      if (num > 100000000) {
        return Math.floor(num / 100000000) + '亿';
      } else if (num > 10000) {
        return Math.floor(num / 10000) + '万';
      } else {
        return num;
      }
    },
  },
  created() {
    this.switchCheckStatus = store.get('switch');
    MVList(this.initial).then((res) => {
      this.MVList = res.data.data; //内地的数据
      console.log(res);
    });
  },
  watch: {
    initial(value) {
      MVList(value).then((res) => {
        this.MVList = res.data.data;
        console.log(this.MVList);
      });
    },
  },
};
</script>

<style>
.van-tabs__nav {
  background-color: #151515 !important;
}
.van-tab--active {
  color: white !important;
}
.van-tabs {
  height: 14vw !important;
  
}
.van-tabs__wrap {
  width:92%;
  position: fixed;
  top: 15vw;
  background-color: #151515;
  z-index: 3;
}
i {
  text-decoration: none;
}
.van-tabs__track{
  width: 100% !important;
  background-color: #151515;
}
</style>
