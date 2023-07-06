<template>
    <div class=" h-screen">
        <div class="w">
            <div class="flex justify-between pt-[6vw]">
                <Icon icon="ep:arrow-up" width="26" height="26" :rotate="3" />
                <h1 class="text-[#6b6b6b]">游客登录</h1>
            </div>
            <div class="flex justify-center items-center  h-[30vw]">
                <img src="static/logo.fill.svg" alt="Image" class="my-auto w-[38vw] h-[7.4vw]">
            </div>
            <div class="flex justify-center items-center flex-col h-full">
                <div class=" relative">
                    <img :src="qrcode" alt="Image" class="my-auto w-[40vw] h-[40vw]">
                    <div class="w-[40vw] h-[40vw] bg-[#fff] bg-opacity-80 absolute top-0 flex justify-center items-center">
                        <div class="bg-[#f7372a] rounded-[7vw] px-[4vw] py-[2.39vw] text-[#fff] text-[3vw] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                            点击刷新
                        </div>
                    </div>
                </div>
                <p class="mt-[10vw] text-[4vw]">使用&nbsp;&nbsp;<a href="#" class="text-[#1f6fbf]">网易云音乐APP&nbsp;&nbsp;</a>扫码登录</p>
            </div>
        </div>
        <div class=" fixed  bottom-0">
            <img  src="static/bg-login.png" alt="">
        </div>
    </div>
</template>

<script>
    import  {getQrKey,getQrInfo,checkQrStatus} from '@/request' 
    import store from 'storejs';
    export default {
        name:'Login',
        data(){
            return {
                qrcode:'',
            }
        },
        methods:{
            // pollingCheck(key,interval=1000){
            //     const timer = setInterval(async() => {
            //         const res = await checkQrStatus(key);
            //         console.log(res)
            //         if(res.data.code === 800){
            //             alert('此二维码已过期，请刷新后重试');
            //             clearInterval(timer)
            //         }
            //         else if(res.data.code === 803){
            //             clearInterval(timer)
            //             // console.log(res.data.cookie)
            //             store.set('__m__cookie',res.data.cookie)
            //             // store.get('__m__cookie')
            //         }
            //     },interval);
            //     //自己监听自己的生命周期 当走到要销毁前的时候清除定时器
            //     this.$on('hook:beforeDestroy',() => clearInterval(timer))
            // }
        },
        async created(){
            const res = await getQrKey().catch((err) => {
                console.log(err)
            });
            const qrInfo = await getQrInfo(res.data.data.unikey).catch((err) => 
                console.log(err)
            )
            console.log(res.data.data.unikey) //af0dc446-cb52-4a9f-b511-2b162ca8e6b8
            // console.log(qrInfo.data.data.qrimg)
            
            this.qrcode = qrInfo.data.data.qrimg
            this.pollingCheck(res.data.data.unikey)
        },
    }
</script>
<style>
    body {
        background-color:#fefefe;
    }

    .w {
        width: 88vw;
        margin:auto;
    }
    img{
        max-width: none;
    }
</style>