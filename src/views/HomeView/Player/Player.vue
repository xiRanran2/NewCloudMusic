<template>
  <div
    class="h-[13.4vw] bg-[#7f7f7f] dark:bg-[#f9fcfc] dark:text-[#403f47] w-[100%] text-[white] flex"
  >
    <!-- 播放 -->
    <div class="w-[91vw] m-auto flex items-center justify-between">
      <!-- 添加点击跳转播放页的点击事件 -->
      <div class="flex items-center" @click="playViewShow">
        <div
          class="w-[11vw] bg-[#1a1a1a] rounded-[50%] p-[1.78vw] flex items-center"
        >
          <img
            :class="{ 'paused-animation': !this?.$player?._playing }"
            :src="$player._currentTrack?.al?.picUrl"
            class="w-[7.64vw] h-[7.64vw] rounded-[50%] rotate-image"
          />
        </div>
        <!-- 作者-歌名 -->
        <div class="ml-[2.93vw] w-[60vw] truncate">
          <span class="w-[3.28vw]">{{ $player._currentTrack?.name }}</span>
          <span
            v-if="Array.isArray($player._currentTrack?.ar)"
            class="w-[3.28vw] text-[#abaab0] dark:text-[#808081]"
          >
            - {{ $player._currentTrack?.ar[0]?.name }}
          </span>
        </div>
      </div>
      <!-- 播放按钮  菜单 -->
      <div class="flex items-center">
        <div
          class="w-[5.6vw] h-[5.6vw] relative ml-[2.2vw]"
          @click="togglePlay"
        >
          <van-circle
            v-model="currentRate"
            :rate="($player._progress * 100) / $player._duration"
            size="5.6vw"
            :stroke-width="120"
            color="#fff"
            layer-color="#C7CBD2"
          />
          <Icon
            :icon="!$player._playing ? 'ph:play-fill' : 'carbon:pause-filled'"
            width="11px"
            class="top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute"
          />
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
    <van-popup v-model="show" position="bottom" :style="{ height: '65%' }">
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
            v-bind:key = "item.id"
            @click="playSingle(item.id)"
            class="flex h-[10vw] leading-[10vw] items-center justify-between"
          >
            <div class="flex relative w-[60vw] truncate">
              <img
                class="w-[3vw] h-[5vw] absolute top-[1vw] left-0 red-image"
                v-if="item.id === $player._currentTrack.id"
                src="../../../static/wave.gif"
              />
              <p
                :class="
                  item.id === $player._currentTrack.id ? 'text-[red] ml-[5vw]' : ''
                "
                class="mr-[2vw]"
              >
                {{ item.name }}
              </p>
              <div class="text-[#797979] dark:text-[#898989 ]">
                <span 
                :class="
                item.id === $player._currentTrack.id ? 'text-[red]' : ''
              "
                  class="text-[#c1c1c1] text-[1vw]"
                  v-for="items in item.ar"
                  :key="items"
                >
                  {{ items.name }}&nbsp;
                </span>
                <span :class="
                item.id === $player._currentTrack.id ? 'text-[red]' : ''
              " class="text-[#c1c1c1] text-[1vw] w-[17vw] truncate"
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

    <!-- 播放器页面 -->
    <van-popup class=" " v-model="playView" position="bottom">
      <div
        class="w-screen h-screen bg-gradient-to-b from-[#132435] to-[#1b3a51]"
      >
        <div class="w-[90.77vw] m-auto">
          <header class="flex items-center pt-[2vw] justify-between">
            <Icon
              icon="simple-line-icons:arrow-up"
              color="white"
              :rotate="2"
              class="text-[6.8vw]"
              @click.native="playViewClose"
            />
            <div class="flex flex-col pt-[3vw]">
              <van-notice-bar
                scrollable
                :text="$player._currentTrack?.name"
                class="text-[#fff] w-[58vw]"
              />
              <div class="flex items-center justify-center mt-[1.05vw]">
                <span class="text-[#9d9fa4] mr-[4vw]">{{
                  this.menusongList[0].al.name
                }}</span>
                <p
                  class="bg-[#3f4651] rounded-[2vw] px-[2.37vw] py-[0.85vw] text-[#fff] text-[1vw]"
                >
                  关注
                </p>
              </div>
            </div>
            <Icon
              icon="ri:share-circle-line"
              color="white"
              class="text-[6.8vw]"
            />
          </header>
          <!-- 歌词 lyric -->
          <div>
            <!-- 中间单独一张图片 -->
            <div class="flex justify-end h-[54.5vw] relative">
              <transition name="rotate-transition">
                <img
                :class="{ 'rotate': isPlaying }"
                src="../../../static/needle-ab.png"
                class="pr-[3vw] w-[33.66vw] h-[41.5vw] mt-[3vw] z-[99] absolute top-[-21px] right-[41px] rotate-[341deg]"
              />
              </transition>
            </div>
            <!-- 黑胶唱片 -->
            <div class="relative w-[82vw] h-[82vw] mt-[-28vw] ml-[3vw]">
              <img
                src="../../../static/disc_light.png"
                class="w-[74.81vw] h-[67.81vw] absolute top-[3vw] left-[1vw]"
              />
              <img
                src="../../../static/disc_black.png"
                class="w-[76.64vw] h-[76.64vw]"
              />
              <img
                :class="{ 'paused-animation': !this?.$player?._playing }"
                :src="$player._currentTrack?.al?.picUrl"
                class="w-[48vw] h-[47vw] rounded-[50%] absolute top-[15vw] left-[14vw] rotate-image"
              />
            </div>
          </div>
          <!-- 收藏  下载 唱 评论 更多 -->
          <div class="flex justify-around text-[white] mt-[2.79vw]">
            <Icon
              class="w-[9.64vw] h-[5.73vw]"
              icon="streamline:interface-favorite-heart-reward-social-rating-media-heart-it-like-favorite-love"
            />
            <Icon class="w-[9.64vw] h-[5.73vw]" icon="circum:save-down-1" />
            <Icon
              class="w-[9.64vw] h-[5.73vw]"
              icon="iconamoon:music-album-bold"
            />
            <Icon class="w-[9.64vw] h-[5.73vw]" icon="uil:comment-lines" />
            <Icon class="w-[9.64vw] h-[5.73vw]" icon="uim:ellipsis-v" />
          </div>
          <!-- 滑块 -->
          <div class="flex items-center mt-[6vw]">
            <span class="mr-[2vw] text-[#586c71]">00:00</span>
            <vue-slider v-model="value"></vue-slider>
            <span class="text-[#586c71]">{{ songLength }}</span>
          </div>
          <!-- 随机 上一首 播放 下一首 菜单 -->
          <div
            class="flex items-center justify-around text-[white] mt-[4.75vw]"
          >
            <Icon icon="icon-park-outline:loop-once" class="text-[7vw]" />
            <Icon icon="ph:skip-back-fill" class="text-[7vw]" />
            <span
              @click="togglePlay"
              class="w-[14.36vw] h-[14.36vw] rounded-[50%] flex items-center justify-center border-white border-[1px] border-[solid] text-[white]"
            >
              <Icon
                :icon="!$player._playing ? 'ph:play-fill' : 'ic:outline-pause'"
                class="text-[7vw]"
              />
              <!-- <Icon icon="ph:play-fill" class="text-[7vw]" /> -->
              <!-- <Icon icon="ic:outline-pause" /> -->
            </span>
            <Icon icon="entypo:controller-next" class="text-[8vw]" />
            <Icon @click.native="show = !show" icon="fontisto:play-list" class="text-[5.5vw]" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import store from 'storejs';
import {playlistTracks,fetchLyricRequest} from '@/request'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
Vue.component('VueSlider', VueSlider)
export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      value: 0,
      currentRate: 0,
      // play: false,
      show: false,
      menusongList: [],
      cookieMusic: [],
      cookie: [],
      playView: false,
      songLength: 0, // 初始化歌曲长度为0
      AllSongs:[],
      SongLyric:'',  //单曲歌词
    };
  },
  mounted() {
    this.getSongLength(); // 在组件挂载后获取歌曲长度
  },
  methods: {
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
    playSingle(id){
      this.$player.replacePlaylist(
        this.menusongList.map((song) => song.id),'',
        '',
        id
      )
    },
    async getSongLength() {
      const songlists = await playlistTracks(this.$route.query.id).then((res) => {
          // console.log(res)
          this.AllSongs = res.data.songs
          // console.log(this.AllSongs);
        })
        .catch((err) => {
          console.log(err);
        });
        // console.log(songlists)
      const player = this.$player; // 获取播放器对象
      console.log(player);
      this.songLength = player.getDuration(); // 使用 $player 中的方法获取歌曲长度
      
    }
  },
  async created() {
    this.switchCheckStatus = store.get('switch');
    const songlists = store.get('songs');
    this.menusongList = songlists;

    await fetchLyricRequest(this.$route.query.id).then((res) => {
      console.log(res)
    })
  },
};
</script>

<style>
.red-image {
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
}
.van-popup--bottom {
  background-color: #393939 !important;
}
.dark .van-popup--bottom {
  background-color: #fff !important;
}
.rotate-image {
  animation: rotate 10s infinite linear; /* 调整动画的持续时间和速度根据实际需要 */
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.paused-animation {
  animation-play-state: paused;
}
.rotate-transition {
  transition: transform 0.5s ease; /* 过渡效果的时间和缓动函数 */
}

.rotate {
  transform-origin: top left; /* 设置旋转的原点为左上角 */
  transition: transform 0.5s ease; /* 过渡效果的时间和缓动函数 */
  transform: rotate(45deg); /* 图片旋转45度 */
}
</style>
