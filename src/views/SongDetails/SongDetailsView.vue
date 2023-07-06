<template>
  <div :class="{ dark: switchCheckStatus }" class="bg-[#444] text-[white] dark:bg-[#f1f1f1] dark:text-[#1a1c23]">
    <header
      class="w-[100%] bg-[#444]  dark:bg-[#966951] dark:text-[black] h-[15vw] z-[3] flex justify-between items-center text-[6vw] fixed top-0 px-[4vw]"
    >
      <span @click="HomeView">
        <Icon
          icon="material-symbols:navigate-before"
          class="text-[8vw]"
        />
      </span>
      <van-notice-bar :text="songlist.name" class="text-[#fff] w-[58vw] bg-[#444]  dark:bg-[#966951]" />
      <div class="flex">
        <Icon icon="carbon:search" class="mr-[4vw]" />
        <Icon icon="uil:ellipsis-v"  />
      </div>
    </header>
    <div class="mt-[15vw] dark:bg-[#966951] dark:text-[#fff]">
      <div>
        <!--点击前的 歌曲类型 -->
        <div v-if="terent">
          <div class="flex ml-[5vw]">
            <!-- 照片 -->
            <div class="relative w-[28vw] h-[28vw]">
              <div
                  class="text-white dark:text-black flex items-center absolute top-[1vw] right-[1vw] z-[2]"
              >
                  <Icon icon="ion:play" color="white" class="text-[3vw]" />
                  <span>{{
                  songlist.playCount > 10000
                      ? Math.floor(songlist.playCount / 10000) + '万'
                      : songlist.playCount
                  }}</span>
              </div>
              <div class="relative">
                  <div
                  class="w-[24vw] h-[4vw] bg-[#5c5c5c] dark:bg-[#a2755d] rounded-[4vw] absolute top-0 left-[2vw]"
                  ></div>
                  <img
                  :src="songlist.coverImgUrl"
                  class="w-[28vw] rounded-[4vw] absolute top-[1vw] left-[0vw] z-[2]"
                  />
              </div>
            </div>
            <!-- 用户信息 -->
            <div class="flex flex-col m-[3vw] ">
              <!-- 标题 -->
              <div class="flex w-[57vw] justify-between">
                  <p class="font-extrabold">{{ songlist.name }}</p>
                  <span @click="lb"
                  class="w-[5vw] h-[4vw] bg-[#626262] dark:bg-[#e7cebf]  rounded-[50%] flex items-center mt-[1vw] "
                  >
                    <Icon icon="ep:arrow-up" :rotate="2" />
                  </span>
              </div>
              <!-- 用户头像 网名 -->
              <div class="flex items-center mt-[2vw] ">
                  <img
                  :src="songlist.creator.backgroundUrl"
                  class="rounded-[50%] w-[9vw]"
                  />
                  <p class="ml-[1.5vw] text-[2.5vw]">{{ songlist.creator.nickname }}</p>
                  
                  <div class="w-[14vw] ml-[3vw] h-[6vw] rounded-[5vw] bg-[#787878] dark:bg-[#ba957e] relative">
                    <div class="flex w-[14vw] h-[6vw] justify-center absolute top-0 left-0 items-center">
                      <Icon icon="material-symbols:add" />
                      <span class="text-[1vw]">关注</span>
                    </div>
                  </div>
              </div>
              <!-- 标签 -->
              <div class="flex dark:text-[#fff]">
                  <p
                  v-for="item in Tag"
                  :key="item.id"
                  class="flex items-center text-[1vw] mt-[1vw] mr-[2vw] bg-[#787878] dark:bg-[#ba957e] p-[0.5vw] rounded-[2vw]"
                  >
                    <span>{{ item }}</span>
                    <Icon icon="ep:arrow-right" color="white" class="text-[3vw]" />
                  </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 点击后的 -->
        <div v-if="display">
          <p class="flex  pl-[4vw] pr-[4vw] mt-[12vw]" style="justify-content: space-between;">
              <span class="text-[2vw] text-[#aba59d]">喜欢这个歌单的用户也听了</span>
              <span class="w-[5vw] h-[5vw] rounded-[50%] pr-[0.2vw] bg-[#c6e7c0] flex"  @click="lb1" style="align-items: center; justify-content:center" >
                  <Icon icon="ep:arrow-up"  class="text-[#fff] text-[3.5vw]"  />
              </span>
          </p>
          <div class="overflow-auto lunbo pl-[2vw] pr-[2vw] mt-[3vw]">
              <div class=" flex " :style="`width:${music?.length * 25 + 25}vw`"  style="justify-content: space-around;">
                  <div v-for="(item) in music" :key="item.tom" class="w-[28vw]">
                      <img :src="item.coverImgUrl" alt="" class="w-[28vw] h-[28vw] rounded-[4vw]">
                      <p class=" line-clamp-2 text-[#fff] text-[2vw] mt-[2vw]">{{ item.name }}</p>
                  </div>
              </div>
          </div>
        </div>


        <!-- 评论描述 -->
        <div class="text-[#bebebe] flex m-auto items-center ml-[5vw] mt-[3vw]">
            <p
            class="menu overflow-auto whitespace-nowrap w-[80vw] h-[5vw] text-[1vw]"
            >
            {{ songlist.description }}
            </p>
            <Icon icon="ep:arrow-up" :rotate="1" class="text-[4vw]" />
        </div>
        <!-- 评论三条数据 -->
        <div class=" m-auto mt-[3vw]">
            <div class="flex  justify-between px-[5vw]">
                <div
                class="flex items-center justify-center w-[25vw] rounded-[5vw] h-[10vw] bg-[#787878] dark:bg-[#ba957e]"
                >
                <Icon icon="majesticons:share" color="white" class="text-[6vw]" />
                <span class="text-[4vw] m-[1vw] mt-[2vw]">{{
                    songlist.shareCount
                }}</span>
                </div>
                <div
                class="flex items-center justify-center w-[25vw] rounded-[5vw] h-[10vw] bg-[#787878] dark:bg-[#ba957e]"
                >
                <Icon
                    icon="ant-design:message-filled"
                    color="white"
                    class="text-[6vw]"
                />
                <span class="text-[4vw] m-[1vw] mt-[2vw]">
                    {{ songlist.trackCount }}</span
                >
                </div>
                <div
                class="flex items-center justify-center w-[25vw] rounded-[5vw] h-[10vw] bg-[#ff3b38]"
                >
                <Icon
                    icon="fluent:collections-20-filled"
                    color="white"
                    class="text-[6vw]"
                />
                <span class="text-[4vw] m-[1vw] mt-[2vw]">
                    {{
                    songlist.subscribedCount > 10000
                        ? Math.floor(songlist.subscribedCount / 10000) + '万'
                        : songlist.subscribedCount
                    }}</span
                >
                </div>
            </div>
        </div>
      </div>
    
      <!-- 播放列表 -->
      <div class=" bg-[#636363] rounded-[4vw] m-auto mt-[4vw] dark:bg-[#fff] relative">
          <div class="sticky top-[14.5vw] ">
            <!-- 头部 -->
            <div
            class="absolute w-[100%] rounded-t-[4vw] items-center h-[14vw] leading-[14vw] bg-[#636363] dark:bg-[rgb(291,278,452)] pl-[4vw] pr-[5vw] flex m-auto justify-between"
            >
            <div class="flex items-center sticky z-[3] dark:text-[black]">
                <span
                class="inline-block w-[6vw] h-[6vw] bg-[red] rounded-[50%] relative"
                >
                <Icon
                    icon="ri:play-fill"
                    color="white"
                    class="absolute top-[1vw] left-[1vw]"
                />
                </span>
                <span class="ml-[3vw]">播放全部</span>
                <span class="text-[1vw] ml-[2vw] mt-[1vw]"
                >({{ songlistAll.length }})</span
                >
            </div>
            <div class="text-[6vw] flex">
                <Icon icon="formkit:downloadcloud" color="white" class="mr-[4vw]" />
                <Icon icon="solar:list-down-outline" color="white" />
            </div>
            </div>
          </div>
          <!-- 列表 -->
          <ul class="ml-[5vw] pt-[14.5vw]">
          <li
              v-for="(item, indexs) in songlistAll"
              :key="item.key"
              class="flex w-[90%] h-[15vw] items-center justify-between  truncate"
          >
              <div class="flex items-center">
                  <span class="text-[#9a9a9a]">{{ indexs + 1 }}</span>
                  <div class="flex ml-[4vw] flex-col truncate dark:text-[#000]">
                      <p class="w-[60vw] truncate">{{ item.name }}</p>
                      <div class="flex w-[60vw]">
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
              </div>
              <div class="flex text-[#aeaeae]">
              <Icon icon="bi:play-btn" class="mr-[5vw]" />
              <Icon icon="uil:ellipsis-v" class=" " />
              </div>
          </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Sticky } from 'vant';
