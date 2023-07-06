<template>
  <div
    :class="{ dark: switchCheckStatus }"
    class="text-white bg-[#1a1c23] dark:bg-[#f1f1f1] dark:text-[#1a1c23]"
  >
    <!-- 头部 -->
    <div class="">
      <header class="w-[100%] m-auto h-[10vw]  px-[4vw] fixed top-0 left-0 z-[99] bg-[#1a1c23] dark:bg-[#f1f1f1]">
        <div class="flex justify-around items-center pt-[2vw]">
          <span @click="HomeView">
            <Icon
              icon="material-symbols:navigate-before"
              color="white"
              class="text-[8vw]"
            />
          </span>
          <div class="relative">
            <input
              type="text"
              :placeholder="defaultSearch.showKeyword"
              v-model="userSearchKeywords"
              class="w-[70vw] h-[6vw] rounded-3xl pl-[7vw]"
            />
            <Icon
              icon="carbon:search"
              color="Seashell3"
              class="text-[5vw] absolute bottom-[0.5vw] left-[1.5vw] text-[#615d5e] dark:text-[#000]"
              @click.native="searchHandler(userSearchKeywords)"
            />
          </div>
          <span class="text-white">搜索</span>
          <ul
            v-if="searchSuggestList.length"
            class="absolute z-50 mb-[0.5vw] top-[8vw] left-[16vw] text-[2vw]"
            id="ulNode"
          >
            <li
              v-for="item in searchSuggestList"
              :key="item.id"
              @click="searchHandler(item.name)"
              class="w-[60vw] mb-[1vw] z-99 text-white bg-pink-700"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </header>
      <ul class="flex items-center justify-around m-auto w-[90vw] mt-[4vw]">
        <li
          class="text-[white] h-[4vw] flex w-[18vw] border-r border-[#929292] items-center"
        >
          <Icon icon="majesticons:user" color="red" />
          <span class="ml-[1vw]">歌手</span>
        </li>
        <li
          class="text-[white] h-[4vw] flex w-[18vw] border-r border-[#929292] items-center"
        >
          <Icon icon="mdi:music-box" color="red" />
          <span class="ml-[1vw]">曲风</span>
        </li>
        <li
          class="text-[white] h-[4vw] flex w-[18vw] border-r border-[#929292] items-center"
        >
          <Icon icon="game-icons:love-song" color="red" />
          <span class="ml-[1vw]">专区</span>
        </li>
        <li class="text-[white] flex w-[20vw] items-center">
          <Icon icon="icon-park-solid:voice" color="red" />
          <span class="ml-[1vw]">识曲</span>
        </li>
      </ul>
    </div>
    <!-- 内容 -->
    <div class="mt-[3vw]">
      <!-- 猜你喜欢 -->
      <div class="">
        <div class="w-[85vw] flex m-auto  justify-between">
          <span>猜你喜欢</span>
          <Icon icon="material-symbols:refresh" color="#ccc" class="text-[6vw]" @click.native="fn"/>
        </div>
        <div class="mt-[3vw] ml-[7vw] text-[1vw] flex">
          <div v-for="item in guessyourlikeArr" :key="item.id">
              <span  class="bg-[#5f5858] rounded-[3vw] p-[1.5vw] text-[#d8d3d3] mr-[2vw]">{{ item.searchWord }}</span>
          </div>
        </div>
      </div>

      <!-- 排行榜 -->
      <div class=" ml-[3vw]">
        <van-swipe :loop="false" :width="270">
          <van-swipe-item
            v-for="item in pNodes"
            :key="item.id"
          >
            <div
            class="flex flex-col w-[62vw] rounded-[3vw] mt-[4vw]  bg-[#31333a] mr-[2vw]">
              <div class="flex w-[62vw] m-auto p-[2vw] border-b border-[#41434a]">
                <h1 class="">
                  {{ item.name }}
                </h1>
                <span class="flex items-center text-[#ccc] bg-[#514c4c] p-[0.5vw] text-[1vw] rounded-[3vw] ml-[4vw]">
                  播放
                  <Icon icon="ion:play" color="white" class="text-[4vw]" />
                </span>
              </div>
              <div class="mt-[3vw]">
                <div v-for="(items, indexs) in item.tracks.slice(0, 20)" :key="items.id" class="flex text-[2vw] h-[7vw]">
                  <span v-if="indexs + 1 <= 3" class="text-[red] font-extrabold ml-[6vw]">{{
                    indexs + 1
                  }}</span>
                  <span v-if="indexs + 1 > 3" class="text-[#abadb4] font-extrabold ml-[6vw]">{{
                    indexs + 1
                  }}</span>
                  <p class="ml-[2vw] w-[54vw]  truncate">{{ items.name }}</p>
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import _ from 'lodash';
import store from 'storejs'
import {
  fetchSearchDefault,
  fetchSearchResult,
  fetchSearchSuggest,
  GuessLike,
} from '@/request';
export default {
  data() {
    return {
      userSearchKeywords: '',
      defaultSearch: {},
      searchSuggestList: [],
      guessyourlike: null,  //猜你喜欢的数据
      guessyourlikeArr:[],  //数组
      pNodes: [],
      trackArr: [],
      color: '',  //传入的颜色
      switchCheckStatus: null,
    };
  },
  methods: {
    fn(){
      this.guessyourlike.push(...this.guessyourlike.splice(0,5));
      this.guessyourlikeArr = this.guessyourlike.slice(0,5)
    },
    HomeView() {
      this.$router.push('/HomeView');
    },
    async searchHandler(keywords) {
      const res = await fetchSearchResult({
        keywords: keywords || this.defaultSearch.realkeyword,
      });
    },
  },
  async created() {
    this.switchCheckStatus = store.get('switch')
    const res = await fetchSearchDefault();
    this.defaultSearch = res.data.data;
    GuessLike().then((res) => {
      this.guessyourlike = res.data.data;
      this.guessyourlikeArr = this.guessyourlike.slice(0,4);
      console.log(this.guessyourlike);
    });
    const res1 = await axios.get(
      'https://netease-cloud-music-api-five-roan-88.vercel.app/toplist/detail'
    );
    const playlist = await Promise.all(
      res1.data.list.map(({ id }) =>
        axios.get(
          'https://netease-cloud-music-api-five-roan-88.vercel.app/playlist/detail',
          { params: { id } }
        )
      )
    );
    this.pNodes = playlist.map((item) => item.data.playlist).slice(0, 11);
    this.color = this.$route.query.color || '#FFFFFF'; // 默认颜色为白色 (#FFFFFF)
  },
  watch: {
    userSearchKeywords: _.debounce(async function (keywords) {
      const res = await fetchSearchSuggest(keywords);
      this.searchSuggestList = res.data.result.songs;
    }, 300),
  },
};
</script>
