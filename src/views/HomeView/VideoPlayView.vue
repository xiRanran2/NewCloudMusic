<template>
  <div>
    <div class="bg-[#000] text-[white] w-screen h-screen" @click="togglePlayPause">
      <!-- 头部 -->
      <header class="w-[100%] px-[5.6vw] flex justify-between py-[5vw]">
        <Icon
          @click.native="exitFn"
          icon="iconamoon:arrow-up-2-light"
          :rotate="3"
          class="text-[8vw]"
        />
        <div class="flex items-center">
          <Icon
            class="text-[6vw] mr-[4.52vw]"
            icon="fluent:picture-in-picture-enter-24-regular" :horizontalFlip="true"
          />
          <Icon class="text-[6vw]" icon="ri:more-2-fill" />
        </div>
      </header>
      <!-- 视频 -->
      <div class="w-[100%] h-[55.85vw] mt-[11.86vw] flex items-center">
        <video :src="videoUrl" loop autoplay class="h-[55.85vw]" ref="videoPlayer"></video>
        <Icon
        icon="solar:play-bold"
        v-show="playbackStatus"
        class="absolute top-[33%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[14vw] text-[rgba(255,255,255,0.4)]"
      />
      </div>
      <!-- 下面一个大盒子 -->
      <div class="w-[100%] relative flex justify-between px-[5vw]">
        <!-- 左边作者信息 -->
        <div class="w-[82.82vw] mt-[41.56vw]">
          <!-- 作者头像第一行 -->
          <div class="flex w-[82.82vw] truncate items-center">
            <img v-for="(item1,index1) in  MvDetail.artists" :key="index1" :src="item1.img1v1Url" :class="{ml:index1===0?'':'lef'}"
            class="w-[8.8vw] h-[8.8vw] rounded-[50%] border-[0.5vw] border-[white] z-[3]">
           <p class="w-[49vw] truncate ml-[2vw]"> <i v-for="(item2,index2) in  MvDetail.artists" :key="index2" class="">{{index2>0?'/':''}}{{item2.name}}</i></p>
            <span
            class="w-[7.78vw] h-[5.13vw] ml-[2vw] rounded-[4vw] flex items-center justify-center bg-[#ea4d44]"
          >
            <Icon icon="material-symbols:add" class="text-[5.22vw]" />
          </span>
          </div>
          <!-- MV 题目第二行 -->
          <div class="flex mt-[2.81vw] flex-col text-[3vw]">
            <van-collapse v-model="activeNames" :accordion="true">
              <van-collapse-item name="1">
                 <template #title>
                  <div>
                    <span
                      class="text-[#acacac] flex items-center justify-center text-[2.22vw] mr-[1.88vw] w-[7.41vw] h-[5.19vw] py-[1.03vw] px-[1.28vw] rounded-[2vw] bg-[#333]"
                      >MV</span
                    >
                  {{ MvDetail?.name }}
                  <!-- <Icon icon="bxs:up-arrow" :rotate="2" class="text-[3.48vw] inline mr-[2vw]"/> -->
                  </div>
          </template>
            {{MvDetail?.desc}}
              </van-collapse-item>
            </van-collapse>
            
            <!-- <p class="">{{ MvDetail?.name }}<Icon @click.native="DecsShow" icon="bxs:up-arrow" :rotate="2" class="text-[3.48vw] inline mr-[2vw]"/></p> -->
            <!-- <p class="text-[3vw] absolute top-[10vw] w-[56vw] left-[7vw] overflow-auto h-[76vw] menu"></p> -->
          </div>
          <!-- MV第三行 -->
          <div class="flex justify-between px-[1vw] mt-[2vw]">
            <!-- 左边 -->
            <div class="flex text-[1vw] items-center" v-show="!touchTheProgressBar">
              <Icon icon="basil:music-solid" :rotate="2" class="text-[5vw]"/>
              <van-notice-bar scrollable class="w-[34vw]"
              :speed="20" background="none">
                {{ MvDetail?.name }}-<template v-for="(item,index) in  MvDetail.artists">
                  {{index>0?'/':''}}{{item.name}}
                </template>
              </van-notice-bar>
              <Icon icon="ph:heart" class="text-[#b3b3b3] text-[5vw] ml-[2vw]"/>
              <!-- <div v-for="{ item, index } in MvDetail.artists" :key="item.id"> -->
              <!-- <van-notice-bar v-if="index === 0 ? item.name" scrollable :text="MvDetail.name-" /> -->
            </div>
            <!-- 右边 -->
            <div class=" absolute right-[3vw] bottom-[-2vw]">
              <img src="/static/disc_black.png" class="w-[10.78vw] h-[10.78vw] rounded-[50%]">
              <img class="absolute right-[1.54vw] top-[1.54vw] w-[7.26vw] h-[7.26vw] rounded-[50%] rotate-image"  :class="{ 'paused-animation': this?.playbackStatus }"  :src="MvDetail?.cover" >
            </div>
          </div>
        </div>
        <!-- 右边图标 -->
        <ul class="flex flex-col">
          <!-- 点赞 -->
          <li class="flex flex-col items-center mb-[1vw]">
            <Icon
              icon="solar:like-bold-duotone"
              class="w-[7.86vw] h-[7.52vw] mb-[1vw]"
            />
            <span>{{ wan(loveCount?.likedCount) }}</span>
          </li>
          <!-- 评论 -->
          <li class="flex flex-col items-center mb-[1vw]">
            <Icon
              icon="majesticons:comment-text"
              class="w-[7.86vw] h-[7.52vw] mb-[1vw]"
            />
            <span>{{ wan(loveCount?.commentCount) }}</span>
          </li>
          <!-- 分享 -->
          <li class="flex flex-col items-center mb-[1vw]">
            <Icon
              icon="mdi:share"
              class="w-[7.86vw] h-[7.52vw] mb-[1vw]"
            />
            <span>{{ wan(loveCount?.shareCount) }}</span>
          </li>
          <!-- 收藏 -->
          <li class="flex flex-col items-center mb-[1vw]">
            <Icon
              icon="fluent:collections-20-filled"
              class="w-[7.86vw] h-[7.52vw] mb-[1vw]"
            />
            <span class="w-[9vw] inline-block">收藏</span>
          </li>
        </ul>
        
      </div>
      <!-- 当前播放时间、总时间 -->
      <div
        class="text-[5vw] flex items-center justify-center h-[5vw]"
        v-show="touchTheProgressBar"
      >
        <span class="text-[#ffffff]">{{ currentPlaybackDuration }}</span>
        <span class="text-[#666666]">/{{ currentTotalPlaybackDuration }}</span>
      </div>

      <!-- 进度条开始 -->
      <vue-slider
        v-model="progress"
        :process="false"
        tooltip="none"
        :drag-on-click="true"
        :min="0"
        :max="100"
        :interval="0.1"
        :duration="0"
        class="videoProgressBar"
        @dragging="handleProgressChange"
        @drag-end="touchTheProgressBar = false"
      ></vue-slider>

      <!-- 发表评论 开始 -->
      <div
        class="w-[100%] bg-[#000] flex items-center justify-between text-[#4d4d4d] px-[4vw] py-[1vw] text-[4vw]"
      >
        发条评论结识有趣的人
        <Icon icon="bx:expand-alt" :rotate="3" class="text-[4vw]" />
      </div>

      
    </div>
  </div>
