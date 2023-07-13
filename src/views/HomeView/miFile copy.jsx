import { areaList } from '@vant/area-data';
import store from 'storejs';
import styled from 'styled-components-vue';
import Vue from 'vue';
import { DatetimePicker, Picker } from 'vant';
import { mapState, mapMutations } from '@/vuex';
import _ from 'lodash';

import { updateInfo, getNickname, getUserAccount } from '@/request';
// import { parse } from '@babel/core';
Vue.use(DatetimePicker).use(Picker);
// import dayjs from 'dayjs'
// import RelativeTime from 'dayjs/plugin/relativeTime'
// import 'dayjs/locale/zh-cn'
// dayjs.extend(RelativeTime)
// dayjs.locale('zh-cn')

// console.log(dayjs(1688733891207).fromNow().replace('',''))
const Wrapper = styled.div`
  .van-popup--center {
    width: 100%;
    top: 87%;
  }
  .van-picker__confirm {
    color: red;
  }
  .list {
    padding-left: 7.46vw;
  }
  .list li {
    width: 88vw;
    height: 13.14vw;
    line-height: 13.14vw;
    display: flex;
    justify-content: space-between;
  }
  div > .list > .t {
    height: 15.36vw;
    line-height: 15.36vw;
  }
  .list li > p {
    font-size: 3.73vw;
  }
  .list li span {
    margin-right: 2.84vw;
    color: #7b7982;
    font-size: 2.82vw;
  }
  router-link > Icon {
    color: #a8aab1;
    font-size: 7vw;
  }
  .hid {
    display: none;
  }
`;

