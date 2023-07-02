<template>
    <div  :class="{ dark: switchCheckStatus }">
        <div
          class="ml-[4vw] mt-[3vw] w-[90vw] flex m-auto justify-between items-center"
        >
          <div>
            <span class="text-[#fff]  dark:text-[#000]">新歌新碟\数字专辑</span>
            <Icon icon="bi:chevron-right" class="inline-block text-[#fff]  dark:text-[#000]" />
          </div>
          <Icon icon="uim:ellipsis-v" class="text-[#aea4a4] dark:text-[#4b4545]" />
        </div>
        <van-swipe class="my-swipe w-[90vw] flex mt-[2vw]"  indicator-color="white">
          <van-swipe-item v-for="item in songList"
          :key="item.id"
          class="w-[90vw] h-[61vw] flex flex-col ml-[2vw] mt-[1vw]">
            <div
            v-for="key in item.resources"
            :key="key.id"
            class="w-[90vw] flex flex-row items-center mb-[1vw]"
          >
            <img
              :src="key.uiElement.image.imageUrl"
              class="w-[20vw] rounded-[2vw]"
            />
            <div class="flex flex-col ml-[2vw] mb-[1vw]">
              <p class="text-[#fff]  dark:text-[#000] text-[3vw] mb-[2vw]">
                {{ key.uiElement.mainTitle.title }}
              </p>
              <p class="text-[#aea4a4] dark:text-[#4b4545] text-[1.5vw]">
                {{ key.uiElement.subTitle.title }}
              </p>
            </div>
          </div>
          </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    export default{
        name:'NewSongList',
        props:['songList']
    }
</script>