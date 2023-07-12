
let Vue = null;//声明一个全局变量
let store = null;

export const mapMutations = (mutationKeys = []) => {
    return mutationKeys.reduce((prev,key)=>{
        prev[key] = store.mutations[key];
        return prev;
    },{});
}

// 具名导入
export const mapState = (stateKeys = []) => {
    // 方法1 for循环
    // let o = {};
    // for(let key of stateKeys){
    //     o[key] = function(){
    //         return store.state[key];
    //     }
    // }
    // return 0;

    // 方法2  
    return stateKeys.reduce((prev,key)=>{
        prev[key] = function (){
            return store.state[key];
        };
        return prev;
    },{});
}
 
// 数据仓库对象 (vue插件)
// 默认导出对象 
export default {
    Store:class{
        constructor({state= {},mutations = {} }){ //constructor构造器  然后解构出来
            this.state = Vue.observable(state);
            let o = {};
            for(let key in mutations){ 
                o[key] = () => { 
                    mutations[key](this.state);
                };
            }
            this.mutations = o;
        }
    },
    // install方法
    install(_Vue){
        Vue =_Vue;// 赋值
        Vue.mixin({ // mixin方法是 混入 全局混入
            created(){ //混入一个created
                if(!this.$parent){ // 如果没有 !this.$parent 就是有根实例
                    // Vue.prototype.$store 把Vue.prototype 赋值给原型
                    // !this.$parent 限制了只能在根实例中指向 this 指向 根实例 
                    // 根实例可以拿到$option 就可以拿到注入给根实例的store
                    Vue.prototype.$store = this.$options.store;
                    store = this.$options.store;
                }
            },
        });
    },
    mutations: {
        updateDetails(state, newDetails) {
            state.details = newDetails;
            localStorage.setItem('details', JSON.stringify(newDetails));
        }
    }
};