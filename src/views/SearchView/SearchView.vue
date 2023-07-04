<template>
  <div
    :class="{ dark: switchCheckStatus }"
    class="text-white bg-[#1a1c23] dark:bg-[#f1f1f1]"
  >
    <div class="">
      <header class="w-[90vw] m-auto h-[10vw] relative p-[1vw]">
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
    <!-- 猜你喜欢 -->
    <div>
      <div class="w-[85vw] flex m-auto mt-[3vw] justify-between">
        <span>猜你喜欢</span>
        <Icon icon="material-symbols:refresh" color="#ccc" class="text-[6vw]" />
      </div>
      <div class="mt-[3vw] ml-[7vw] text-[1vw] flex">
        <template v-for="(item, index) in guessyourlike">
          <div v-if="index < n" :key="item.id">
            <span
              class="bg-[#5f5858] rounded-[3vw] p-[1.5vw] text-[#d8d3d3] mr-[2vw]"
              >{{ item.searchWord }}</span
            >
          </div>
        </template>
      </div>
    </div>

    <!-- 排行榜 -->
    <div class=" ml-[3vw]">
      <van-swipe :loop="false" :width="270">
        <van-swipe-item
          class="flex flex-col w-[50vw] rounded-[3vw] mt-[4vw] mr-[4vw] bg-[#31333a]"
          v-for="item in pNodes"
          :key="item.id"
        >
          <h1 class="w-[56vw] m-auto p-[2vw] border-b border-[#41434a]">
            {{ item.name }}
          </h1>
          <div class="mt-[3vw]">
            <div v-for="(items, indexs) in item.tracks.slice(0, 20)" :key="items.id" class="flex text-[2vw] h-[7vw]">
              <span v-if="indexs + 1 <= 3" class="text-[red] ml-[6vw]">{{
                indexs + 1
              }}</span>
              <span v-if="indexs + 1 > 3" class="text-[#abadb4] ml-[6vw]">{{
                indexs + 1
              }}</span>
              <p class="ml-[2vw] w-[54vw]  truncate">{{ items.name }}</p>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import _ from 'lodash';
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
      guessyourlike: [],
      n: 4,
      pNodes: [],
      trackArr: [],
    };
  },
  methods: {
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
    const res = await fetchSearchDefault();
    this.defaultSearch = res.data.data;
    GuessLike().then((res) => {
      this.guessyourlike = res.data.data;
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
  },
  watch: {
    userSearchKeywords: _.debounce(async function (keywords) {
      const res = await fetchSearchSuggest(keywords);
      this.searchSuggestList = res.data.result.songs;
    }, 300),
  },
};
</script>
