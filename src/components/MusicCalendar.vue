<template>
  <div>
    <div class="ml-[4vw] mt-[3vw] w-[90vw] flex m-auto justify-between items-center">
      <div class="flex items-center w-[30vw] justify-between space-around">
        <span class="text-[#fff]  w-[18vw]">音乐日历</span>
        <div class="flex items-center  rounded-[1.5vw] text-center bg-slate-400">
          <span class="text-[#fff] text-[1vw]">更多</span>
          <Icon icon="bi:chevron-right" class="text-[2vw] inline-block text-[#fff]" />
        </div>
      </div>
      <Icon icon="uim:ellipsis-v" class="text-[#aea4a4]" />
    </div>
    <ul class="w-[90vw] mt-[2vw] h-[38vw] bg-[#4f5054] overflow-hidden rounded-[2vw] ml-[4vw]">
      <li v-for="item in Calendar" :key="item.id"
        class="flex justify-between items-center w-[90%] mx-auto  mb-[2vw] mt-[3vw]">
        <div>
          <div class="text-[#fff]">{{ dayjs(item.onlineTime).format('MM/DD ') }}</div>
          <div class="text-[#fff]">{{ item.title }}</div>
        </div>
        <img :src="item.imgUrl" alt="" class="w-[15vw] h-[15vw] rounded-md" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MusicCalendar',
  props: ['Calendar'],
}
</script>