export default {
  render() {
    return (
      <Wrapper>
        <div class={this.switchCheckStatus ? 'dark' : ''}>
          <div class="w-screen h-screen bg-[#131218] dark:bg-[#e9ecee]">
            <div class="text-[white] dark:text-[#3e3045]">
              {/* 头部 */}
              <div class="w-[100%] bg-[#131218] dark:bg-[#f6f9fb] flex  items-center  text-[6vw] fixed top-0 px-[4vw] py-[3vw] pb-[2vw] z-[99]">
                <router-link to="/UserInfo">
                  <Icon
                    icon="material-symbols:navigate-before"
                    class="text-[8vw]"
                  />
                </router-link>
                <p class="ml-[30vw]">我的资料</p>
              </div>
              {/* 头像  昵称  性别  二维码*/}
              <ul class="mt-[13vw] list  bg-[#191b22] dark:bg-[#f0f3f5]">
                <li class="t  border-b-[#303239] border-b-[0.09vw] dark:border-b-[#d9dcde]">
                  <p>头像</p>
                  <div class="flex items-center">
                    <img
                      src={this.details?.avatarUrl}
                      class="w-[13.06vw] rounded-[50%] mr-[2.84vw]"
                    />
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                </li>
                <li onClick={this.nickShow} class=" border-b-[#303239] border-b-[0.09vw] dark:border-b-[#d9dcde]">
                  <p>昵称</p>
                  <div class="flex items-center">
                    <span>{this.details?.nickname}</span>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                </li>
                <li
                  class=" border-b-[#303239] border-b-[0.09vw] dark:border-b-[#d9dcde]"
                  onClick={this.sexualApear}
                >
                  <p>性别</p>
                  <div class="flex items-center">
                    <span>{this.gender == 1 ? '男' : this.gender == 0 ? '保密' : '女'}</span>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                </li>
                <li class="border-b-none">
                  <p>二维码</p>
                  <div class="flex items-center">
                    <Icon icon="ph:qr-code-bold" class="mr-[2.84vw]" />
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                </li>
              </ul>

              {/* 生日 地区 大学 音乐标签 简介  */}
              <ul class="mt-[2.13vw] list bg-[#191b22] dark:bg-[#f0f3f5]">
                <li
                  onClick={this.dateAppear}
                  class=" border-b-[#303239] border-b-[0.09vw] dark:border-b-[#d9dcde]"
                >
                  <p>生日</p>
                  <div class="flex items-center">
                    {/* <span>输入生日信息</span> */}
                    <span>
                      {new Date(this.details.birthday).getFullYear()}-
                      {new Date(this.details.birthday).getMonth() + 1}-
                      {new Date(this.details.birthday).getDate()}
                    </span>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                </li>
                <li
                  onClick={this.appear}
                  class=" border-b-[#303239] border-b-[0.09vw] dark:border-b-[#d9dcde]"
                >
                  <p>地区</p>
                  <div class="flex items-center">
                    {/* <span v-if="this.city === ''" class="hid">{areaList.province_list[this.details.province].slice(0,2)} {areaList.city_list[this.details.city].slice(0,2)}</span> */}
                    <span class="city">{this.city}</span>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                </li>
                <li class=" border-b-[#303239] border-b-[0.09vw] dark:border-b-[#d9dcde]">
                  <p>大学</p>
                  <router-link to="/UserInfo" class="flex items-center">
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </router-link>
                </li>
                <li class=" border-b-[#303239] border-b-[0.09vw] dark:border-b-[#d9dcde]">
                  <p>音乐标签</p>
                  <router-link to="/UserInfo" class="flex items-center">
                    <span>选择标签</span>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </router-link>
                </li>
                <li class=" border-b-[#303239] border-b-[0.09vw] dark:border-b-[#d9dcde]">
                  <p>简介</p>
                </li>
                <div class="w-[88vw] h-[33.04vw]  relative">
                  <textarea
                    class=" border-none bg-[#191b22] dark:bg-[#f0f3f5] w-[88vw] h-[33.04vw]"
                    placeholder="请输入个人介绍..."
                  ></textarea>
                  <span class="absolute bottom-[1vw] right-[2vw]  text-[2.66vw] z-[1]">
                    300
                  </span>
                </div>
              </ul>

              {/* 个人隐私设置  主页模块设置*/}
              <ul class="mt-[2.13vw] list bg-[#191b22] dark:bg-[#f0f3f5] pb-[4vw]">
                <li class=" border-b-[#303239] border-b-[0.09vw] dark:border-b-[#d9dcde]">
                  <p>个人隐私设置</p>
                  <router-link to="/UserInfo" class="flex items-center">
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </router-link>
                </li>
                <li class=" border-b-[#303239] border-b-[0.09vw] dark:border-b-[#d9dcde]">
                  <p>主页模块顺序设置</p>
                  <router-link to="/UserInfo" class="flex items-center">
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </router-link>
                </li>
                <li>
                  <p>账号与绑定设置</p>
                  <router-link to="/UserInfo" class="flex items-center">
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </router-link>
                </li>
              </ul>
            </div>

            {/* 修改昵称弹出层 */}
            <van-popup class="  " v-model={this.nickshow} position="bottom">
              <div class="w-screen h-screen bg-[#09090c] text-[white] dark:bg-[#e9ecee] dark:text-[#000]">
                <div class="w-[100%] h-[14vw] bg-[#0d0d10] dark:bg-[#fff] flex justify-between  items-center  text-[5vw]  px-[4vw] py-[5vw] pb-[2vw] z-[99]">
                  <span onClick={this.closenameshow}>取消</span>
                  <span class="font-[600]">修改完成</span>
                  <span onClick={this.setnickname}>完成</span>
                </div>
                <div class="w-[100%] px-[3vw]  bg-[#0d0d10] dark:bg-[#fff] h-[10vw] mt-[2vw]">
                <input
                  v-model={this.nickname}
                  class="box-border pl-[4vw] h-[100%] caret-blue-600 bg-white w-[100%]"
                  type="text"
                  value={this?.details?.nickname}
                  placeholder="请输入昵称"
                />
                </div>
              </div>
            </van-popup>
            {/* 性别 */}
            <van-popup
              v-model={this.sexualVisible}
              position="bottom"
              class="flex h-[30vh] flex-col"
            >
              <van-picker
                show-toolbar
                confirm-button-text="完成"
                columns={this.columns}
                onConfirm={this.sexualConfirm}
              />
            </van-popup>
            {/* 出生年月日 */}
            <van-popup v-model={this.dataVisible}>
              <van-datetime-picker
                type="date"
                confirm-button-text="完成"
                formatter={this.formatter}
                onConfirm={this.confirmDatePicker}
                minDate={this.minDate}
                maxDate={this.maxDate}
              />
            </van-popup>
            {/* 地区 */}
            <van-popup
              v-model={this.popupVisible}
              position="bottom"
              style={{ height: '40%' }}
            >
              <van-area
                columns-num="2"
                confirm-button-text="完成"
                // cancel={this.hideDatePicker}
                area-list={areaList}
                onConfirm={this.confirm}
              />
            </van-popup>
          </div>
        </div>
      </Wrapper>
    );
  },
  data() {
    return {
      popupVisible: false,
      details: [],
      areaList: '',
      city: '',
      time: '',
      address: '',
      birthDay: '',
      nickshow:false,
      dataVisible: false,
      sexualVisible: false,
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(3000, 10, 1),
      columns: ['男', '女'],
      switchCheckStatus: null,
      sexual: '',
      sex: null,
    };
  },
  async created() {
    this.switchCheckStatus = store.get('switch');
    const Mydetail = store.get('msg');
    this.details = Mydetail.data.profile;
    console.log(Mydetail); //获取用户个人信息
    if(Mydetail){
      let details = {};
      if (typeof store.get('msg') == 'object') {
        details = store.get('msg');
      } else {
        details = JSON.parse(store.get('msg'));
      }
      this.$store.state.details = details;
    }
  },
  methods: {
    myMethod(){
      this.$store.commit('updateDetails', details);  //调用 mutation方法
    },
    setnickname() {
      // console.log(this.nickname)
      if (this.nickname) {
        this.updateInfo({
          nickname: this.nickname,
        });
        this.nickshow = false;
      }
    },
    nickShow(){this.nickshow = true},
    updateInfomation(obj) {
      let localuserInfo = JSON.parse(localStorage.getItem('msg'));
      console.log(localuserInfo);
      let oldInfo = {
        gender: localuserInfo.gender || '',
        birthday: localuserInfo.birthday || '',
        nickname: localuserInfo.nickname || '',
        province: localuserInfo.province || '',
        city: localuserInfo.city || '',
        signature: localuserInfo.signature || '',
      };
      UpdateInfo(Object.assign(oldInfo, obj))
        .then((res) => {
          getUserAccount()
            .then((res) => {
              // this.$root.$options.store.state.details = res.data.profile;
              console.log(res.data.profile)
              // localStorage.setItem('profile', JSON.stringify(res.data.profile));
            })
            .catch((err) => console.log(err));
          console.log('更新成功');
        })
        .then((err) => {
          alert('更新失败');
        });
      
    },
    confirm(res) {
      // this.city = e[0].name.slice(0, 2)+ '  ' + e[1].name.slice(0, 2);
      this.updateInfomation({
        province: Number(res[0].code),
        city: Number(res[1].code),
      });
      this.popupVisible = false;
    },
    appear() {
      this.popupVisible = true;
    },
    dateAppear() {
      this.dataVisible = true;
    },
    hideDatePicker() {
      this.dataVisible = false;
    },
    closenameshow() {
      this.nickshow = false;
    },
    confirmDatePicker(e) {
      this.dataVisible = false;
      console.log(e); //Sun Feb 02 2014 00:00:00 GMT+0800 (中国标准时间)
      // this.city = (e[0].name).slice(0,2) +  (e[1].name).slice(0,2)
      const date = new Date(e);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      // const minDate = null; // 设置最小日期
      // const maxDate = null; // 设置最大日期
      this.time = `${year}年${month}月${day}日`;
      store.set('SelfTime', this.time);
    },
    formatter(type, val) {
      if (type === 'year') {
        return val + '年';
      }
      if (type === 'month') {
        return val + '月';
      }
      if (type === 'day') {
        return val + '日';
      }
      return val;
    },
    sexualApear() {
      this.sexualVisible = true;
    },
    sexualConfirm(e) {
      console.log(e);
      this.sexualVisible = false;
      this.updateInfomation({
        gender: e == '男' ? 1 : 2,
      });
    },
    // ...mapMutations(['toggleshow']),
    
  },
  computed: {
    ...mapState(['details', 'show']),
  },
  watch: {
    nickname(newValue) {
      if (!this.debouncedFunc) {
        this.debouncedFunc = _.debounce(async () => {
          try {
            const res = await getNickname(this.nickname);
            console.log(res.data);
            if (res.data?.duplicated) {
              this.$refs.nametitle.innerHTML = '昵称已被注册，请换一个';
            } else if (res.data?.message) {
              this.$refs.nametitle.innerHTML = res.data?.message;
            } else if (res.data?.duplicated == false) {
              // this.$refs.nametitle.classList.add('text-gray-50')
              this.$refs.nametitle.innerHTML = '昵称可用';
            }
          } catch (err) {
            console.log(err);
          }
        }, 1000);
      }
      this.debouncedFunc();
    },
  },
};
