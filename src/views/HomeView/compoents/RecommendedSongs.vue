<template>
  <div :class="{ dark: switchCheckStatus }">
    <div class="w-[92vw] flex flex-row items-end justify-between align-center ">
      <div class="ml-[4vw] mt-[3vw]">
        <span class="text-[#fff] dark:text-[#000]  ">推荐歌单</span>
        <Icon icon="bi:chevron-right" class="inline-block text-[#fff] dark:text-[#000]" />
      </div>
      <span @click="show = !show">
        <Icon icon="uim:ellipsis-v" class="text-[#aea4a4] dark:text-[#4b4545]" />
      </span>
    </div>
    
    <div class="flex w-[90vw] overflow-auto lis menu mt-[3vw] ml-[2vw]"> 
      <ul
        class="flex w-[90vw] h-[40vw] overflow-auto lis menu mt-[3vw] ml-[2vw]"
      >
      <div class="w-[31vw] h-[31vw]  mr-[2vw] ">
        <div class="w-[31vw] h-[31vw]  overflow-hidden relative rounded-[3vw]">
          <div class="absolute top-[4%] right-[8%] font-[800] text-[#fff] dark:text-[#000] flex items-center z-30">
            <Icon icon="ion:infinite-outline" class="text-[#fff] dark:text-[#fff] w-[6vw] h-[6vw]"/>
          </div>
          <transition name="abc" v-for="(item, index) in bannerPic" :key="item.id">
            <div v-if="visible === index" class="absolute top-0 left-0&quot;" >
              <img :src="item.uiElement.image.imageUrl" alt="" class="w-[29vw] h-[30vw] rounded-[3vw]" />
            </div>
          </transition>
        </div>
        <p class="text-[#fff] dark:text-[#000] text-[1vw] truncate">
          {{ resourceData }}
        </p>
      </div>
        <li
          v-for="item in personalized"
          :key="item.id"
          class="w-[29vw] h-[40vw] text-[1vw] mr-[2vw] relative"
        >
          <div class="text-white flex items-center absolute top-[1vw] right-0">
            <Icon icon="ion:play" color="white" class="text-[3vw]" />
            <span>{{
              item.resources[0].resourceExtInfo.playCount > 10000
                ? Math.floor(
                    item.resources[0].resourceExtInfo.playCount / 10000
                  ) + '万'
                : item.resources[0].resourceExtInfo.playCount
            }}</span>
          </div>
          <Icon
            icon="ion:play"
            color="white"
            class="text-[5vw] absolute bottom-[11vw] right-0"
          />
          <img
            :src="item.uiElement.image.imageUrl"
            class="w-[29vw] h-[30vw] rounded-[3vw]"
          />
          <p class="text-[#fff] dark:text-[#130c0c] truncate">{{ item.uiElement.mainTitle.title }}</p>
        </li>
      </ul>
    </div>
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '25%', backgroundColor: '#7d7373' }"
      
      round
    >
      <p class="text-[#e5e7eb] text-[1vw] p-[4vw]">推荐歌单</p>
      <ul class="text-[white]">
        <li
          class="text-[5vw] w-[31vw] h-[9vw] flex justify-evenly items-center ml-[3vw]"
        >
          <Icon icon="icon-park-outline:good-one" color="white" />
          <span>优先推选</span>
        </li>
        <li
          class="text-[5vw] w-[31vw] h-[9vw] flex justify-evenly items-center ml-[3vw]"
        >
          <Icon icon="basil:heart-off-outline" color="white" />
          <span>减少推荐</span>
        </li>
        <li
          class="text-[5vw] w-[31vw] h-[9vw] flex justify-evenly items-center ml-[3vw]"
        >
          <Icon icon="mingcute:more-4-line" color="white" />
          <span>更多内容</span>
        </li>
      </ul>
    </van-popup>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: 0,
        // resourceData: '',
        bannerPic: [],
        personalized:[],
        show: false,
      };
    },
    name: 'RecommendedSongs',
    props: ['personalized','bannerPic'],
    mounted(){
      this.animateItems()
    },
    methods:{
      animateItems() {
        setInterval(() => {
          this.visible++;
          if (this.visible === this.bannerPic.length) {
            this.visible = 0;
          }
          this.resourceData =
            this.bannerPic[this.visible].uiElement.mainTitle.title;
        }, 5000);
      },
    }
  };
</script>

<style scoped>
  .abc-enter{
    opacity: 0;
    transform: translateY(100%) scale(.7);
  }
  .abc-enter-active{
    transition: all ease-in-out 1s;
  }
  .abc-enter-to{
    opacity: 1;
    transform: translateY(0%) scale(1);
  }

  .abc-leave{
    transform: translateY(0) scale(1);
  }
  .abc-leave-active{
    transition: all ease-in-out 1s;
  }
  .abc-leave-to{
    transform: translateY(-100%) scale(.7);
  }
</style>
