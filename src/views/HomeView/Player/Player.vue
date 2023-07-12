<template>
  <div
    class="h-[13.4vw] bg-[#7f7f7f] dark:bg-[#f9fcfc] dark:text-[#403f47] w-[100%] text-[white] flex"
  >
    <!-- 播放 -->
    <div class="w-[91vw] m-auto flex items-center justify-between">
      <div class="flex items-center">
        <div
          class="w-[11vw] bg-[#1a1a1a] rounded-[50%] p-[1.78vw] flex items-center"
        >
          <img
            :src="player._currentTrack?.al?.picUrl"
            :style="spinStyle"
            class="w-[7.64vw] h-[7.64vw] rounded-[50%]"
          />
        </div>
        <!-- 作者-歌名 -->
        <div class="ml-[2.93vw] w-[60vw] truncate">
          <span class="w-[3.28vw]">{{ player._currentTrack?.name }}</span>
          <span
            v-if="Array.isArray(player._currentTrack?.ar)"
            class="w-[3.28vw] text-[#abaab0] dark:text-[#808081]"
          >
            - {{ player._currentTrack?.ar[0]?.name }}
          </span>
        </div>
      </div>
      <!-- 播放按钮  菜单 -->
      <div class="flex items-center">
        <div class="w-[5.6vw] h-[5.6vw] relative ml-[2.2vw]" @click="togglePlay">
        
          <van-circle v-model="currentRate" :rate="(player._progress * 100) / player._duration"  size="5.6vw" :stroke-width="120" color="#475165" layer-color="#C7CBD2"/> 
          <Icon :icon="!play ? 'carbon:pause-filled' : 'ph:play-fill'" width="11px" class="top-1/2 left-1/2 translate-x-[-50%]  translate-y-[-50%] absolute" />
        </div>
        <span @click="show = !show">
            <Icon
                icon="iconamoon:playlist-fill"
                class="text-[6vw] text-[#3b4152] ml-[4.5vw] dark:text-[#e3e6e8]"
            />
        </span>
        
      </div>
    </div>

    <!-- 底部弹出框 歌单列表 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '65%' }"
    >
      <div class="text-[#fff] dark:text-[#000] p-[4.8vw] relative">
        <div
          class="fixed top-[35%] z-[99] left-[3vw] w-[92%] py-[4vw] h-[24vw] bg-[#393939] dark:bg-[#fff] pl-[2vw]"
        >
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
              <Icon
                icon="circum:save-down-1"
                class="mr-[3.57vw] text-[5.5vw]"
              />
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

        <ul class="flex flex-col mt-[20vw]">
          <li
            v-for="item in menusongList"
            :key="item.key"
            @click="playAll(item)"
            class="flex h-[10vw] leading-[10vw] items-center justify-between"
          >
            <div class="flex w-[60vw] truncate">
              <img v-if="item.key ===  player._currentTrack.id" src="../../../static/wave.gif">
              <p :class="item.key ===  player._currentTrack.id ? 'text-[red]' : ''"  class="mr-[2vw]">{{ item.name }}</p>
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
  </div>
</template>

<script>
import store from 'storejs';
import Player from './player.js';
export default {
  data() {
    return {
      player: new Player(),
      currentRate: 0,
      // play: false,
      show: false,
      menusongList: [],
      cookieMusic:[],
      cookie:[]
    };
  },
  methods: {
    togglePlay() {
      this.play = !this.play;
      window.$player.playOrPause();
    },
    playAll(item){
      window.$player.replacePlaylist(
        this.songlistAll.map((song) => song.id),'',
        '',
        item.id
      )
    },
  },
  async created() {
    this.switchCheckStatus = store.get('switch');
    window.$player = this.player;
    const songlists = store.get('songs');
    this.menusongList = songlists;
  },
  computed: {
    spinStyle() {
      return this.isPlaying ? { animation: 'spin 5s linear infinite' } : {};
    },
  },
};
</script>

<style>
.van-popup--bottom {
  background-color: #393939 !important;
}
.dark .van-popup--bottom {
  background-color: #fff !important;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
