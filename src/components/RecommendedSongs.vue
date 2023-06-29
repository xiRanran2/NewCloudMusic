<template>
    <div>
        <img :src="$attrs.recommend.picUrl" class="w-[29vw] h-[30vw] rounded-[3vw]" />
        <p class="text-[#fff] overflow-hidden h-[10vw]">{{ $attrs.recommend.name }}</p>
    </div>
</template>
<script>
    // export default {
    //     name:'RecommendedSongs',
    //     props:'personalized'
    // }
</script>