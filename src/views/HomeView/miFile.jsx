import { areaList } from '@vant/area-data';
import store from 'storejs';
import styled from 'styled-components-vue';
import Vue from 'vue';
import { DatetimePicker,Picker } from 'vant';
Vue.use(DatetimePicker).use(Picker);
// import dayjs from 'dayjs'
// import RelativeTime from 'dayjs/plugin/relativeTime'
// import 'dayjs/locale/zh-cn'
// dayjs.extend(RelativeTime)
// dayjs.locale('zh-cn')

// console.log(dayjs(1688733891207).fromNow().replace('',''))
const Wrapper = styled.div`
  /* .van-popup   .van-picker .van-picker__columns   {background-color: #272727} */
  .van-popup .van-popup--bottom {
    background-color: red;
  }
  .van-popup .van-picker {
    background-color: #1a1a1d;
  }
  .van-picker-column__wrapper .van-picker-column__item {
    padding-left: 5vw;
  }
  .van-picker__columns .van-picker-column {
    background: #272727;
  }
  .van-hairline-unset--top-bottom .van-picker__frame {
    background-color: #2d2d2d;
  }
  .van-popup--center{
    width: 100%;
    top: 87%;
  }
  .van-ellipsis {
    color: white;
  }
  .van-picker__confirm {
    color: red;
  }
  .list {
    padding-left: 7.46vw;
    background-color: #191b22;
  }
  .list li {
    width: 88vw;
    height: 13.14vw;
    line-height: 13.14vw;
    border-bottom: 0.09vw solid #303239;
    display: flex;
    justify-content: space-between;
  }
  div > .list > .t {
    height: 15.36vw;
    line-height: 15.36vw;
  }
  .list li > p {
    font-size: 4.73vw;
  }
  .list li span {
    margin-right: 2.84vw;
    color: #7b7982;
    font-size: 3.82vw;
  }
  router-link > Icon {
    color: #a8aab1;
    font-size: 7vw;
  }
  .hid{
    display: none;
  }
`;

export default {
  render() {
    return (
      <Wrapper>
        <div class="w-screen h-screen bg-[#131218]">
          <div class="text-[white]">
            {/* 头部 */}
            <div class="w-[100%] bg-[#131218] flex  items-center  text-[6vw] fixed top-0 px-[4vw] py-[5vw] pb-[2vw] z-[99]">
              <router-link to="/UserInfo">
                <Icon
                  icon="material-symbols:navigate-before"
                  class="text-[8vw]"
                />
              </router-link>
              <p class="ml-[30vw]">我的资料</p>
            </div>
            {/* 头像 */}
            <ul class="mt-[16vw] list">
              <li class="t">
                <p>头像</p>
                <router-link to="/UserInfo" class="flex items-center">
                  <img
                    src={this.details.avatarUrl}
                    class="w-[13.06vw] rounded-[50%] mr-[2.84vw]"
                  />
                  <Icon icon="ep:arrow-up" rotate={1} />
                </router-link>
              </li>
              <li>
                <p>昵称</p>
                <router-link to="/UserInfo" class="flex items-center">
                  <span>{this.details.nickname}</span>
                  <Icon icon="ep:arrow-up" rotate={1} />
                </router-link>
              </li>
              <li>
                <p>性别</p>
                <router-link to="/UserInfo" class="flex items-center">
                  <span>{this.details.nickname}</span>
                  <Icon icon="ep:arrow-up" rotate={1} />
                </router-link>
              </li>
              <li class="border-b-none">
                <p>二维码</p>
                <router-link to="/UserInfo" class="flex items-center">
                  <span>{this.details.nickname}</span>
                  <Icon icon="ep:arrow-up" rotate={1} />
                </router-link>
              </li>
            </ul>

            {/* 生日 */}
            <ul class="mt-[2.13vw] list">
              <li onClick={this.dateAppear}>
                <p>生日</p>
                <div class="flex items-center">
                  {/* <span>输入生日信息</span> */}
                  <span>{this.time}</span>
                  <Icon icon="ep:arrow-up" rotate={1} />
                </div>
              </li>
              <li onClick={this.appear}>
                <p>地区</p>
                <div class="flex items-center">
                  {/* <span v-if="this.city === ''" class="hid">{areaList.province_list[this.details.province].slice(0,2)} {areaList.city_list[this.details.city].slice(0,2)}</span> */}
                  <span class="city">{this.city}</span>
                  <Icon icon="ep:arrow-up" rotate={1} />
                </div>
              </li>
              <li>
                <p>大学</p>
                <router-link to="/UserInfo" class="flex items-center">
                  <Icon icon="ep:arrow-up" rotate={1} />
                </router-link>
              </li>
              <li>
                <p>音乐标签</p>
                <router-link to="/UserInfo" class="flex items-center">
                  <span>选择标签</span>
                  <Icon icon="ep:arrow-up" rotate={1} />
                </router-link>
              </li>
              <li>
                <p>简介</p>
              </li>
              <div class="w-[88vw] h-[33.04vw]  relative">
                <textarea
                  class=" border-none bg-[#191b22] w-[88vw] h-[33.04vw]"
                  placeholder="请输入个人介绍..."
                ></textarea>
                <span class="absolute bottom-[1vw] right-[2vw]  text-[2.66vw] z-[3]">
                  300
                </span>
              </div>
            </ul>

            {/* 个人隐私设置 */}
            <ul class="mt-[2.13vw] list">
              <li>
                <p>个人隐私设置</p>
                <router-link to="/UserInfo" class="flex items-center">
                  <Icon icon="ep:arrow-up" rotate={1} />
                </router-link>
              </li>
              <li>
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
          
          {/* 性别 */}
          <van-popup v-model={this.sexVisible}>
            <van-datetime-picker
              confirm-button-text="完成"
              onConfirm={this.sexPicker}
            />
          </van-popup>
          <van-picker
            title="性别"
            show-toolbar
            columns="columns"
            onConfirm="onConfirm"
            onCancel="onCancel"
            onChange="onChange"
          />
          {/* 出生年月日 */}
          <van-popup v-model={this.dataVisible}>
            <van-datetime-picker
              type="date"
              confirm-button-text="完成"
              formatter ={this.formatter}
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
      </Wrapper>
    );
  },
  data() {
    return {
      popupVisible: false,
      details: [],
      areaList:'',
      city:'',
      time:'',
      address:'',
      birthDay:'',
      dataVisible:false,
      sexVisible:false,
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(3000, 10, 1),
      columns: ['男', '女']
    };
  },
  async created() {
    const Mydetail = store.get('msg');
    this.details = Mydetail.data.profile;
    // console.log(this.details);
    const address = store.get('SelfAddress')
    const birthDay = store.get('SelfTime')
  },
  methods: {
    confirm(e) {
      this.popupVisible = false;
      this.city = (e[0].name).slice(0,2) +  (e[1].name).slice(0,2)
      store.set('SelfAddress',this.city)
    },
    appear() {
      this.popupVisible = true;
    },
    dateAppear(){
      this.dataVisible = true;
    },
    hideDatePicker(){
      this.dataVisible = false;
    },
    confirmDatePicker(e) {
        this.dataVisible = false;
        console.log(e)  //Sun Feb 02 2014 00:00:00 GMT+0800 (中国标准时间)  
        // this.city = (e[0].name).slice(0,2) +  (e[1].name).slice(0,2)
        const date = new Date(e);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        // const minDate = null; // 设置最小日期
        // const maxDate = null; // 设置最大日期
        this.time = `${year}年${month}月${day}日`;
        store.set('SelfTime',this.time)
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

  },
};
