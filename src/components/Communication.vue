<template>
  <div id="main">
    <div id="TapPanel" v-show="!fullScreenFlag">
      <tap-panel ></tap-panel>
      <!-- <tap-panel :tools='firstData.toolList' @fromlefttool='firstlefttool'></tap-panel> -->
    </div>
    <div id="UserList" v-show="!fullScreenFlag">
      <user-list :recieveData='recieveData' @ShowRight='ShowRightPanel' @AddMessage='AddMessage' :userRelationShip='userRelationShip' @changename='parentchangname'></user-list>
    </div>
    <div id="RightPanel">
      <right-panel :RightDataMessage='Panel' @fullScreen='fullScreen'  v-show="ShowRightPanelFlag" :toolschat='thirdData.tools' @updateModel='updateMode'></right-panel>
    </div>
  </div>
</template>

<script>

import TapPanel from './TapPanel'
import UserList from './UserList'
import RightPanel from './RightPanel'
import wx1 from '../assets/chat1.png'
import wx2 from '../assets/chat2.png'
import config from '../../Serverconfig'
export default {
  name: 'Communication',
  data () {
    return {
      fullScreenFlag:false,
      userRelationShip:[],//存关联用户的信息
      recieveData:{},
      Panel:{},

      ws:null,
      loginname:sessionStorage.getItem('loginname'),
      timerstamp:'',
      ShowRightPanelFlag:false,
      Panel:'',//只存选择中的数据
      allheight:'',
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
            {img:require('../../static/EmojisTool.png'),name:'IconTools'},
            {img:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'},
            {img:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'},
            {img:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'},
        ],
      },
      // userlist_userid:''
    }
  },
  components:{
    TapPanel,
    UserList,
    RightPanel
  },
  methods:{
    fullScreen(){
      this.fullScreenFlag=!this.fullScreenFlag;
      if(this.fullScreen){
        document.getElementById('RightPanel').style='width:100%';
      }
      else{
        document.getElementById('RightPanel').style='width:60%';
      }
    },
    firstlefttool(e){
      this.userRelationShip=e
    },
    Hchangebadge(val){
      this.userRelationShip=val;
    },
    parentchangname(value){
      this.loginname=value
      
    },
  AddMessage(){
 this.userRelationShip.map(item=>{
                if(this.recieveData.fromId==item.userid){
                item.new=true
                item.messtop.push(this.recieveData)
                }
                if(this.recieveData.toId==item.userid){
                item.new=false
                item.messtop.push(this.recieveData)
                }
                
            })
  },
    //选择用户名时，请求聊天记录
ShowRightPanel(item){
  // this.Messagevisi=true;
  console.log('点击了用户',item)
  this.ShowRightPanelFlag=true;
  this.Panel=item
  // this.userlist_userid=item.userid;

//   this.axios({
//   method: 'get',
//   url: 'http://localhost:8888/getchat?userid='+item.userid,
//   responseType: 'json',
// })
//   .then((res)=> {
//     this.Panel=res.data
//   }); 
},

updateMode(data,sendserver){
    this.ws.send(JSON.stringify(sendserver))
}
  },
  //  watch:{
  //    //监听当前点击的用户userid变化从而渲染出点击的用户聊天信息
  //       userlist_userid:function(val){
  //         this.userRelationShip.map(item=>{
  //           if(item.userid==val){
  //             this.Panel=item
  //           }
  //         })
  //       },
  //       // 'fromfirstData':{
  //       //     handler:function(value,oldvalue){
  //       //       // 收到数据侦听到数据变化后，需要赋值给消息展示页面进行更新
  //       //       // try{
  //       //       //     this.fromfirstData.map(item=>{
  //       //       //    if(item.userid==sessionStorage.getItem('toId')){
  //       //       this.fromfirstData.map(item=>{
  //       //         if(item.userid==this.userlist_userid){
  //       //           this.Panel=item
  //       //         }
  //       //       })
  //       //       //        throw new Error('ondata')

  //       //       //    }
  //       //       //    else if(item.userid==sessionStorage.getItem('fromId')){
  //       //       //      this.Panel=item.messtop
  //       //       //    }
  //       //       //  })
  //       //       // }
  //       //       // catch(e){
  //       //       //   if(e.message!='ondata')throw e;
  //       //       // }
              
              
  //       //     },
  //       //     deep:true
  //       // }
    // },
  mounted(){
//查询朋友列表
this.userRelationShip=[]
var relationshiplist=JSON.parse(sessionStorage.getItem('userdetail')).relationship.split(',')
relationshiplist.map(item=>{
this.axios({
  method: 'get',
  url: `http://${config.serverName}/getRelationshipList?userid=${item}`,
  responseType: 'json',
}).then(res=>{
res.data.new=false
this.userRelationShip.push(res.data)
}).catch(e=>{
})
})

this.ws = new WebSocket(`ws://${config.serverName}/communications/`+JSON.parse(sessionStorage.getItem('userdetail')).userid)
this.ws.onopen = function () {
}
this.ws.onmessage = (e) =>{
this.recieveData=JSON.parse(e.data)
// console.log(this.recieveData)

// this.userRelationShip.map(item=>{
  
// if(JSON.parse(sessionStorage.getItem('userdetail')).userid==recieveData.fromId){//自己发送的数据
// if(recieveData.toId==item.userid){
//   item.messtop.push({avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'我',userid:recieveData.fromId,content:recieveData.data})
//   item.read=false
//   }
//   }
// else{
//   if(recieveData.fromId==item.userid){
//   item.messtop.push({avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:item.name,userid:recieveData.fromId,content:recieveData.data})
//   item.read=true
//   }
// }
// })
}
this.ws.onclose = function () {

}
     document.getElementById('TapPanel').style.height=38*16;
    document.getElementById('UserList').style.height =38*16;
    document.getElementById('RightPanel').style.height =38*16;
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
#TapPanel{
/* width:10%; */
/* height: 38rem; */
background:black;
color:white;
display:inline-block;

}
#UserList{
 overflow-y:scroll;
 overflow-x:hidden;
  width:30%;
  height:38rem;
  background:rgb(235, 235, 235);
  color:black;
  display:inline-block;
}
#RightPanel{
  width:60%;
  height: 100%;
  background:white;
  color:black;
  display:inline-block;
}


</style>
