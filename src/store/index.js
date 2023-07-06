import Vue from 'vue'
import Vuex from '@/vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        switchCheckStatus:null,
    //   darkMode:false,
    //   count:123,
    //   msg:'hello,vuex!'
    },
    mutataions:{
        // increase(state){
        //     state.count++;
        // }
    }
})
export default store