import store from 'storejs';
import {Songdeta,SongDataList,musicSlider} from '../../request/index.js'
Vue.use(Sticky);
import { songDetails, playlistTracks } from '../../request/index.js';
export default {
  data() {
    return {
      songlist: {},
      // creator:{},  //创作者 图片 creater.backgroundUrl  用户名 creater.nickname
      Tag: [],
      songlistAll: [], //所有的歌单
      switchCheckStatus: null,
      music:[],
      terent:true,
      display:false,

    };
  },
  created() {
    this.switchCheckStatus = store.get('switch')
    // console.log(this.$route)
    songDetails(this.$route.query.id).then((res) => {
      this.songlist = res.data.playlist;
      this.Tag = this.songlist.algTags;
      // console.log(this.songlist);
      // let songlist = res.data.playlist
      // console.log(songlist);
    });
    playlistTracks(this.$route.query.id).then((res) => {
      this.songlistAll = res.data.songs;
      // let cl = res.data.songs;
      // console.log(cl);
    });
    musicSlider(this.$route.query.id).then((res) => {
      console.log(res)
      this.music = res.data.playlists
      console.log(this.music);
    })

  },
  mounted () {//给window添加一个滚动滚动监听事件
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    HomeView() {
      this.$router.push('/HomeView');
    },
    lb(){
        this.terent = !this.terent
        this.display = !this.display
    },
    lb1(){
        this.terent = !this.terent
        this.display = !this.display
    },

  },
};
</script>

<style>
.menu::-webkit-scrollbar {
  height: 0rem;
  width: 1.25rem;
}
header>.van-notice-bar{
  background-color: #444;
}
.van-notice-bar__wrap .van-notice-bar__content{
  color: white;
}
.lunbo::-webkit-scrollbar {
  height: 0px;
  width: 20px;
}
</style>
