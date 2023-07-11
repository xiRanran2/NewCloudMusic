import store from 'storejs';
import styled from 'styled-components-vue';
const Wrapper = styled.div`
    
`

export default {
    render(){
        return(
            <Wrapper>
                <div class="w-screen h-screen bg-[#131218] text-[white]">
                    <div class="w-[100%] bg-[#131218] flex  items-center  text-[6vw] fixed top-0 px-[4vw] py-[5vw] pb-[2vw] z-[99]">
                        <span>取消</span>
                        <span class="font-[800]">修改完成</span>
                        <span>完成</span>
                    </div>
                </div>
            </Wrapper>
        );
    },
    data(){

    },
    async created(){

    },
    methods:{

    },
}