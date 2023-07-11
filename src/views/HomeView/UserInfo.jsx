import styled from 'styled-components-vue';
import { getUserAccount, getUserDetail, fetchPlaylist } from '@/request';
import { areaList } from '@vant/area-data';
import store from 'storejs';
const Wrapper = styled.div`
  .w {
    width: 92vw;
    border-radius: 5vw;
  }
  .t {
    font-size: 1vw;
  }
`;
export default {
  render() {
    return (
      <Wrapper>
        {/* <div onClick={() => this.index++}>
                {this.index % 2 === 0 ? <div>偶数</div> : <h1>奇数</h1>}
                <input type="text" value={this.value} onInput={(e) => (this.value = e)} />
                </div> */}
        <div class={this.switchCheckStatus ? 'dark' : ''}>
          <div class="text-[#fff] bg-[#1a1c23] dark:bg-[#f5f5f8]">
            <img src={this.info?.backgroundUrl} class="w-screen h-[67.33vw]" />
            <div class="w-[100%] flex justify-between items-center  text-[6vw] fixed top-0 px-[4vw] py-[3vw] z-[99]">
              <router-link to="/HomeView">
                <Icon
                  icon="material-symbols:navigate-before"
                  class="text-[8vw]"
                />
              </router-link>
              <Icon icon="uil:ellipsis-v" />
            </div>
            <section class=" relative flex flex-col items-center justify-center">
              <div class="w bg-[#303239] dark:bg-[#fdfdfd] h-[46.8vw] m-auto absolute top-[-3.45vw]">
                <img
                  src={this.info?.avatarUrl}
                  class="w-[19vw] rounded-[50%] absolute top-[-8vw] left-[38%]"
                />
                <div class="w-[64vw] h-[32vw] left-[15%] dark:text-[#000]  absolute top-[31%] text-center">
                  <p>{this.info?.nickname}</p>
                  {/* 关注粉丝等级 */}
                  <p class="text-[#707279] dark:text-[#9e9e9e] pt-[1.5vw]">
                    <span class="mr-[2vw]">
                      {this.details?.profile?.follows}关注
                    </span>
                    <span class="mr-[2vw]">
                      {this.details?.profile?.followeds}粉丝
                    </span>
                    <span>Lv.{this.details?.level}</span>
                  </p>
                  {/* IP地址 */}
                  <div class="flex justify-center text-[3vw] ">
                    <p class="px-[1.5vw] py-[1vw] border-[0.2vw] border-solid rounded-[3vw] border-[#75777e] dark:border-[#d7d7d7] mr-[2vw]">
                      IP:
                      {areaList.province_list[
                        this.details?.profile?.province
                      ].slice(0, 2)}
                    </p>
                    <p class="px-[1.5vw] py-[1vw] border-[0.2vw] border-solid rounded-[3vw] border-[#75777e] dark:border-[#d7d7d7] mr-[2vw]">
                      {areaList.province_list[
                        this.details.profile?.province
                      ].slice(0, 2)}{' '}
                      {areaList.city_list[this.details.profile?.city].slice(
                        0,
                        2
                      )}
                    </p>
                    <p class="px-[1.5vw] py-[1vw] border-[0.2vw] border-solid rounded-[3vw] border-[#75777e] dark:border-[#d7d7d7]">
                      村龄 {Math.floor(this.details.createDays / 365)} 年
                    </p>
                  </div>
                  {/* 编辑资料 */}
                  <div class="flex justify-center text-[3vw] mt-[2vw]">
                    <router-link to="/miFile">
                      <p class="px-[2vw] py-[1vw] border-[0.2vw] border-solid rounded-[5vw] border-[#75777e] dark:border-[#d7d7d7] mr-[2vw]">
                        编辑资料
                      </p>
                    </router-link>

                    <span class="flex items-center justify-center w-[7vw] h-[7vw] border-[0.2vw] border-solid rounded-[50%] border-[#75777e] dark:border-[#d7d7d7]">
                      <Icon
                        icon="ep:arrow-up"
                        verticalFlip="true"
                        class="text-[5vw]"
                      />
                    </span>
                  </div>
                </div>
              </div>
              {/* 主页 */}
              <p class=" w-[83vw] mt-[48vw] text-[#92939a] dark:text-[#8e8f9a] flex justify-around  mb-[3vw]">
                <span class="text-white dark:text-[#343741] ">主页</span>
                <span>动态</span>
                <span>播客</span>
              </p>
              <div class="h-[50vw] w bg-[#303239] dark:text-[#000] dark:bg-[#fdfdfd]">
                <p class="p-[4vw] ">音乐品味</p>
                <ul class="flex justify-around">
                  <li class="flex flex-col justify-between w-[25vw] h-[27vw] border-[0.2vw] rounded-[5vw] border-[#56585f] dark:border-[#f2e9e7] p-[2vw] bg-[#2a2d36] dark:bg-[#fdf2f1] ">
                    <div class="flex flex-col">
                      <p class="t text-[#b1b3ba] dark:text-[#8d8786]">
                        我的喜欢
                      </p>
                      <p class="weight">{this.trackCount}首</p>
                    </div>
                    <div class="flex items-center">
                      <Icon
                        icon="icon-park-solid:like"
                        class="text-[#b1b3ba] dark:text-[#aba5a8]"
                      />
                      <span class="t text-[#b1b3ba] dark:text-[#8d8786]">
                        喜欢的音乐
                      </span>
                    </div>
                  </li>
                  <li class="flex flex-col justify-between w-[25vw] h-[27vw] border-[0.2vw] rounded-[5vw] border-[#56585f] dark:border-[#f4eedd]  p-[2vw] bg-[#2a2d36] dark:bg-[#fdf7e6]">
                    <div class="flex flex-col">
                      <p class="t text-[#b1b3ba] dark:text-[#8d8786]">
                        累计听歌
                      </p>
                      <p class="weight">{this.details?.listenSongs}首</p>
                    </div>
                    <div class="flex items-center">
                      <Icon
                        icon="ic:outline-bar-chart"
                        class="text-#b1b3ba dark:text-[#aba5a8]"
                      />
                      <span class="t text-[#b1b3ba] dark:text-[#8d8786]">
                        听歌排行
                      </span>
                    </div>
                  </li>
                  <li class="flex flex-col justify-between w-[25vw] h-[27vw] border-[0.2vw] rounded-[5vw] border-[#56585f] dark:border-[#e6edf3] p-[2vw] bg-[#2a2d36] dark:bg-[#eff6fb]">
                    <div class="flex flex-col">
                      <p class="t text-[#b1b3ba] dark:text-[#8d8786]">
                        本周关键词
                      </p>
                      <p class="weight text-[3.5vw]">每一首歌都心动</p>
                    </div>
                    <div class="flex items-center">
                      <Icon
                        icon="solar:hourglass-bold"
                        class="text-#b1b3ba dark:text-[#aba5a8]"
                      />
                      <span class="t text-[#b1b3ba] dark:text-[#8d8786]">
                        黑胶时光机
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              {/* 创建的歌单 */}
              <div class="w bg-[#303239] dark:bg-[#fdfdfd] mt-[5vw] dark:text-[#000]">
                <div class="flex items-end ml-[3vw] mt-[2vw] ">
                  <p>创建的歌单</p>
                  <span class="t">({this.create.length}个,被收藏1次)</span>
                </div>
                <ul class="mt-[2vw] pl-[2vw ml-[3vw]">
                  {this.create.map((item, index) => (
                    <li key={index} class="w-[85vw] h-[14vw] flex mb-[2vw] ]">
                      <img
                        src={item.coverImgUrl}
                        class="w-[13vw] rounded-[3vw] "
                      />
                      <div class="flex flex-col ml-[3vw]">
                        <p>{item.name}</p>
                        <p>
                          <span class="t text-[#b1b3ba] dark:text-[#8d8786]">
                            {item.trackCount}首
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 收藏的歌单 */}
              <div class="w bg-[#303239] dark:bg-[#fdfdfd] mt-[5vw] dark:text-[#000]">
                <div class="flex items-end">
                  <p class="flex items-end ml-[3vw] mt-[2vw]">收藏的歌单</p>
                  <span class="t text-[#b1b3ba] dark:text-[#8d8786]">
                    ({this.songList?.length})
                  </span>
                </div>
                <ul class="mt-[2vw] pl-[2vw ml-[3vw]">
                  {this.songList.map((item, index) => (
                    <li key={index} class="w-[85vw] h-[14vw] flex mb-[2vw] ]">
                      <img
                        src={item.coverImgUrl}
                        class="w-[13vw] rounded-[3vw] "
                      />
                      <div class="flex flex-col ml-[3vw]">
                        <p class="w-[60vw] truncate">{item.name}</p>
                        <p>
                          <span class="t text-[#b1b3ba] dark:text-[#8d8786]">
                            {item?.trackCount}首,By {item.creator?.nickname},播放
                            {this.wan(item.playCount)}次
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 我的评论 */}
              <div class="w bg-[#303239] dark:bg-[#fdfdfd] mt-[5vw] dark:text-[#000]">
                {/* 我的评论头部 */}
                <div class="flex w-[88vw] justify-between items-center">
                  <div class="flex items-end">
                    <p class="flex items-end ml-[3vw] mt-[2vw]">我的评论</p>
                    <span class="t text-[#b1b3ba] dark:text-[#8d8786]">({this.commentsHistory?.commentCount})</span>
                  </div>
                  <Icon
                    icon="uis:lock"
                    class="text-[5vw] text-[#9fa1a8] dark:text-[#b3b3b3]"
                  />
                </div>
                <div class="flex flex-col pl-[3vw] py-[2vw] border-b-[0.1vw] border-solid border-[#75777e]">
                  <div class="flex items-center justify-between w-[85vw]">
                    <div class="flex items-center">
                      <img
                        src={
                          JSON.parse(this.commentMusic?.resourceInfo)
                            ?.coverImgUrl
                        }
                        class="rounded-[3vw] w-[11vw]"
                      />
                      <p class="t ml-[2vw]">
                        {JSON.parse(this.commentMusic.resourceInfo)?.name}
                      </p>
                    </div>
                    <Icon
                      icon="icon-park-outline:good-two"
                      class=" text-[#9fa1a8] dark:text-[#b3b3b3]"
                    />
                  </div>
                  <div>
                    <p class="leading-[9vw]">{this.commentMusic?.content}</p>
                    <p class="t">{this.$t(1633844377952)}</p>
                  </div>
                </div>
                <p class="t text-[#b1b3ba] dark:text-[#8d8786] flex items-center justify-center leading-[8vw]">
                  <span class="mr-[1vw]">查看全部</span>
                  <Icon icon="ep:arrow-up" rotate={1} class="text-[4vw]" />
                </p>
              </div>

              {/* 基本信息 */}
              <div class="w bg-[#303239] dark:bg-[#fdfdfd] mt-[5vw] mb-[16vw] dark:text-[#000]">
                {/* 基本信息头部 */}
                <div class="w-[89vw] pt-[2vw] flex justify-between items-center">
                  <p class="flex items-end ml-[3vw] mt-[2vw]">基本信息</p>
                  <div>
                    <p class="flex items-center px-[1vw]  border-[0.2vw] border-solid rounded-[5vw] border-[#75777e] mr-[2vw]">
                      <Icon icon="ph:user" />
                      村民证
                    </p>
                  </div>
                </div>
                <div class="flex flex-col pl-[3vw] py-[2vw] border-b-[0.1vw] border-solid border-[#75777e]">
                  <p class="t text-[#b1b3ba] dark:text-[#8d8786] leading-[7vw]">
                    村龄:{Math.floor(this.details?.createDays / 365)}年
                    {this.getRegistrationDate(this.details?.createDays)}
                  </p>
                  <p class="t text-[#b1b3ba] dark:text-[#8d8786] leading-[7vw]">性别:{this.isGender(this.sex)}</p>
                  <p class="t text-[#b1b3ba] dark:text-[#8d8786] leading-[7vw]">
                    地区:
                    {areaList.province_list[
                      this.details?.profile?.province
                    ].slice(0, 2)}{' '}
                    {areaList.city_list[this.details.profile?.city].slice(0, 2)}
                  </p>
                </div>
                <p class="t flex items-center justify-center leading-[8vw]">
                  <span class="mr-[1vw]">查看全部</span>
                  <Icon icon="ep:arrow-up" rotate={1} class="text-[4vw]" />
                </p>
              </div>
            </section>
          </div>
        </div>
      </Wrapper>
    );
  },
  data() {
    return {
      msg: 'hello,jsx',
      index: 0,
      info: [],
      details: [],
      songList: [],
      create: [],
      sex: null,
      areaList,
      commentsHistory: [],
      commentMusic: '',
      switchCheckStatus: null,
    };
  },
  async created() {
    this.switchCheckStatus = store.get('switch');
    console.log(this.switchCheckStatus);
    const myInfo = await getUserAccount();
    const detail = await getUserDetail(myInfo.data.profile.userId);
    this.info = myInfo.data.profile;
    this.details = detail.data;
    // console.log(this.details);
    // console.log(this.details.profile);
    // console.log(areaList)
    const res4 = await fetchPlaylist(detail.data.profile.userId);
    // console.log(res4);
    this.songList = res4.data.playlist //截取的收藏的歌单
      .filter((item) => item.subscribed)
      .slice(0, 10);
    this.create = res4.data.playlist //创建的所有歌单 截取两个
      .filter((item) => !item.subscribed)
      .slice(1, 3);
    this.trackCount = res4.data.playlist[0].trackCount; //我的喜欢
    //性别
    this.sex = detail.data.profile.gender;
    // console.log('收藏的歌单', this.songList);
    // console.log('创建的歌单', this.create);
    // console.log('我的喜欢',this.trackCount)
    // console.log(areaList)
    const comments = store.get('comment');
    // const comments = await fetchUserComment()
    this.commentsHistory = comments.data.data;
    this.commentMusic = this.commentsHistory.comments[0]; //获取最新一条评论
    // console.log('歌曲信息',JSON.parse(this.commentMusic.resourceInfo))//获取评论的歌曲名
    // console.log('评论信息',this.commentMusic.content)
  },
  methods: {
    wan(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + '亿';
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + '万';
      }
    },
    getRegistrationDate(totalDays) {
      const currentDate = new Date();
      const registrationDate = new Date(
        currentDate.getTime() - totalDays * 24 * 60 * 60 * 1000
      ); // 计算注册日期

      const year = registrationDate.getFullYear(); // 获取年份
      const month = registrationDate.getMonth() + 1; // 获取月份

      return `(${year}年${month}月注册)`;
    },
    isGender(sex) {
      return sex === 1 ? '男' : '女';
    },
  },
};
