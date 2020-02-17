// import {states} from './StoreState'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        saywhat:'welcome to Vuex,linyangcong!',
        count:0
    },
    getters: {
        doneTodos(state){   //第一个参数state对象,第二个参数getters对象
          return state.saywhat
        },
        getCount(state){    
          return state.count
        }
      },
    mutations:{ //调用必须使用同步方法
// this.$store.commit('addCount',{a:1}) 载荷方式：第一个方法名，诶二个参数名
// this.$store.commit({type:'addCount',a:1}) 对象方式:第一个type方法名，第二个参数名
      addCount:(state,payload)=>{ //第一个参数state对象,第二个payload参数;
       
        console.log('payload:',payload)
        state.count++
      }
    },
    actions:{//同步异步都可以
      // this.$store.dispatch('addCount',{a:1}) 载荷方式：第一个方法名，诶二个参数名
      // this.$store.dispatch({type:'addCount',a:1}) 对象方式:第一个type方法名，第二个参数名
      addCount:(context,payload)=>{  //第一个参数context 上下文对象（store），第二个payload参数
        console.log('使用dispatch匹配action')                    
        context.commit('addCount')
      }
    }

    })
// exports.module({Store})