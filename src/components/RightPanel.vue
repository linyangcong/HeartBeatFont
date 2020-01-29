<template>
  <div >
      <div class="message_chatuser">{{RightDataMessage.name}}</div>
      <div id="message_showid" class="message_show">
          <main-chat :RightDataMessageTop='RightDataMessage' ></main-chat>
      </div>
    <div class="tooltip">
        <span v-for="(k,i) in this.toolschat" :key="i">
        <img :src="k.img" width="30px" height="30px" style="margin-left:1rem" />
        </span>
    </div>
    <textarea class="message_input" v-model="message"  @keyup.enter="sendMessage"/>
    <div class="message_btn">
       <el-button :disabled='this.sendmess' type="success" size="small" @click="sendMessage">发送（S）</el-button>
    </div>
  </div>
</template>

<script>
import MainChat from './MainChat'
export default {
    name:"Center",
    data(){
        return{
            sendmess:true,
            ws:{},
            wsdata:{
                toId:'',
                type:'',
                data:''
            },
            message:'',
        }
    },
    props:['RightDataMessage','toolschat'],
    components:{
        MainChat
    },
    methods:{
        sendMessage(){
            this.wsdata.data=this.message;
            this.wsdata.type='json';
            this.wsdata.toId=this.RightDataMessage.userid;
            this.$emit('updateModel',this.RightDataMessage,this.wsdata)
            this.message=''
        }
    },
    updated:function(){
      this.$nextTick(function(){
      var div = document.getElementById('message_showid');
        div.scrollTop = div.scrollHeight;
      })
    },
    watch:{
        message:function(val){
            if(val==''){
                this.sendmess=true
                
            }
            else
            this.sendmess=false
        }
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
    width: 100%;
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