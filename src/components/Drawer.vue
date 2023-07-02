<template>
  <div @click="clickHandler">
    <transition :name="direction" :class="{ dark: switchCheckStatus }">
      <div
        v-show="visible"
        class="w-screen h-[100%] bg-[#594f4f] fixed z-[999] overflow-auto dark:bg-[#bfa5a5]"
        :style="[drawerContentStyle, { width }]"
      >
        <div>
          <slot name="header">
            <div class="fixed w-[75%] bg-[#594f4f] flex justify-between items-center dark:bg-[#bfa5a5]">
              <p class="flex items-center text-white m-[1vw] p-[1vw]">
                <img
                  class="w-[6vw] h-[6vw] rounded-[50%]"
                  src="https://fastly.picsum.photos/id/211/1920/1280.jpg?hmac=5feWJpfa59_r1yi4NCuTxY9IWrNWZqEUDIAwrtKId9s"
                  alt=""
                />
                <span class="ml-[2vw]">ranran</span>
                <Icon
                  icon="simple-line-icons:arrow-up"
                  class="text-[#fff] text-[3vw]"
                  :rotate="1"
                />
              </p>
              <Icon
                icon="mdi:line-scan"
                class="text-[#fff] mr-[4vw] text-[5vw]"
              />
            </div>
          </slot>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    </transition>
    <div
      v-if="visible"
      ref="drawerMask"
      class="bg-black opacity-20 fixed top-0 right-0 bottom-0 left-0 z-[998]"
    ></div>
  </div>
</template>
<script>
export default {
  // 单向数据流（父级通过props传递给子组件的数据 子组件没有权利修改）
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    model:{
      prop:'val',
    },
    title: {
      type: String,
      // default: '',
    },
    direction: {
      type: String,
      default: 'btt',
      validator(direction) {
        return ['ttb', 'btt', 'ltr', 'rtl'].includes(direction);
      },
    },
    width: {
      type: [Number, String],
      default: '80vw',
    },
  },
  // 计算属性
  computed: {
    drawerContentStyle() {
      if (this.direction === 'btt') {
        return {
          width: '100vw',
          left: 0,
          bottom: 0,
        };
      } else if (this.direction === 'ttb') {
        return {
          width: '100vw',
          left: 0,
          top: 0,
        };
      } else if (this.direction === 'ltr') {
        return {
          height: '100vh',
          left: 0,
          top: 0,
        };
      } else if (this.direction === 'rtl') {
        return {
          height: '100vh',
          right: 0,
          top: 0,
        };
      }
    },
  },
  methods: {
    closeDrawer() {
      this.$emit('update:visible', false);
    },
    clickHandler(e) {
      if (e.target === this.$refs.drawerMask) {
        // this.visible = false;
        // 使用vm.$emit给父组件传递数据
        this.closeDrawer();
      }
    },
  },
};
</script>
<style scoped>
.btt-enter,
.btt-leave-to {
  transform: translateY(110%);
}

.btt-enter-active,
.btt-leave-active {
  transition: all ease-in-out 0.5s;
}
.btt-enter-to,
.btt-leave {
  transform: translateY(0);
}
</style>
