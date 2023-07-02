<template>
    <div>
        <div class="flex justify-around items-center">
            <div></div>
            <Icon />
        </div>
        <div></div>
    </div>
</template>

<script>
    import BScroll from "@better-scroll/core";
    let bs = null;
    export default{
        mounted(){
            bs = new BScroll(this.$refs.wrapper,{
                scrollX:true,
                scrollY:false,
            })
        },
        updated(){
            bs.refresh();
        },
        props:{
            label:{
                required:true,
                type:string,
            }
        }
    }
</script>