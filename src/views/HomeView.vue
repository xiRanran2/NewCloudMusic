<template>
  <div>
    <header class="w-[97vw] h-[10vw] relative mt-4">
      <div class="flex justify-around items-center">
        <Icon icon="pepicons-pop:menu" color="white" class="text-[6vw]" />
        <div class="relative">
          <input
            type="text"
            :placeholder="defaultSearch.showKeyword"
            v-model="userSearchKeywords"
            class="w-[70vw] h-[6vw] rounded-3xl pl-6 border-amber-400"
          />
          <Icon
            icon="carbon:search"
            color="Seashell3"
            class="text-[6vw] absolute bottom-0 left-[4px]"
            @click.native="searchHandler(userSearchKeywords)"
          />
        </div>
        <Icon icon="ph:microphone-bold" color="white" class="text-[6vw]" />
        <ul v-if="searchSuggestList.length" class="absolute z-50 mb-[0.5vw] top-[8vw] left-[16vw] text-[2vw] ">
          <li v-for="item in searchSuggestList" :key="item.id" @click="searchHandler(item.name)" class="w-[60vw] mb-[1vw] z-99 text-white bg-pink-700">{{item.name}}</li>
        </ul>
      </div>
    </header>
    <!-- 头部 -->
    <!-- <Search :head="head"></Search> -->
      <!-- 轮播图 -->
      <Banner :menu="menu"></Banner>
      <!-- 每日推荐 -->
      <div class="flex">
        <div class="menu flex w-[88%] overflow-auto m-auto mt-[3vw]">
          <DailyRecommend v-for="item in menulist" :key="item.id" :daily="item" class="mr-[3vw]"></DailyRecommend>
        </div>
      </div>

      <!-- 推荐歌单 -->
      <div>
        <div class="ml-[4vw] mt-[3vw]">
          <span class="text-[#fff]">推荐歌单</span>
          <Icon icon="bi:chevron-right" class="inline-block text-[#fff]" />
        </div>
      </div>
      <div class="flex w-[98vw] overflow-auto lis menu mt-[3vw] ml-[2vw]">
        <RecommendedSongs v-for="item in personalized" :key="item.id" :recommend="item" class="w-[29vw] h-[40vw] text-[1vw] mr-[2vw]"></RecommendedSongs>
      </div>
      <!-- <div>
        <div class="ml-[4vw] mt-[3vw]">
          <span class="text-[#fff]">推荐歌单</span>
          <Icon icon="bi:chevron-right" class="inline-block text-[#fff]" />
        </div>
      </div>
      <ul
        class="flex w-[98vw] h-[40vw] overflow-auto lis menu mt-[3vw] ml-[2vw]"
      >
        <li
          v-for="item in personalized"
          :key="item.id"
          class="w-[29vw] h-[40vw] text-[1vw] mr-[2vw]"
        >
          <img :src="item.picUrl" class="w-[29vw] h-[30vw] rounded-[3vw]" />
          <p class="text-[#fff]">{{ item.name }}</p>
        </li>
      </ul> -->
      <!-- <RecommendedSongs :personalized="personalized"></RecommendedSongs> -->
      <!-- 新歌新碟 -->
      <NewSongList :songList="songList"></NewSongList>
      <!-- 排行榜 -->
      <RankingList :blocks="blocks"></RankingList>
      
      <!-- 热门话题 -->
      <HotTopic :hottopic="hottopic"></HotTopic>

      <!-- 音乐日历 -->
      <MusicCalendar :Calendar="Calendar"></MusicCalendar>
  </div>
</template>
<script>
import axios from 'axios';
import _ from 'lodash';
import {
  fetchSearchDefault,
  fetchSearchResult,
  fetchSearchSuggest,
  Personalized,
  DailyRecommened,
  Banners,
  Canlanders,
} from '@/request';
export default {
  data() {
    return {
      menu: [],
      playlists: [],
      menulist: [],
      personalized: [],
      ranking: [],
      songList: [],
      blocks: [],
      calendar:[],
      userSearchKeywords: '',
      defaultSearch: {},
      searchSuggestList: [],
    };
  },
  components:{
    Search:()=> import ('../components/Search.vue'), //头部搜索
    Banner : () => import ('../components/Banner.vue'),   //轮播图
    DailyRecommend : () => import ('../components/DailyRecommend.vue'),   //每日推荐
    RecommendedSongs : () => import ('../components/RecommendedSongs.vue'),   //推荐歌单
    NewSongList : () => import ('../components/NewSongList.vue'),  //新歌新碟
    RankingList: () => import ('../components/RankingList.vue'),  //排行榜
    HotTopic: () => import ('../components/HotTopic.vue'),  //热门话题
    MusicCalendar:() => import ('../components/MusicCalendar.vue') //音乐日历
  },
  methods: {
    async searchHandler(keywords) {
      const res = await fetchSearchResult({
        keywords: keywords || this.defaultSearch.realkeyword,
      });
    },
  },
  async created() {
    //获取搜索默认值
    const res = await fetchSearchDefault();
    this.defaultSearch = res.data.data;
    //每日推荐
    DailyRecommened().then((res) => {
      this.menulist = res.data.data;
    })
    //推荐歌单
    Personalized().then((res) => {
      this.personalized = res.data.result;
    })
    Banners().then((res) => {
      this.menu = res.data.data.blocks[0].extInfo.banners; //banner轮播
      this.songList = res.data.data.blocks[5].creatives;  //新歌新碟 
      this.blocks = res.data.data.blocks[3].creatives;  // 排行榜
    })
      //日历
    Canlanders().then((res) => {
      this.Calendar = res.data.data.calendarEvents; 
    })    
  },
  watch: {
    userSearchKeywords: _.debounce(async function (keywords) {
      const res = await fetchSearchSuggest(keywords);
      this.searchSuggestList = res.data.result.songs;
    }, 300),
  },
};
</script>
<style>
  body {
    background-color: #2d2c2c;
  }
  img {
    max-width: none;
  }
  .red-image {
    filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
  }
  .menu::-webkit-scrollbar {
    height: 0px;
    width: 20px;
  }
  .van-swipe__indicators>.van-swipe__indicator{
    width: 0;
    height: 0;
  }
</style>
