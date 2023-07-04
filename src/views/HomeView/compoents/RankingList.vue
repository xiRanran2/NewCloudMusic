<template>
    <div  :class="{ dark: switchCheckStatus }">
        <div
          class="ml-[4vw] mt-[3vw] w-[90vw] flex m-auto justify-between items-center"
        >
          <div>
            <span class="text-[#fff] dark:text-[#000] ">排行榜</span>
            <Icon icon="bi:chevron-right" class="inline-block text-[#fff] dark:text-[#000] " />
          </div>
          <span @click="show = !show">
            <Icon icon="uim:ellipsis-v" class="text-[#aea4a4] dark:text-[#4b4545]" />
          </span>
        </div>
        <van-swipe
          class="my-swipe pl-[2vw]"
          :autoplay="30000"
          :loop="false"
          indicator-color="white"
        >
          <van-swipe-item v-for="item in blocks" :key="item.id">
            <div
              :key="item.id"
              class="p-[2vw] m-[2vw] overflow-hidden w-[90vw]  h-[50vw] bg-[#272930] dark:bg-[#fff] rounded-[2vw] scroll-item"
              ref="song"
            >
              <div class="flex justify-between w-[100%]">
                <div class="flex relative ">
                  <div class="text-[3vw] font-semibold  text-[white] dark:text-[#000]">
                    {{ item.uiElement.mainTitle.title }}
                  </div>
                  <Icon icon="bi:chevron-right" class="text-[4vw] font-semibold absolute right-[-3vw]  inline-block text-[#fff] dark:text-[#000] " />
                </div>
                <p
                  class="text-[3vw] leading-[7vw] text-ellipsis overflow-hidden whitespace-nowrap text-[#aea4a4]"
                >
                  {{ item.uiElement.mainTitle.titleDesc }}
                </p>
              </div>
              <ul class="">
                <li
                  v-for="(items, indexs) in 3"
                  :key="indexs.id"
                  class="mb-[3vw]"
                >
                  <div class="flex relative w-[100%]">
                    <img
                      :src="
                        item.resources[indexs].resourceExtInfo?.songData.album
                          .blurPicUrl
                      "
                      class="w-[10vw]"
                      alt=""
                    />
                    <p class="text-[5vw] w-[10vw] text-center">
                      {{ indexs + 1 }}
                    </p>
                    <div>
                      <p
                        class="text-[3.5vw]  text-white dark:text-black font-normal w-[40vw] text-ellipsis overflow-hidden whitespace-nowrap"
                      >
                        {{
                          item.resources[indexs].resourceExtInfo?.songData.name
                        }}
                      </p>
                      <p class="text-[2.5vw] text-[#ccc] dark:text-[rgb(166,172,105)]">
                        {{item.resources[indexs].resourceExtInfo?.artists[0].name}}
                        <span class="absolute  h-[5vw] right-[3vw] text-[3vw] text-[green] top-[1vw]" ref="sps"  v-if="item.resources[indexs]?.uiElement.labelText.text ==='新晋'"  >
                          
                          {{item.resources[indexs]?.uiElement.labelText.text}}
                          </span>
                          <span class="text-[red] absolute h-[5vw] right-[3vw] text-[3vw]  top-[1vw]" v-else>{{item.resources[indexs]?.uiElement.labelText.text}}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
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
          <p class="text-[#e5e7eb] text-[1vw] p-[4vw]">排行榜</p>
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
    export default{
      data(){
        return {
          show: false,
        }
      },
        name:'RankingList',
        props:['blocks']
    }
</script>