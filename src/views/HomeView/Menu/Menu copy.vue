<template>
  <!-- 底部弹出框 歌单列表 -->
  <van-popup
    v-model="show"
    position="bottom"
    :style="{ height: '65%', backgroundColor: '#393939' }"
  >
    <div class="text-[#fff] dark:text-[#000] p-[4.8vw] relative">
      <div class="fixed top-[35%] z-[99] left-[3vw] w-[92%] py-[4vw]  h-[24vw] bg-[#393939] dark:bg-[#fff] pl-[2vw]">
        <!-- 当前播放 -->
        <div class="flex items-end">
          <p>当前播放</p>
          <span class="text-[#757575] dark:text-[#9c9c9c] ml-[2vw] text-[3vw]"
            >({{ menusongList.length }})</span
          >
        </div>
        <!-- 列表循环 -->
        <div class="flex justify-between leading-[14.5vw]">
          <div class="flex items-center">
            <Icon
              icon="arcticons:loopboard"
              class="text-[#797979] dark:text-[#9c9c9c] text-[5vw] mr-[2vw]"
              :horizontalFlip="true"
            />
            <span>列表循环</span>
          </div>
          <div
            class="flex items-center text-[5vw] text-[#a2a2a2] dark:text-[#9c9c9c]"
          >
            <Icon icon="circum:save-down-1" class="mr-[3.57vw] text-[5.5vw]" />
            <Icon
              icon="fluent:collections-24-regular"
              :horizontalFlip="true"
              class="mr-[3.57vw]"
            />
            <Icon
              icon="uiw:delete"
              :horizontalFlip="true"
              class="text-[4.5vw]"
            />
          </div>
        </div>
      </div>

      <ul class="flex flex-col">
        <li
          v-for="item in menusongList"
          :key="item.key"
          class="flex h-[10vw] leading-[10vw] items-center justify-between"
        >
          <div class="flex w-[60vw] truncate">
            <p class="mr-[2vw]">{{ item.name }}</p>
            <div class="text-[#797979] dark:text-[#898989 ]">
              <span
                class="text-[#c1c1c1] text-[1vw]"
                v-for="items in item.ar"
                :key="items"
              >
                {{ items.name }}&nbsp;
              </span>
              <span class="text-[#c1c1c1] text-[1vw] w-[17vw] truncate"
                >-{{ item.al.name }}</span
              >
            </div>
          </div>
          <span class="text-[#a2a2a2] dark:text-[#9c9c9c]">
            <Icon icon="ei:close" :horizontalFlip="true" />
          </span>
        </li>
      </ul>
    </div>
  </van-popup>
</template>

<script>
import store from 'storejs';
export default {
  data() {
    return {
      show: false,
      menusongList: [],
    };
  },
  async created() {
    const songlists = store.get('songs');
    this.menusongList = songlists;
    // console.log(this.menusongList);
  },
};
</script>

<style></style>
