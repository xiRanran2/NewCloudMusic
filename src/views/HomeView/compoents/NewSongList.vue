<template>
    <div  :class="{ dark: switchCheckStatus }">
        <div
          class="ml-[4vw] mt-[3vw] w-[90vw] flex m-auto justify-between items-center"
        >
          <div>
            <span class="text-[#fff]  dark:text-[#000]">新歌新碟\数字专辑</span>
            <Icon icon="bi:chevron-right" class="inline-block text-[#fff]  dark:text-[#000]" />
          </div>
          <span @click="show = !show">
            <Icon icon="uim:ellipsis-v" class="text-[#aea4a4] dark:text-[#4b4545]" />
          </span>
        </div>
        <van-swipe class="my-swipe w-[90vw] flex mt-[2vw]"  indicator-color="white">
          <van-swipe-item v-for="item in songList"
          :key="item.id"
          class="w-[90vw] h-[61vw] flex flex-col ml-[4vw] mt-[1vw]">
            <div
            v-for="key in item.resources"
            :key="key.id"
            class="w-[90vw] flex flex-row items-center mb-[1vw]"
          >
            <img
              :src="key.uiElement?.image.imageUrl"
              class="w-[20vw] rounded-[2vw]"
            />
            <div class="flex flex-col ml-[2vw] mb-[1vw]">
              <p class="text-[#fff]  dark:text-[#000] text-[3vw] mb-[2vw]">
                {{ key.uiElement?.mainTitle.title }}
              </p>
              <p class="text-[#aea4a4] dark:text-[#4b4545] text-[1.5vw]">
                {{ key.uiElement?.subTitle.title }}
              </p>
            </div>
          </div>
          </van-swipe-item>
        </van-swipe>
        <van-popup
          v-model="show"
          closeable
          position="bottom"
          :style="{ height: '25%', backgroundColor: '#7d7373' }"
          round
        >
          <p class="text-[#e5e7eb] text-[1vw] p-[4vw]">新歌新碟\数字专辑</p>
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
    import store from 'storejs';
    export default{
      data(){
        return {
          show: false,
          switchCheckStatus:null,
        }
      },
      created(){
        this.switchCheckStatus = store.get('switch');
      },
      name:'NewSongList',
      props:['songList']
    }
</script>