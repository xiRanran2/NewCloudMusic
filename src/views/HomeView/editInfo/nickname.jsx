import store from 'storejs';
import styled from 'styled-components-vue';
const Wrapper = styled.div``;

export default {
  render() {
    return (
      <Wrapper>
        <div class={this.switchCheckStatus ? 'dark' : ''}>
          <div class="w-screen h-screen bg-[#09090c] text-[white] dark:bg-[#e9ecee] dark:text-[#000]">
            <div class="w-[100%] h-[14vw] bg-[#0d0d10] dark:bg-[#fff] flex justify-between  items-center  text-[5vw]  px-[4vw] py-[5vw] pb-[2vw] z-[99]">
              <span>取消</span>
              <span class="font-[600]">修改完成</span>
              <span>完成</span>
            </div>
            
            <div class="w-[100%] px-[3vw]  bg-[#0d0d10] dark:bg-[#fff] h-[10vw] mt-[2vw]">
                
            </div>
          </div>
        </div>
      </Wrapper>
    );
  },
  data() {
    return {
        switchCheckStatus: null,
    }
  },
  async created() {
    this.switchCheckStatus = store.get('switch');
  },
  methods: {},
};
