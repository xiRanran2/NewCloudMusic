<template>
    <header class="w-[97vw] h-[10vw] relative mt-4">
        <div class="flex justify-around items-center">
          <Icon icon="pepicons-pop:menu" color="white" class="text-[6vw]" />
          <div class="relative">
            <input
              type="text"
              :placeholder="defaultSearch.showKeyword"
              v-model="userSearchKeywords"
              class="w-[70vw] h-[6vw] rounded-3xl pl-6 border-amber-400"
            />
            <Icon
              icon="carbon:search"
              color="Seashell3"
              class="text-[6vw] absolute bottom-0 left-[4px]"
              @click.native="searchHandler(userSearchKeywords)"
            />
          </div>
          <Icon icon="ph:microphone-bold" color="white" class="text-[6vw]" />
          <ul v-if="searchSuggestList.length" class="absolute z-50 mb-[0.5vw] top-[8vw] left-[16vw] text-[2vw] ">
            <li v-for="item in searchSuggestList" :key="item.id" @click="searchHandler(item.name)" class="w-[60vw] mb-[1vw] z-99 text-white bg-pink-700">{{item.name}}</li>
          </ul>
        </div>
    </header>
</template>

<script>
    export default {
        name:'Search',
        props:['head']
    }
</script>