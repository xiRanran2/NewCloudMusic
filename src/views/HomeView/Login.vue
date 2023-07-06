<template>
  <div class="h-screen">
    <div class="p-[6.15vw]">
        <!-- 头部 -->
      <div class="flex justify-between pt-[6vw]">
        <span @click="HomeView">
            <Icon
          icon="ep:arrow-up"
          width="26"
          height="26"
          :rotate="3"
          color="black"
        />
        </span>
        <h1 class="text-[#6b6b6b]">游客登录</h1>
      </div>
      <div class="flex justify-center items-center h-[30vw]">
        <img
          src="static/logo.fill.svg"
          alt="Image"
          class="my-auto w-[38vw] h-[7.4vw]"
        />
      </div>
      <!-- 原来的 -->
      <div v-if="state=== 801" class="relative flex justify-center items-center flex-col h-full">
        <img :src="qrcode" alt="Image" class="my-auto w-[40vw] h-[40vw]" />
        <p class="mt-[10vw] text-[4vw] text-[black]">
            使用&nbsp;&nbsp;<a href="#" class="text-[#1f6fbf]"
            >网易云音乐APP&nbsp;&nbsp;</a
            >扫码登录
        </p>
     </div>
      <!-- 出现蒙版的 -->
    <div v-else-if="state=== 800" class="relative flex justify-center items-center flex-col h-full">
        <img :src="qrcode" alt="Image" class="my-auto w-[40vw] h-[40vw]" />
        <div class="absolute flex-col w-[40vw] h-[40vw] bg-[#fff] bg-opacity-80  top-0 flex justify-center items-center">
            <div
                @click="fn"
                class="bg-[#f7372a] rounded-[7vw] absolute px-[4vw] py-[2.39vw] text-[#fff] text-[3vw] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
            >
                点击刷新
            </div>
        </div>
        <p class="mt-[10vw] text-[4vw] text-[black]">
            使用&nbsp;&nbsp;<a href="#" class="text-[#1f6fbf]"
            >网易云音乐APP&nbsp;&nbsp;</a
            >扫码登录
        </p>
    </div>
      <!-- 登录成功的 -->
      <div v-else-if="state === 802"  class="flex justify-center items-center flex-col h-full">
        <div class="relative">
            <div  class="text-[black] text-center">
                <img src="static/login_sucess.png" class="w-[40vw] h-[40vw]" />
                <p class="text-center mt-[4vw] text-[4.53vw]">扫描成功</p>
                <p class="mt-[5vw] text-[3.76vw]">请在手机上确认登录</p>
            </div> 
        </div>
      </div>
    </div>
    <div class="fixed bottom-0">
      <img src="static/bg-login.png" class="w-[100%]" />
    </div>
  </div>
</template>

<script>
import { getQrKey, getQrInfo, checkQrStatus,getUserAccount,getUserDetail } from '@/request';
// import {getUserAccount,} from '@/request'
import store from 'storejs';
export default {
  name: 'Login',
  data() {
    return {
      qrcode: '',
      state: null,
    };
  },
  methods: {
    HomeView() {
      this.$router.push('/HomeView');
    },
    pollingCheck(key, interval = 1000) {
      const timer = setInterval(async () => {
        const res = await checkQrStatus(key);
        // console.log(res)
        this.state = res.data.code;
        console.log(this.state);
        if (res.data.code === 800) {
          // alert('此二维码已过期，请刷新后重试');
          clearInterval(timer);
        } else if (res.data.code === 803) {
          clearInterval(timer);
          store.set('__m__cookie', res.data.cookie);
          const res1 = await getUserAccount();
          const detail = await getUserDetail()
          this.$router.push('/HomeView');
        //   console.log(res1,detail);
        }
      }, interval);
      //自己监听自己的生命周期 当走到要销毁前的时候清除定时器
      this.$on('hook:beforeDestroy', () => clearInterval(timer));
    },
    async fn(){
      const res = await getQrKey().catch(err=>{console.log(err);})
      const qrinfo = await getQrInfo(res.data.data.unikey).catch(err=>{console.log(err);})
      this.qrcode = qrinfo.data.data.qrimg;
      this.pollingCheck(res.data.data.unikey);
    },
  },
  async created() {
    const res = await getQrKey().catch((err) => {
      console.log(err);
    });
    const qrInfo = await getQrInfo(res.data.data.unikey).catch((err) =>
      console.log(err)
    );
    // console.log(res.data.data.unikey) //af0dc446-cb52-4a9f-b511-2b162ca8e6b8
    // console.log(qrInfo.data.data.qrimg)

    this.qrcode = qrInfo.data.data.qrimg;
    this.pollingCheck(res.data.data.unikey);
  },
};
</script>
<style>
body {
  background-color: #fcfcfe;
}
img {
  max-width: none;
}
</style>
