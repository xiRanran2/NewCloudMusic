<template>
    <div class="bg-[#444] text-[white] h-[400vw]">
        <header class="w-[90vw] ml-[3vw] flex justify-between items-center pt-[4vw] text-[6vw]">
            <span @click="HomeView">
                <Icon
                icon="material-symbols:navigate-before"
                color="white"
                class="text-[8vw]"
                />
            </span>
            <span>歌单</span>
            <div class="flex ">
            <Icon
                icon="carbon:search"
                class="mr-[4vw]"
            />
            <Icon icon="uil:ellipsis-v" color="white" />
            </div>
        </header>
        <!-- 歌曲类型 -->
        <div class="flex mt-[5vw] ml-[5vw]">
            <!-- 照片 -->
            <div class="relative w-[28vw] h-[28vw]">
                <div class="text-white flex items-center absolute top-[1vw] right-[1vw]">
                    <Icon icon="ion:play" color="white" class="text-[3vw]" />
                    <span>{{
                      songlist.playCount > 10000
                        ? Math.floor(
                            songlist.playCount / 10000
                          ) + '万'
                        : songlist.playCount
                    }}</span>
                </div>
                <img :src="songlist.coverImgUrl" class="w-[28vw] rounded-[4vw]">
            </div>
            <!-- 用户信息 -->
            <div class="flex flex-col m-[3vw] mt-[0vw]">
                <!-- 标题 -->
                <div class="flex w-[57vw] justify-between">
                    <p class="font-extrabold"> {{ songlist.name}}</p>
                    <span class="w-[5vw] h-[4vw] bg-[#626262] rounded-[50%] flex items-center mt-[1vw]">
                        <Icon icon="ep:arrow-up" :rotate="2" />
                    </span>
                </div>
                <!-- 用户头像 网名 -->
                <div class=" flex items-center mt-[2vw]">
                    <img :src="songlist.creator.backgroundUrl" class="rounded-[50%] w-[10vw]">
                    <p class="ml-[1.5vw]"> {{ songlist.creator.nickname }}</p>
                    <div class="p-[1.5vw] pr-[2vw] ml-[2vw] flex items-center bg-[#626262] text-center rounded-[7vw]">
                        <Icon icon="material-symbols:add" />
                        <span class="text-[1vw]">关注</span>
                    </div>
                </div>
                <!-- 标签 -->
                <div class="flex">
                    <p v-for="item in Tag" :key="item.id" class="flex items-center text-[1vw]  mt-[1vw] mr-[2vw] bg-[#787878] p-[0.5vw] rounded-[2vw]">
                        <span>{{item}}</span>
                        <Icon icon="ep:arrow-right" color="white" class="text-[3vw]"/>
                    </p>
                </div>
            </div>
        </div>
        <!-- 评论描述 -->
        <div class="text-[#bebebe] flex m-auto items-center ml-[5vw] mt-[3vw]">
            <p class="overflow-auto w-[80vw] h-[5vw] text-[1vw]"> {{songlist.description  }}</p>
            <Icon icon="ep:arrow-up" :rotate="1" class="text-[4vw]" />
        </div>
        <!-- 评论三条数据 -->
        <div class="flex  w-[89vw] justify-between m-auto mt-[3vw]">
            <div class="flex items-center justify-center w-[25vw] rounded-[5vw] h-[10vw] bg-[#787878]">
                <Icon icon="majesticons:share" color="white"  class="text-[6vw]"/>
                <span class="text-[4vw] m-[1vw] mt-[2vw]">{{ songlist.shareCount}}</span>
            </div>
            <div class="flex items-center justify-center w-[25vw] rounded-[5vw] h-[10vw]  bg-[#787878]">
                <Icon icon="ant-design:message-filled" color="white"  class="text-[6vw]"/>
                <span  class="text-[4vw] m-[1vw] mt-[2vw]"> {{ songlist.trackCount}}</span>
            </div>
            <div class="flex items-center justify-center w-[25vw] rounded-[5vw] h-[10vw] bg-[#ff3b38]">
                <Icon icon="fluent:collections-20-filled" color="white"  class="text-[6vw]"/>
                <span  class="text-[4vw] m-[1vw] mt-[2vw]"> {{ songlist.subscribedCount}}</span>
            </div>
        </div>

        <!-- 播放列表 -->
        <div class="w-[89vw] bg-[#636363] rounded-[4vw] h-[200vw] m-auto mt-[4vw]">
            <div class="flex items-center h-[14vw] leading-[14vw] w-[86vw] m-auto justify-between">
                <div class="flex items-center">
                    <span class="inline-block w-[6vw] h-[6vw] bg-[red] rounded-[50%] relative">
                        <Icon icon="ri:play-fill" color="white" class="absolute top-[1vw] left-[1vw]"/>
                    </span>
                    <span>播放全部</span>
                    <span class="text-[1vw]">({{  }})</span>
                </div>
                <div class="text-[6vw] flex">
                    <Icon icon="formkit:downloadcloud" color="white" class="mr-[4vw]"/>
                    <Icon icon="solar:list-down-outline" color="white" />
                </div>
            </div>
        </div>
    </div>
    
</template>
 
<script>
    import {songDetails,playlistTracks} from '../../request/index.js'
    export default {
        data(){
            return {
                songlist:{},
                // creator:{},  //创作者 图片 creater.backgroundUrl  用户名 creater.nickname
                Tag:[],
            };
        },
        created(){
            // console.log(this.$route)
            songDetails(this.$route.query.id).then((res) => {
                // this.songlist = res.data.playlist
                // this.Tag = this.songlist.tags
                // console.log(this.Tag)
                let songlist = res.data.playlist
                console.log(songlist);
            })
            playlistTracks(this.$route.query.id).then((res) => {
                console.log(res)
            })
        },
        methods:{
            HomeView() {
                this.$router.push('/HomeView');
            },
        }
    }
</script>