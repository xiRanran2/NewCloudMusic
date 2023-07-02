<template>
  <div :class="{ dark: switchCheckStatus }">
    <div
      class="ml-[4vw] mt-[3vw] w-[90vw] flex m-auto justify-between items-center"
    >
      <span class="text-[#fff] dark:text-[#000000]">热门话题</span>
      <Icon icon="uim:ellipsis-v" class="text-[#aea4a4] dark:text-[#4b4545]" />
    </div>
    <div class="scroll-wrapper ml-[1vw] w-[89vw] rounded-[2vw] overflow-hidden" ref="scroll">
      <ul class="scroll-content flex w-[252vw] m-[2vw] ml-[2vw]">
        <li class="scroll-item rounded-[2vw] w-[60vw]  h-[28vw] bg-[#d1b278]">
          <div>
            <div
              class="mt-[2vw] ml-[2vw] flex text-[white] dark:text-[#000000]"
            >
              <Icon icon="icon-park-solid:topic" class="mt-[1vw]" />
              <span>云村最会拍照的人！</span>
            </div>
            <span class="text-[#747474] dark:text-[#0d0c0c] mt-[2vw] ml-[2vw]">28万热度</span>
            <div class="flex justify-between">
              <div
                class="text-[1vw] text-[#fff] dark:text-[#0d0c0c] ml-[1vw] w-[30vw] whitespace-normal"
              >
                还在听《feat. Rich Homie》吗|时光雷达
            </div>
              <img
                src="http://p2.music.126.net/neplcbLsKK_RNo7w0xTpVw==/109951165653226332.jpg"
                class="mr-[2vw] mt-[-3vw] w-[14vw] rounded-[2vw]"
              />
            </div>
          </div>
        </li>
        <li class="scroll-item rounded-[2vw] w-[60vw] ml-[4vw]  h-[28vw] bg-[#8696dc]">
          <div>
            <div
              class="mt-[2vw] ml-[2vw] flex text-[white] dark:text-[#000000]"
            >
              <Icon icon="icon-park-solid:topic" class="mt-[1vw]" />
              <span>云村最会拍照的人！</span>
            </div>
            <span class="text-[#747474] dark:text-[#0d0c0c] mt-[2vw] ml-[2vw]">28万热度</span>
            <div class="flex justify-between">
              <div
                class="text-[1vw] text-[#fff] dark:text-[#0d0c0c] ml-[1vw] w-[30vw] whitespace-normal"
              >
                还在听《feat. Rich Homie》吗|时光雷达
            </div>
              <img
                src="http://p2.music.126.net/neplcbLsKK_RNo7w0xTpVw==/109951165653226332.jpg"
                class="mr-[2vw] mt-[-3vw] w-[14vw] rounded-[2vw]"
              />
            </div>
          </div>
        </li>
        <li class="scroll-item rounded-[2vw] w-[60vw] ml-[4vw]  h-[28vw] bg-[#61e0f1]">
          <div>
            <div
              class="mt-[2vw] ml-[2vw] flex text-[white] dark:text-[#000000]"
            >
              <Icon icon="icon-park-solid:topic" class="mt-[1vw]" />
              <span>云村最会拍照的人！</span>
            </div>
            <span class="text-[#747474] dark:text-[#0d0c0c] mt-[2vw] ml-[2vw]">28万热度</span>
            <div class="flex justify-between">
              <div
                class="text-[1vw] text-[#fff] dark:text-[#0d0c0c] ml-[1vw] w-[30vw] whitespace-normal"
              >
                还在听《feat. Rich Homie》吗|时光雷达
            </div>
              <img
                src="http://p2.music.126.net/neplcbLsKK_RNo7w0xTpVw==/109951165653226332.jpg"
                class="mr-[2vw] mt-[-3vw] w-[14vw] rounded-[2vw]"
              />
            </div>
          </div>
        </li>
        <li class="scroll-item rounded-[2vw] w-[60vw] ml-[4vw]  h-[28vw] bg-[#f14da5]">
          <div>
            <div
              class="mt-[2vw] ml-[2vw] flex text-[white] dark:text-[#000000]"
            >
              <Icon icon="icon-park-solid:topic" class="mt-[1vw]" />
              <span>云村最会拍照的人！</span>
            </div>
            <span class="text-[#747474] dark:text-[#0d0c0c] mt-[2vw] ml-[2vw]">28万热度</span>
            <div class="flex justify-between">
              <div
                class="text-[1vw] text-[#fff] dark:text-[#0d0c0c] ml-[1vw] w-[30vw] whitespace-normal"
              >
                还在听《feat. Rich Homie》吗|时光雷达
            </div>
              <img
                src="http://p2.music.126.net/neplcbLsKK_RNo7w0xTpVw==/109951165653226332.jpg"
                class="mr-[2vw] mt-[-3vw] w-[14vw] rounded-[2vw]"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core';
export default {
  name: 'HotTopic',
  props: ['hottopic'],
  // data () {
  //   return {
  //     emojis: [
  //       '👉🏼 😁 😂 🤣 👈🏼',
  //       '😄 😅 😆 😉 😊',
  //       '😫 😴 😌 😛 😜',
  //       '👆🏻 😒 😓 😔 👇🏻',
  //       '😑 😶 🙄 😏 😣',
  //       '😞 😟 😤 😢 😭',
  //       '🤑 😲 ☹️ 🙁 😖',
  //       '👍 👎 👊 ✊ 🤛',
  //       '☝️ ✋ 🤚 🖐 🖖',
  //       '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
  //       '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
  //       '🌖 🌗 🌘 🌑 🌒'
  //     ]
  //   }
  // },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3, // listening scroll event
      });
    },
  },
};
</script>