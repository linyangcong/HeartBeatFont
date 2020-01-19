<template>
  <div id="main">
    <div id="first">
      <left-tool :tools='firstData.toolList' @fromlefttool='firstlefttool'></left-tool>
    </div>
    <div id="second">
      <user-list @changebadge='Hchangebadge' @TopParentPanel='ChildSendData' :MessSend='fromfirstData' @changename='parentchangname'></user-list>
    </div>
    <div id="third">
      <message :TopParent='Panel'  v-show="Messagevisi" :toolschat='thirdData.tools' @updateModel='updateMode'></message>
    </div>
  </div>
</template>

<script>

import LeftTool from './LeftTool'
import UserList from './UserList'
import Message from './Message'
import wx1 from '../assets/chat1.png'
import wx2 from '../assets/chat2.png'
import config from '../../Serverconfig'
export default {
  name: 'Communication',
  data () {
    return {
      ws:null,
      loginname:sessionStorage.getItem('loginname'),
      timerstamp:'',
      Messagevisi:false,
      Panel:'',//只存选择中的数据
      allheight:'',
      fromfirstData:[],
      firstData:{
        toolList:[
            {img1:wx1,img2:wx2,imgact:true},
            {img1:wx1,img2:wx2,imgact:false},
            {img1:wx1,img2:wx2,imgact:false},
            {img1:wx1,img2:wx2,imgact:false},
        ],
      },
      secondData:{
        },
      thirdData:{
        tools:[
            {img:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'},
            {img:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'},
            {img:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'},
            {img:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'},
        ],
      },
      userlist_userid:''
    }
  },
  components:{
    LeftTool,
    UserList,
    Message
  },
  methods:{
    firstlefttool(e){
      console.log('this is from firstData')
      
      this.fromfirstData=e
      console.log(this.fromfirstData)
    },
    Hchangebadge(val){
    console.log('在hellword页面收到处理总体数据请求')
    console.log(val)
      this.fromfirstData=val;
    },
    parentchangname(value){
      this.loginname=value
      
    },
    //选择用户名时，请求聊天记录
ChildSendData(item){
  this.Messagevisi=true;
  this.userlist_userid=item.userid;
  console.log(this.userlist_userid)
//   this.axios({
//   method: 'get',
//   url: 'http://localhost:8888/getchat?userid='+item.userid,
//   responseType: 'json',
// })
//   .then((res)=> {
//     this.Panel=res.data
//     console.log('this is panel data')
//     console.log(this.Panel)
//   }); 
},

updateMode(data,sendserver){
  console.log('0000000000000000000')
  this.ws.send(JSON.stringify(sendserver))
}
  },
   watch:{
     //监听当前点击的用户userid变化从而渲染出点击的用户聊天信息
        userlist_userid:function(val){
          this.fromfirstData.map(item=>{
            if(item.userid==val){
              this.Panel=item
            }
          })
        },
        // 'fromfirstData':{
        //     handler:function(value,oldvalue){
        //        console.log('fromfirstData变化了')
        //       // 收到数据侦听到数据变化后，需要赋值给消息展示页面进行更新
        //       //  console.log('fromid:'+sessionStorage.getItem('fromId'))
        //       //  console.log('toId:'+sessionStorage.getItem('toId'))
        //       // try{
        //       //     this.fromfirstData.map(item=>{
        //       //    console.log(item.userid+":"+sessionStorage.getItem('toId')+":"+sessionStorage.getItem('toId'))
        //       //    if(item.userid==sessionStorage.getItem('toId')){
        //       //       console.log(item.messtop)
        //       this.fromfirstData.map(item=>{
        //         if(item.userid==this.userlist_userid){
        //           console.log('watch fromfirstData变化：')
        //           console.log(item)
        //           this.Panel=item
        //         }
        //       })
        //       //        throw new Error('ondata')

        //       //    }
        //       //    else if(item.userid==sessionStorage.getItem('fromId')){
        //       //      console.log(item.messtop)
        //       //      this.Panel=item.messtop
        //       //    }
        //       //  })
        //       // }
        //       // catch(e){
        //       //   if(e.message!='ondata')throw e;
        //       // }
              
              
        //     },
        //     deep:true
        // }
    },
  mounted(){
this.fromfirstData=this.$route.params.userlist
console.log(this.fromfirstData)
this.ws = new WebSocket(`ws://${config.serverName}/communications/`+sessionStorage.getItem('USERID'))

this.ws.onopen = function () {
  console.log('ws已连接成功')
}
this.ws.onmessage = (e) =>{
  let recieveData=JSON.parse(e.data)
    console.log('收到ws消息')
  console.log(recieveData)
  this.fromfirstData.map(item=>{
    if(recieveData.fromId==sessionStorage.getItem('USERID')&&this.userlist_userid==item.userid){//发送者收到消息
      console.log('发送者收到消息:'+recieveData.data)
      sessionStorage.setItem('fromId',recieveData.fromId)
      sessionStorage.setItem('toId',recieveData.toId)
      item.messtop.push({avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'我',userid:recieveData.fromId,content:recieveData.data})
    }
    else if(this.userlist_userid==item.userid){//接受者收到消息
    console.log('接受者收到消息:'+recieveData.data)
    sessionStorage.setItem('toId',recieveData.toId)
     sessionStorage.setItem('fromId',recieveData.fromId)
    item.messtop.push({avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:recieveData.name,userid:recieveData.toId,content:recieveData.data})
    }
  })
  // this.Panel.messtop.push({userid:e.data.userid})
  // if(e.data.fromId==sessionStorage.getItem('USEID')){

  // }
  

}
this.ws.onclose = function () {
  console.log('ws已关闭')
}
    console.log(window.document.body.clientHeight)
     document.getElementById('first').style.height=38*16;
    document.getElementById('second').style.height =38*16;
    document.getElementById('third').style.height =38*16;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
*{
  padding: 0;
  margin: 0
}
/* div{
  border: 0.1px gainsboro solid;
} */
#main{
  display: flex;
  width: 100%;
  height: 100%;
}
#first{
width:10%;
height: 38rem;
background:black;
color:white;
display:inline-block;

}
#second{
 overflow-y:scroll;
 overflow-x:hidden;
  width:20%;
  height:38rem;
  background:rgb(235, 235, 235);
  color:black;
  display:inline-block;
}
#third{
  width:70%;
  height: 100%;
  background:white;
  color:black;
  display:inline-block;
}

</style>
