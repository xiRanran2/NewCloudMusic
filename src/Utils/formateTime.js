import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(RelativeTime)
dayjs.locale('zh-cn')

// function f(time){
//     return dayjs(1688733891207).fromNow().replace('','')
// }

export default (V) => {
    V.prototype.$t = function (time,stamp) {
        return dayjs(1688733891207).fromNow().replace('','');
    }
}