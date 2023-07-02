<template>
  <div
    class="w-[60px] h-[30px] rounded-[15px]"
    :class="`{
        ${value1 ? 'bg-red-300' : 'bg-black'}
    }`"
    @click="toggle"
  >
    <div
      class="w-[30px] h-[30px] rounded-[15px] bg-[white] translate-all"
      :class="`{
            ${value1 ? 'translate-x-[30px]' : 'translate-x-0'}
        }`"
    ></div>
  </div>
</template>

<script>
export default {
    //model主要是去配置v-model指令需要使用的屬性名 shijian
    model:{
        prop:'value1',
        event:'input1'
    },
    props: {
        value1: {
            type: Boolean,
            requires: true,
        },
    },
    methods:{
        toggle(){
            this.$emit('input1',!this.value1)

        }
    }
};
</script>
