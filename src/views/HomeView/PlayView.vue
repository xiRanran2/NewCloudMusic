<template>
  <div>
    <div class="z-[3] w-screen h-screen relative">
      <div class="w-[90.77vw] m-auto">
        <header class="flex items-center pt-[2vw] justify-between z-[999]">
          <Icon icon="simple-line-icons:arrow-up" color="white" :rotate="2" class="text-[6.8vw]" @click.native="ExitFn" />
          <div class="flex flex-col pt-[3vw]">
            <van-notice-bar scrollable :text="$player._currentTrack?.name" class="text-[#fff] w-[58vw]" />
            <div class="flex items-center justify-center mt-[1.05vw]">
              <span class="text-[#9d9fa4] mr-[4vw]">{{
                $player._currentTrack?.ar[0].name
              }}</span>
              <p class="rounded-[2vw] px-[2.37vw] py-[0.85vw] text-[#fff] text-[1vw]"
                style="background: rgba(255, 255, 255, 0.2)">
                关注
              </p>
            </div>
          </div>
          <Icon icon="ri:share-circle-line" color="white" class="text-[6.8vw]" />
        </header>
        <!-- 歌词 lyric -->
        <!-- <div v-if="!ifLyricShow" @click="ifLyricShow = !ifLyricShow"
          class="menu flex flex-col items-center w-[69.74vw] h-[102.5vw] m-auto overflow-auto ">
          <div class="menu absolute top-0 transition-all duration-1000  w-[69.74vw] h-[102.5vw] m-auto overflow-auto "
          :style="{ top: -$player.lineHieght + 'vw' }"
          v-if="lyricsLoadingStatus">
            <div v-for="(item, index) in $player.lyricLines" :key="index"
            :style="{
              color:
                index === $player.lineIndex ? '#fff' : 'hsla(0,0%,88.2%,.7)',
            }"
            class="p-[4vw] text-[hsla(0,0%,88.2%,.8)] flex justify-center text-center h-[10vw] leading-[10vw]">
            {{ item.txt }}
          </div>
          </div>
        </div> -->
        <div class="flex justify-center">
          <div
          class="w-[69.74vw] h-[102.5vw] flex items-center flex-wrap px-[6vw] justify-center overflow-hidden relative internalShadow"
          v-if="!ifLyricShow"
          @click="ifLyricShow = !ifLyricShow"
        >
          <div
            class="absolute top-0 transition-all duration-1000"
            :style="$player._playing ? { top: -$player.lineHieght + 'vw' } : { top: -$player.lineHieght + 'vw' }"
            v-if="lyricsLoadingStatus"
          >
            <div
              v-for="(line, index) in $player.lyricLines"
              :key="index"
              class="py-[2vw] text-[hsla(0,0%,88.2%,.8)] line-clamp-2 w-[100%] flex justify-center text-center"
              :style="{
                color:
                  index === $player.lineIndex ? '#fff' : 'hsla(0,0%,88.2%,.7)',
              }"
            >
              {{ line.txt }}
            </div>
          </div>
       </div>
       </div>

        <!-- 点击隐藏 -->
        <div class="h-[102.5vw]" v-if="ifLyricShow" @click="ifLyricShow = !ifLyricShow">
          <!-- 中间单独一张图片 -->
          <div class="flex justify-end h-[54.5vw] relative">
            <transition name="rotate-transition">
              <img :class="$player._playing ? 'rotateCD' : ''"
                class="w-[21.54vw] cd h-[35.47vw] absolute left-[40vw] z-[10]" src="/static/needle-ab.png" alt="" />
            </transition>
          </div>
          <!-- 黑胶唱片 -->
          <div class="relative w-[82vw] h-[82vw] mt-[-38vw] ml-[3vw]">
            <img src="/static/disc_light.png" class="w-[74.81vw] h-[67.81vw] absolute top-[3vw] left-[1vw]" />
            <img src="/static/disc_black.png" class="w-[76.64vw] h-[76.64vw]" />
            <img :class="{ 'paused-animation': !this?.$player?._playing }" :src="$player._currentTrack?.al?.picUrl"
              class="w-[48vw] h-[47vw] rounded-[50%] absolute top-[15vw] left-[14vw] rotate-image" />
          </div>
        </div>
        <!-- 收藏  下载 唱 评论 更多 -->
        <div class="flex justify-around text-[white] mt-[2.79vw]">
          <div @click="love  = !love">
           <Icon icon="ant-design:heart-filled" v-if="love" class="text-[#FE3C3A] w-[9.64vw] h-[5.73vw]"/>
           <Icon v-else icon="ant-design:heart-outlined" class="w-[9.64vw] h-[5.73vw]"/>
         </div>
          <Icon class="w-[9.64vw] h-[5.73vw]" icon="circum:save-down-1" />
          <Icon class="w-[9.64vw] h-[5.73vw]" icon="iconamoon:music-album-bold" />
          <van-icon class="w-[9.64vw] h-[5.73vw]" name="chat-o" badge="999+" />
          <Icon class="w-[9.64vw] h-[5.73vw]" icon="uim:ellipsis-v" />
        </div>
        <!-- 滑块 -->
        <div class="h-[18.55vw] pt-[9vw] flex justify-center items-center">
          <div class="mr-[2vw] text-[#ffffff]">
            {{ timeModification($player._progress) }}
          </div>
          <vue-slider v-model="$player.progress" :duration="0" :process="true" tooltip="none" :drag-on-click="true"
            :min="0" :max="$player._duration" :interval="0.1" class="flex-1 mx-[2.5vw]" />
          <div class="text-[white]">
            {{ timeModification($player._duration) }}
          </div>
        </div>
        <!-- 随机 上一首 播放 下一首 菜单 -->
        <div class="flex items-center justify-around text-[white] mt-[4.75vw]">
          <Icon icon="icon-park-outline:loop-once" class="text-[7vw]" />
          <Icon icon="ph:skip-back-fill" class="text-[7vw]" @click.native="PrevTrackCallback" />
          <span @click="togglePlay"
            class="w-[14.36vw] h-[14.36vw] rounded-[50%] flex items-center justify-center border-white border-[1px] border-[solid] text-[white]">
            <Icon :icon="!$player._playing ? 'ph:play-fill' : 'ic:outline-pause'" class="text-[7vw]" />
            <!-- <Icon icon="ph:play-fill" class="text-[7vw]" /> -->
            <!-- <Icon icon="ic:outline-pause" /> -->
          </span>
          <Icon icon="entypo:controller-next" class="text-[8vw]" @click.native="playNextTrack" />
          <Icon @click.native="show = !show" icon="fontisto:play-list" class="text-[5.5vw]" />
        </div>
      </div>
      <!-- 菜单 -->
      <!-- 底部弹出框 歌单列表 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '65%' }">
        <div class="text-[#fff] dark:text-[#000] p-[4.8vw] relative">
          <div class="fixed top-[35%] z-[99] left-[3vw] w-[92%] py-[4vw] h-[24vw] bg-[#393939] dark:bg-[#fff] pl-[2vw]">
            <!-- 当前播放 -->
            <div class="flex items-end">
              <p>当前播放</p>
              <span class="text-[#757575] dark:text-[#9c9c9c] ml-[2vw] text-[3vw]">({{ menusongList.length }})</span>
            </div>
            <!-- 列表循环 -->
            <div class="flex justify-between leading-[14.5vw]">
              <div class="flex items-center">
                <Icon icon="arcticons:loopboard" class="text-[#797979] dark:text-[#9c9c9c] text-[5vw] mr-[2vw]"
                  :horizontalFlip="true" />
                <span>列表循环</span>
              </div>
              <div class="flex items-center text-[5vw] text-[#a2a2a2] dark:text-[#9c9c9c]">
                <Icon icon="circum:save-down-1" class="mr-[3.57vw] text-[5.5vw]" />
                <Icon icon="fluent:collections-24-regular" :horizontalFlip="true" class="mr-[3.57vw]" />
                <Icon icon="uiw:delete" :horizontalFlip="true" class="text-[4.5vw]" />
              </div>
            </div>
          </div>

          <ul class="flex flex-col mt-[20vw]">
            <li v-for="item in menusongList" :key="item.id" @click="playSingle(item.id)"
              class="flex h-[10vw] leading-[10vw] items-center justify-between">
              <div class="flex relative w-[60vw] truncate">
                <img class="w-[3vw] h-[5vw] absolute top-[1vw] left-0 red-image"
                  v-if="item.id === $player._currentTrack.id" src="/static/wave.gif" />
                <p :class="item.id === $player._currentTrack.id
                    ? 'text-[red] ml-[5vw]'
                    : ''
                  " class="mr-[2vw]">
                  {{ item.name }}
                </p>
                <div class="text-[#797979] dark:text-[#898989 ]">
                  <span :class="item.id === $player._currentTrack.id ? 'text-[red]' : ''
                    " class="text-[#c1c1c1] text-[1vw]" v-for="items in item.ar" :key="items.id">
                    {{ items.name }}&nbsp;
                  </span>
                  <span :class="item.id === $player._currentTrack.id ? 'text-[red]' : ''
                    " class="text-[#c1c1c1] text-[1vw] w-[17vw] truncate">-{{ item.al.name }}</span>
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
    <!-- 背景蒙版 -->
    <div class="element fixed z-[1] top-0 left-0 right-0 bottom-0"
      :style="`background-image: url(${$player._currentTrack?.al?.picUrl})`"></div>
    <div class="fixed z-[2] bgColor top-0 left-0 right-0 bottom-0"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import store from 'storejs';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
// import Lyric from 'lyric-parser';
// import { fetchLyricRequest } from '@/request';
Vue.component('VueSlider', VueSlider);
export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      love: false,
      menusongList: [],
      show: false,
      lyrics: [],
      ifLyricShow: true,
      currentTime: 0,
      currentIndex:-1,
      lyricsongs:[],
      lrcs:'',   //歌词 好大一串
      lyricsLoadingStatus:true,
    };
  },
  methods: {
    ExitFn() {
      this.$router.go(-1);
    },
    // 分秒格式
    timeModification(time) {
      const minutes = Math.floor(time / 60);
      return `${String(minutes).padStart(2, '0')}:${String(
          Math.floor(time % 60)
      ).padStart(2, '0')}`;
    },
    togglePlay() {
      this.play = !this.play;
      this.$player.playOrPause();
    },
    playViewShow() {
      this.playView = true;
    },
    playViewClose() {
      this.playView = false;
    },
    playSingle(id) {
      this.$player.replacePlaylist(
        this.menusongList.map((song) => song.id),
        '',
        '',
        id
      );
    },
    PrevTrackCallback() {
      if (this.$player.list.indexOf(this.$player._currentTrack.id) == 0) {
        this.playSingle(this.$player.list[this.$player.list.length - 1]);
      } else {
        this.playSingle(
          this.$player.list[
          this.$player.list.indexOf(this.$player._currentTrack.id) - 1
          ]
        );
      }
    },
    //播放下一首
    playNextTrack() {
      this.$player.playNextTrack();
    },
  },
  created() {
    this.switchCheckStatus = store.get('switch');
    const songlists = store.get('songs');
    this.menusongList = songlists; //所有的歌单列表
  },
};
</script>

<style scoped>
.vue-slider-process{
  background-color: #d9d9d9;
}
header .van-notice-bar {
  height: 7.19vw;
  width: 63vw;
  background: none;
}

.van-notice-bar__wrap {
  font-size: 5vw;
  color: white;
}

.vue-slider {
  width: 80% !important;
  margin-left: 2vw;
  margin-right: 2vw;
}

.rotate-image {
  animation: rotate 5s infinite linear;
  /* 调整动画的持续时间和速度根据实际需要 */
}

.paused-animation {
  animation-play-state: paused;
}

/* 背景 */
.bgColor {
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(30px);
  /* 模糊半径，可以调整模糊程度 */
}

.cd {
  transition: transform 0.5s ease-in-out;
  transform-origin: 15% 8%;
  transform: rotate(-30deg);
}

.rotateCD {
  transform: rotate(10deg);
}
.menu::-webkit-scrollbar {
  height: 0rem;
  width: 1.25rem;
}
.highlighted {
  color: red; 
}
</style>
