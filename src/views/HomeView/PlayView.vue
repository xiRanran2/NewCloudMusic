<template>
  <div class="w-screen h-screen">
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
                src="../../static/needle-ab.png"
                class="pr-[3vw] w-[36.5vw] h-[36.5vw] z-[99] absolute top-[-3px] right-[43px] "
              />
                <!-- <img
                :class="{ 'rotate': isPlaying }"
                src="../../static/needle-ab.png"
                class="pr-[3vw] w-[33.66vw] h-[41.5vw] mt-[3vw] z-[99] absolute top-[-21px] right-[41px] rotate-[341deg]"
              /> -->
              </transition>
            </div>
            <!-- 黑胶唱片 -->
            <div class="relative w-[82vw] h-[82vw] mt-[-28vw] ml-[3vw]">
              <img
                src="../../static/disc_light.png"
                class="w-[74.81vw] h-[67.81vw] absolute top-[3vw] left-[1vw]"
              />
              <img
                src="../../static/disc_black.png"
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
            <Icon icon="icon-park-outline:loop-once" class="text-[7vw]" @click.native="playPrev" />
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
            <Icon icon="entypo:controller-next" class="text-[8vw]"  @click.native="playNextTrack" />
            <Icon @click.native="show = !show" icon="fontisto:play-list" class="text-[5.5vw]" />
          </div>
        </div>
      </div>
    <!-- 背景蒙版 -->
    <div class="element fixed z-[1] top-0 left-0 right-0 bottom-0" :style="`background-image: url(${$player._currentTrack?.al?.picUrl})`"></div>
    <div class="fixed z-[2] bgColor top-0 left-0 right-0 bottom-0"></div>
  </div>
</template>

<script>
import store from 'storejs';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
Vue.component('VueSlider', VueSlider)
export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      menusongList: [],
      value: 0,
      marks: [50],
    };
  },
  async created() {
    this.switchCheckStatus = store.get('switch');
    const songlists = store.get('songs');
    this.menusongList = songlists; //所有的歌单列表
  },
};
</script>

<style>
header .van-notice-bar {
  height: 7.19vw;
  width: 40vw;
  background: none;
}
.van-notice-bar__wrap {
  font-size: 5vw;
  color: white;
}
.vue-slider{
    width: 80% !important;
    margin-left: 2vw;
    margin-right: 2vw;
}
.rotate-image {
    animation: rotate 5s infinite linear; /* 调整动画的持续时间和速度根据实际需要 */
}
.paused-animation {
    animation-play-state: paused;
}
/* 背景 */
.bgColor {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
