import Vue from 'vue';
import './index.css';
// import './swiper-bundle.min.js'
import { Icon } from '@iconify/vue2';
import HomeView from './views/HomeView.vue';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
Vue.prototype.dayjs = dayjs;

import Vant from 'vant';
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.component('Icon', Icon);
const vm = new Vue({
    el: '#app',
    data: {
      swiper: null
    },
    render: h => h(HomeView),
    mounted() {
      // this.initSwiper();
    },
    methods: {
    }
});
