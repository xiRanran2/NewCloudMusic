<template>
    <div>
        <div
          class="ml-[4vw] mt-[3vw] w-[90vw] flex m-auto justify-between items-center"
        >
            <span class="text-[#fff]">热门话题</span>
          <Icon icon="uim:ellipsis-v" class="text-[#aea4a4]" />
        </div>
        <ul class="flex">
          <li class="flex items-center w-[90vw] h-[30vw] bg-[#4f5054] rounded-[2vw] ml-[4vw]"  indicator-color="white">
            <div class="flex mr-[2vw] flex-col">
              <div class="text-[white] flex mb-[2vw]">
                <Icon icon="icon-park-solid:topic" class="text-[6vw]" />
                <p>每人一首最近单曲循环的歌</p>
              </div>
              <div class="flex text-[white] items-center">
                <p class="text-[1vw]">云音乐VIP:</p>
                <span>近日推荐《世界杯》</span>
              </div>
            </div>
            <img class="w-[21vw] rounded-[2vw]" src="https://p1.music.126.net/RZWN1SbPoDqhwhpmsjxPZg==/109951168112033444.jpg" alt="">
          </li>
        </ul>
      </div>
</template>

<script>
    export default {
        name:'HotTopic',
        props:['hottopic']
    }
</script>