</template>

<script>
import { featMvUrl, featMvDetail, featMvDetailInfo } from '@/request';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
export default {
  data() {
    return {
      activeNames: [1],
      videoUrl: '', //视频地址
      MvDetail: [], //视频的具体信息，artists作者数组 name名称 这里面有视频的信息 小箭头点了显示的 透明的desc
      loveCount: [], //点赞、评论、分享数量
      playbackStatus:false,  //播放状态
      player: null, // 播放器实例
      progress: 0, // 进度
      plyrOptions: {
        // 播放器实例规则
        controls: [],
      },
      currentPlaybackDuration: '00:00', // 当前播放时长
      currentTotalPlaybackDuration: '00:00', // 当前播放总时长
      touchTheProgressBar: false, // 触摸进度条
    };
  },
  mounted() {
    this.initPlayer();
  },
  beforeDestroy() {},
  methods: {
    // 将时间格式化为分钟和秒钟的形式（例如：01:30）
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    },
    // 初始化视频
    initPlayer() {
      this.player = new Plyr(this.$refs.videoPlayer, this.plyrOptions);

      // 监听 Plyr 播放器的时间更新事件
      this.player.on('timeupdate', this.handleTimeUpdate);
    },
    // 计算进度 获取 当前播放时间于总时长
    handleTimeUpdate(event) {
      // 根据 Plyr 播放器的当前时间更新进度条
      this.progress =
        (event.detail.plyr.currentTime / event.detail.plyr.duration) * 100;

      this.currentPlaybackDuration = this.formatTime(
        event.detail.plyr.currentTime
      ); //当前播放时长
      this.currentTotalPlaybackDuration = this.formatTime(
        event.detail.plyr.duration
      ); //当前播放总时长
    },
    // 点击 拖到进度条视频跳转到对应进度
    handleProgressChange() {
      // 根据进度条的值计算视频的播放时间
      const currentTime = (this.progress / 100) * this.player.duration;

      // 更新 Plyr 播放器的当前时间
      this.player.currentTime = currentTime;

      // 切换为播放状态
      this.player.play();
      this.playbackStatus = false;

      // 显示时间
      this.touchTheProgressBar = true;
      this.currentPlaybackDuration = this.formatTime(currentTime);
    },
    // 切换播放状态
    togglePlayPause() {
      if (this.player.playing) {
        this.player.pause();
        this.playbackStatus = true;
      } else {
        this.player.play();
        this.playbackStatus = false;
      }
    },
    // 将时间格式化为分钟和秒钟的形式（例如：01:30）
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    },
    exitFn() {
      this.$router.go(-1);
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
  async created() {
    const res1 = await featMvUrl(this.$route.params.id);
    this.videoUrl = res1.data.data.url;
    const res2 = await featMvDetail(this.$route.params.id);
    this.MvDetail = res2.data.data;
    // console.log(this.MvDetail.artists);
    console.log('视频信息', this.MvDetail);
    const res3 = await featMvDetailInfo(this.$route.params.id);
    this.loveCount = res3.data;
    console.log(' mv 点赞转发评论数数据', this.loveCount);
  },
};
</script>

<style>
.van-cell,
.van-collapse-item__content{
  color:white !important;
  border:none !important;
  background: none !important;
}
.rotate-image {
  animation: rotate 5s infinite linear;
  /* 调整动画的持续时间和速度根据实际需要 */
}
.van-notice-bar__content{
  font-size: 1vw !important;
}
.paused-animation {
  animation-play-state: paused;
}
i{font-style: normal;}
.ml{margin-left: -3vw;z-index: 0;}
.videoProgressBar{
  background-color: #000;
}
.videoProgressBar .vue-slider-process {
  background: #dfdfdf;
  border-radius: 0;
}
.videoProgressBar .vue-slider-rail {
  background: #5f5f5f;
  border-radius: 0;
}

.videoProgressBar .vue-slider-process {
  background: #dfdfdf;
  border-radius: 0;
}

.videoProgressBar .vue-slider-dot,
.videoProgressBar .vue-slider-dot-handle {
  width: 2vw;
  height: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
