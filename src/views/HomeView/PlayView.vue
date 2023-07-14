<template>
  <div class="">
    <div class="z-[3] w-screen h-screen relative">
      <div class="w-[90.77vw] m-auto">
        <header class="flex items-center pt-[2vw] justify-between">
          <Icon icon="simple-line-icons:arrow-up" color="white" :rotate="2" class="text-[6.8vw]" @click.native="ExitFn" />
          <div class="flex flex-col pt-[3vw]">
            <van-notice-bar scrollable :text="$player._currentTrack?.name" class="text-[#fff] w-[58vw]" />
            <div class="flex items-center justify-center mt-[1.05vw]">
              <!-- <span class="text-[#9d9fa4] mr-[4vw]">{{
                $player._currentTrack?.ar[0].name
              }}</span> -->
              <p class="rounded-[2vw] px-[2.37vw] py-[0.85vw] text-[#fff] text-[1vw]"
                style="background: rgba(255, 255, 255, 0.2)">
                关注
              </p>
            </div>
          </div>
          <Icon icon="ri:share-circle-line" color="white" class="text-[6.8vw]" />
        </header>
        <!-- 歌词 lyric -->
        <ul v-if="!ifLyricShow" @click="ifLyricShow = !ifLyricShow"
          class="menu flex flex-col items-center w-[69.74vw] h-[102.5vw] m-auto overflow-auto ">
          <li v-for="(item, index) in lyrics" :key="index"
          :class="{'highlighted': index === currentIndex}"
            class="p-[4vw] text-[hsla(0,0%,88.2%,.8)] flex justify-center text-center h-[10vw] leading-[10vw]">
            {{ item.txt }}
            <!-- <p> 时间{{item.time}}</p>    -->
            <!-- <p class="parseLyrics(lrcs)">解析歌词</p> -->
          </li>
        </ul>

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
          <Icon class="w-[9.64vw] h-[5.73vw]"
            icon="streamline:interface-favorite-heart-reward-social-rating-media-heart-it-like-favorite-love" />
          <Icon class="w-[9.64vw] h-[5.73vw]" icon="circum:save-down-1" />
          <Icon class="w-[9.64vw] h-[5.73vw]" icon="iconamoon:music-album-bold" />
          <Icon class="w-[9.64vw] h-[5.73vw]" icon="uil:comment-lines" />
          <Icon class="w-[9.64vw] h-[5.73vw]" icon="uim:ellipsis-v" />
        </div>
        <!-- 滑块 -->
        <div class="h-[18.55vw] pt-[9vw] flex justify-center items-center">
          <div class="mr-[2vw] text-[#ffffff]">
            {{ convertSecondsToFormattedTime($player._progress) }}
          </div>
          <vue-slider v-model="$player.progress" :duration="0" :process="true" tooltip="none" :drag-on-click="true"
            :min="0" :max="$player._duration" :interval="0.1" class="flex-1 mx-[2.5vw]" />
          <div class="text-[white]">
            {{ convertSecondsToFormattedTime($player._duration) }}
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
import Lyric from 'lyric-parser';
import { fetchLyricRequest } from '@/request';
Vue.component('VueSlider', VueSlider);
export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      menusongList: [],
      value: 0,
      marks: [50],
      show: false,
      lyrics: [],
      ifLyricShow: true,
      currentTime: 0,
      currentIndex:-1,
      lyricsongs:[],
      lrcs:'',   //歌词 好大一串
      // ifBlackShow:true
    };
  },
  methods: {
    //解析歌词
    parseLyrics(lyricsData) {
      const lines = lyricsData.split('\n');
      const lyricsongs = [];

      lines.forEach(line => {
        const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2})\]/;
        const timeMatches = line.match(timeRegex);
        if (timeMatches) {
          const minutes = parseInt(timeMatches[1]);
          const seconds = parseInt(timeMatches[2]);
          const milliseconds = parseInt(timeMatches[3]);
          const time = minutes * 60 + seconds + milliseconds / 100;
          const content = line.replace(timeRegex, '').trim();
          lyricsongs.push({ time, content });
        }
      });

      this.lyricsongs = lyricsongs;
    },

    ExitFn() {
      this.$router.go(-1);
    },
    // 分秒格式
    convertSecondsToFormattedTime(seconds) {
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
      };
      return `${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`;
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
    //歌词
    fetchLyricRequest(this.$player._currentTrack.id).then((res) => {
      console.log(res);
      let fetchLyricRequest = new Lyric(res.data.lrc.lyric);
      this.lyrics = fetchLyricRequest.lines;
      this.lrcs = fetchLyricRequest.lrc
      console.log( this.lrcs);
    });
  },
  mounted() {
    console.log(lrcs)
    this.parseLyrics(lrcs); // 调用解析歌词方法
    // setInterval(() => {
    //   // this.currentTime = this.$refs.audio.currentTime;
    //   // this.currentTime = this.$player._duration//总时长
    //   this.currentTime = this.$player.process  //当前进度
    // }, 100);
    // 模拟播放器获取当前时间的定时器
    setInterval(() => {
      const currentTime = 5; // 假设当前播放时间为 5 秒
      for (let i = 0; i < this.lyrics.length; i++) {
        if (currentTime >= this.lyrics[i].time && currentTime < this.lyrics[i + 1].time) {
          this.currentIndex = i;
          break;
        }
      }
    }, 1000);
  },
};
</script>

<style>
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
