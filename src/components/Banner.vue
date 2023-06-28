<template>
    <div class="swiper mySwiper mt-[4.537vw] ">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in menu" :key="item.id">
            <img
              :src="item.pic"
              alt=""
              class="w-[92.22vw] h-[35.741vw] m-auto rounded-2xl"
            />
          </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    export default{
        name:'Banner',
        props:['menu']
    }
</script>