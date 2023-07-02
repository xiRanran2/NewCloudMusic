<template>
    <div :class="{ dark: switchCheckStatus }">
        <span class="absolute text-[4vw] top-[5vw] left-[6vw] text-[#aea4a4] dark:text-[rgb(225,201,201)] z-[10] nowdate"></span>
        <img :src="$attrs.daily.iconUrl" class="red-image w-[15vw] h-[15vw]" />
        <p class="text-[1vw] text-[#aea4a4] dark:text-[#000] w-[15vw] text-center">
            {{ $attrs.daily.name }}
        </p>
    </div>
</template>

<script>
    let DateTime = new Date();
    let date = DateTime.getDate()
    export default{
        mounted(){
            const nowdate = document.querySelector('.nowdate');
            // console.log(nowdate)
            nowdate.innerText = `${date}`
        }
    }
   
    
    
</script>