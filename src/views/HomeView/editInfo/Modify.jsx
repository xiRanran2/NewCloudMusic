import styled from 'styled-components-vue';
import _store from 'storejs';
import { areaList } from '@vant/area-data';
import _ from 'lodash';
const popstyle = styled.div`
  .van-picker__confirm {
    color: red;
  }
  .van-picker__toolbar {
    background: #dde0e0;
  }
  .van-hairline-unset--top-bottom {
    /* background: #f4f4f4; */
  }
`;

const citywrap = styled.div`
  .van-picker__toolbar {
    background: #dde0e0;
  }
  .van-picker__confirm {
    color: red;
  }
`;
import { setUser, getUserAccount, getNickname } from '@/request';
import { mapState, mapMutations } from '@/vuex';
export default {
  render() {
    return (
      <div class="bg-[#e9ecec] dark:bg-[#151515]">
        <div class=" w-screen  bg-[#fff] pt-[14vw]">
          <div class="fixed bg-white shadow w-[100%] top-0">
            <header class="flex  relative items-center justify-center w-[100%] box-border p-[4vw]">
              <span
                onClick={this.toggleshow}
                class=" absolute left-[4vw] top-[50%] translate-y-[-50%]"
              >
                <Icon icon="teenyicons:left-outline" />
              </span>
              <span class="text-[4.25vw] font-[700]">我的资料</span>
            </header>
          </div>
          <div class="pt-[2vw] w-screen bg-[#F6F6F6] text-[3.5vw]">
            <ul class="bg-[#fff] py-[2vw] pl-[4vw] ulList">
              <li class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw] border-b-[.1vw] border-solid border-[#cccccc80]">
                <div>
                  <span>头像</span>
                </div>
                <div class="text-[#989898] flex items-center">
                  {' '}
                  <img
                    class="rounded-[50%] shadow h-[10vw] w-[10vw]"
                    src={this.userinfo.avatarUrl}
                    alt=""
                  />
                </div>
              </li>
              <li
                onClick={() => {
                  this.nickshow = true;
                }}
                class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw] border-b-[.1vw] border-solid border-[#cccccc80]"
              >
                <div>
                  <span>昵称</span>
                </div>
                <div class="text-[#989898] flex items-center">
                  <span>{this.userinfo.nickname}</span>
                  <Icon class=" ml-[2vw] " icon="teenyicons:right-outline" />
                </div>
              </li>
              <li
                class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw] border-b-[.1vw] border-solid border-[#cccccc80]"
                onClick={this.setsex}
              >
                <div>
                  <span>性别</span>
                </div>
                <div class="text-[#989898] flex items-center">
                  <span ref="sex" class="text-[#989898] flex items-center">
                    {this.userinfo.gender == 1
                      ? '男'
                      : this.userinfo.gender == 0
                      ? '保密'
                      : '女'}
                  </span>
                  <Icon class=" ml-[2vw] " icon="teenyicons:right-outline" />
                </div>
              </li>

              <li class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw]">
                <div>
                  <span>二维码</span>
                </div>
                <div class="text-[#989898] flex items-center">
                  <Icon
                    icon="ph:qr-code-light"
                    color="#989898"
                    class="w-[5vw] h-[5vw] ml-[.25vw]"
                  />
                  <Icon class=" ml-[2vw] " icon="teenyicons:right-outline" />
                </div>
              </li>
            </ul>
            <ul class="bg-[#fff] py-[2vw] pl-[4vw] mt-[2vw] ulList">
              <li class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw] border-b-[.1vw] border-solid border-[#cccccc80]">
                <div>
                  <span>生日</span>
                </div>
                <div class="text-[#989898] flex items-center">
                  <span class="text-[#989898] flex items-center">
                    {new Date(this.userinfo.birthday).getFullYear()}-
                    {new Date(this.userinfo.birthday).getMonth() + 1}-
                    {new Date(this.userinfo.birthday).getDate()}
                  </span>
                  <Icon class=" ml-[2vw] " icon="teenyicons:right-outline" />
                </div>
              </li>
              <li
                onClick={() => {
                  this.cityshow = true;
                }}
                class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw] border-b-[.1vw] border-solid border-[#cccccc80]"
              >
                <div>
                  <span>地区</span>
                </div>
                <div class="text-[#989898] flex items-center">
                  <span class="text-[#989898] flex items-center">
                    {this.areaList.province_list[this.userinfo.province]}{' '}
                    {this.areaList.city_list[this.userinfo.city]}
                  </span>
                  <Icon class=" ml-[2vw] " icon="teenyicons:right-outline" />
                </div>
              </li>
              <li class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw] border-b-[.1vw] border-solid border-[#cccccc80]">
                <div>
                  <span>大学</span>
                </div>
                <div class="text-[#989898] flex items-center">
                  <span class="text-[#989898BF]">未填写</span>
                  <Icon class=" ml-[2vw] " icon="teenyicons:right-outline" />
                </div>
              </li>
              <li class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw] border-b-[.1vw] border-solid border-[#cccccc80]">
                <div>
                  <span>音乐标签</span>
                </div>
                <div class="text-[#989898] flex items-center">
                  <span class="text-[#989898BF]">选择标签</span>
                  <Icon class=" ml-[2vw] " icon="teenyicons:right-outline" />
                </div>
              </li>
              <li class="flex flex-col ">
                <div class="h-[12vw] flex  items-center border-b-[.1vw] border-solid border-[#cccccc80]">
                  <span>简介</span>
                </div>
                <textarea
                  class="h-[20vw]"
                  placeholder="请输入个人介绍..."
                  name=""
                  id=""
                ></textarea>
              </li>
            </ul>
            <ul class="bg-[#fff] py-[2vw] pl-[4vw] mt-[2vw] ulList">
              <li class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw] border-b-[.1vw] border-solid border-[#cccccc80]">
                <div>
                  <span>个人主页隐私设置</span>
                </div>
              </li>
              <li class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw]">
                <div>
                  <span>主页模块顺序设置</span>
                </div>
              </li>
            </ul>
            <ul class="bg-[#fff] py-[2vw] pl-[4vw] mt-[2vw] pb-[47vw]">
              <li class="pr-[4vw] py-[2vw] flex justify-between items-center h-[12vw]">
                <div>
                  <span>账号和绑定设置</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* 修改性别弹出层 */}
        <van-popup
          v-model={this.sexshow}
          class="flex h-[30vh] flex-col"
          position="bottom"
        >
          <popstyle>
            <van-picker
              columns={this.columnsarr}
              onCancel={this.cancel}
              onConfirm={this.confirm}
              show-toolbar
              confirmButtonText="完成"
            ></van-picker>
          </popstyle>
        </van-popup>

        {/* 修改昵称弹出层 */}
        <van-popup class="  " v-model={this.nickshow} position="bottom">
          <div class="bg-[#f8f8f8] h-screen">
            <header class="flex items-center justify-between box-border p-[4vw] bg-white">
              <div onClick={this.closenameshow} class=" text-[14px]">
                取消
              </div>
              <div class=" font-[550]">修改昵称</div>
              <div
                onClick={this.setnickname}
                class="text-[#b2b2b2] text-[14px]"
              >
                完成
              </div>
            </header>
            <div class="h-[12vw] flex items-start justify-start mt-[2vw]">
              <input
                v-model={this.nickname}
                class="box-border pl-[4vw] h-[100%] caret-blue-600 bg-white w-[100%]"
                type="text"
                value={this?.userinfo.nickname}
                placeholder="请输入昵称"
              />
            </div>
            <p
              ref="nametitle"
              class="text-red-500 text-[14px] pl-[4vw] pt-[4vw] box-border"
            ></p>
          </div>
        </van-popup>

        {/* 修改地区弹出层 */}
        <citywrap>
          <van-popup v-model={this.cityshow} position="bottom">
            <van-area
              title="标题"
              onCancel={this.closecity}
              onConfirm={this.citysub}
              area-list={this.areaList}
              columnsNum="2"
            />
          </van-popup>
        </citywrap>
      </div>
    );
  },
  data() {
    return {
      cityshow: false,
      nickshow: false,
      areaList,
      sexshow: false,
      columnsarr: ['男', '女'],
      nickname: '',
      debouncedFunc: null,
    };
  },
  methods: {
    citysub(res) {
      // console.log(res)
      this.updatainfomation({
        province: Number(res[0].code),
        city: Number(res[1].code),
      });
      this.cityshow = false;
    },
    closecity() {
      this.cityshow = false;
    },
    closenameshow() {
      this.nickshow = false;
    },
    setnickname() {
      // console.log(this.nickname)
      if (this.nickname) {
        this.updatainfomation({
          nickname: this.nickname,
        });
        this.nickshow = false;
      }
    },
    updatainfomation(obj) {
      let localuserinfo = JSON.parse(localStorage.getItem('profile'));
      let oldinfo = {
        gender: localuserinfo.gender || '',
        birthday: localuserinfo.birthday || '',
        nickname: localuserinfo.nickname || '',
        province: localuserinfo.province || '',
        city: localuserinfo.city || '',
        signature: localuserinfo.signature || '',
      };
      setUser(Object.assign(oldinfo, obj))
        .then((res) => {
          getUserAccount()
            .then((res) => {
              this.$root.$options.store.state.userinfo = res.data.profile;
              localStorage.setItem('profile', JSON.stringify(res.data.profile));
            })
            .catch((err) => console.log(err));
          console.log('更新成功');
        })
        .catch((err) => {
          alert('更新失败');
        });
    },
    confirm(e) {
      console.log(e);
      this.sexshow = false;
      this.updatainfomation({
        gender: e == '男' ? 1 : 2,
      });
    },
    cancel() {
      this.sexshow = false;
    },
    setnewsex(e) {
      // this.$root.$options.store.state.gender=this.$root.$options.store.state.gender==1?0:1;
      // console.log(e.target.innerHTML)
      this.sexshow = !this.sexshow;
    },
    setsex() {
      this.sexshow = !this.sexshow;
    },
    ...mapMutations(['toggleshow']),
  },
  computed: {
    ...mapState(['userinfo', 'show']),
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
  created() {
    if (_store.get('profile')) {
      let userinfo = {};
      if (typeof _store.get('profile') == 'object') {
        userinfo = _store.get('profile');
      } else {
        userinfo = JSON.parse(_store.get('profile'));
      }
      this.$store.state.userinfo = userinfo;
    }
  },
};
