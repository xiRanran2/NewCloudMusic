import Vue from 'vue';
import './index.css';
// import './swiper-bundle.min.js'
import { Icon } from '@iconify/vue2';
import HomeView from '@/views/components/HomeView.vue';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Drawer from '@/components/Drawer.vue'
import Switch from '@/components/Switch.vue'
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
dayjs.extend(relativeTime);
Vue.prototype.dayjs = dayjs;
Vue.component('Drawer',Drawer)
Vue.component('v-switch',Switch)


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

