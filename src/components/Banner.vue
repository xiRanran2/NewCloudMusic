<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in menu" :key="item.id" class="mt-[1vw]"
      ><img
        :src="item.pic"
        alt=""
        class="rounded-[5vw] w-[90vw] h-[36vw] ml-[2vw] mt-[2vw]"
      />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
    export default{
        name:'Banner',
        props:['menu']
    }
</script>