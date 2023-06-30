<template>
    <div>
        <div class="w-[92vw] flex flex-row items-end justify-between align-center">
            <div class="ml-[4vw] mt-[3vw]">
              <span class="text-[#fff]">推荐歌单</span>
              <Icon icon="bi:chevron-right" class="inline-block text-[#fff]" />
            </div>
            <span @click="show = !show">
              <Icon icon="uim:ellipsis-v" class="text-[#aea4a4]" />
            </span>
          </div>
          <div class="flex w-[98vw] overflow-auto lis menu mt-[3vw] ml-[2vw]">
            
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
        data(){
            return {
                show: false
            }
        },
        name:'RecommendedSongs',
        props:['personalized'],
        // props:{
        //   source:{
        //     type:Object,  
        //     required:true,   //是否必须传递
        //   }
        // },
        // count:{
        //   default:1,
        //   valdator(value){
        //     return [1,2,3].includes(value);
        //   }
        // },
        // mounted(){
        //   console.log(this);
        // }
    }
</script>

<style>
</style>