<template>
  <div style="height:100%;width:100%" >
      <div class="message_chatuser">{{chatuser}}</div>
      <div id="message_showid" class="message_show">
          <mess-top :message1='TopParent' ></mess-top>
      </div>
    <div class="tooltip">
        <span v-for="(k,i) in this.toolschat" :key="i">
        <img :src="k.img" width="30px" height="30px" style="margin-left:1rem" />
        </span>
    </div>
    <textarea @keyup.enter="sendMessage" class="message_input" v-model="message" />
    <div class="message_btn">
       <el-button type="success" size="small" @click="sendMessage">发送（S）</el-button>
    </div>
  </div>
</template>

<script>
import MessTop from './MessTop'
export default {
    name:"Message",
    data(){
        return{
            ws:{},
            wsdata:{
                toId:'',
                type:'',
                data:''
            },
            chatuser:'交流群1',
            message:'',
        }
    },
    props:['TopParent','toolschat'],
    components:{
        MessTop
    },
    methods:{
        sendMessage(){
            this.wsdata.data=this.message;
            this.wsdata.type='json';
            this.wsdata.toId=this.TopParent.userid;
            console.log('发送数据')
            console.log(this.wsdata)
            this.$emit('updateModel',this.TopParent.messtop,this.wsdata)
            this.message=''
        }
    },
    updated:function(){
        console.log('滚动了')
      this.$nextTick(function(){
      var div = document.getElementById('message_showid');
        div.scrollTop = div.scrollHeight;
      })
    },
    mounted(){
this.$nextTick(function(){
var div = document.getElementById('message_showid');
div.scrollTop = div.scrollHeight;
        })
    }
}
</script>

<style>
.message_chatuser{
    /* position: absolute; */
    top: 0px;
    font-size: 1.3rem;
    color: black;
    padding: 0.5rem;
    margin: 0.5rem 0.5rem;
    width: 100%
}
.message_show{
    border-top: 1px solid rgb(221, 220, 220);
     border-bottom: 1px solid rgb(221, 220, 220);
    padding: 1rem;
    width: 100%;
    height: 21.5rem;
    background: rgb(245, 245, 245);
    /* position: absolute; */
    overflow-y: scroll;

}
.tooltip{
    background: white;
    margin:1rem 0 0 1rem;
}
.message_input{
    height: 5rem;
    width: 58rem;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    background: white;
    font-size: 1rem;
    height: 4rem;
    margin: 0.5rem;
}
.message_btn{
    background: white;
    /* position: absolute; */
    text-align: right;
    bottom: 1rem;
    right: 1rem;
}
</style>