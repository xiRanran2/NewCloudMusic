import _ from 'lodash'
export default {
    render(){
        this.$slots.default[0].data.on.click = _.debounce(
            this.$slots.default[0].data.on.click,
            this.duration
        );
        return this.$slots.default
    },
    props:{
        duration:{
            type:Number,
            default:500,
        },
        type:{
            type:String,
            default:'click',
        }
    },
    mounted(){
        console.log(this.$slots.default[0].data.on.click)
    }
}