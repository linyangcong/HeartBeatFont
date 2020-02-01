<template>
<div style="width:100%;height:100%;">
<!-- <div class="user">
    <img class="useravater" :src="squareUrl" width="20%" height="100%" style="display:inline-block"/>
    <div class="usermessage" style="width:70%;height:100%;display:inline-block">
        <div>中山平台</div>
        <div style="font-size:12px">关浩宇：好的，收到！</div>
    </div>
</div> -->
<div>
    <el-input v-model="findname" @blur="changename1" size="small"  icon="el-icon-search" placeholder="搜索"></el-input>
</div>
 
<div class="user" @click="selectUser($event,k)"  v-for="(k,i) in this.userRelationShip" :key="i">
   
    <img :class="k.onLine!='1'?'useravaterOnfline':'useravaterOnline'" :src="config+k.avater" width="30rem" height="30rem"/>
    <div class="usermessage" >
         <el-badge  :is-dot="k.new" class="item">
            <div class="username" >{{k.name}}</div>
        </el-badge>
        <span class="offline" v-show="k.onLine=='0'">离线</span>
        <span class="online" v-show="k.onLine=='1'">在线</span>
        <!-- <div style="font-size:0.6rem;color:grey">{{k.messtop[k.total-1].name}}：{{k.messtop[k.total-1].content}}</div> -->
    </div>
    
</div>
</div>
  
</template>

<script>
import config from '../../Serverconfig'
export default {
    name:"Center",
    data(){
        return{
            config:config.staticServer,
            // messhidden:false,
            // messbadge:0,
            elementObj:null,
            findname:'',
            choiceUserId:'',
            UnCheakMessageId:[]
        }
    },
    props:['userRelationShip','recieveData'],
    methods:{
        //   getNewFlagMessage(val){
        //       console.log(this.UnCheakMessageId,val,'00')
        //    for(let i=0;i<this.UnCheakMessageId.length;i++){
        //         console.log(this.UnCheakMessageId[i],val,'0')
        //        if(this.UnCheakMessageId[i]==val){
        //             console.log(val,'11')
        //            return true
        //        }
        //        console.log(val,'22')
        //        return false
        //    }
        // },
        changename1(){
            this.$emit('changename',this.findname)
        },
        selectUser(event,item){
            // this.messbadge=0;
            // this.messhidden=true;
            console.log(item,'00')
            this.choiceUserId=item.userid
            // this.$emit('TopParentPanel',item)
            this.$emit('ShowRight',item)
            if(this.elementObj!=null){
                this.elementObj.style='background:rgb(255, 255, 255)'
            }
            this.elementObj=event.currentTarget
            event.currentTarget.style='cursor: default;background: rgb(220, 220, 220)'
        }
        
    },
    watch:{
        recieveData:function(obj){
            // this.UnCheakMessageId.push(obj.fromId)
           this.$emit('AddMessage')
            // console.log(this.userRelationShip)
        }
    //    userRelationShip:function(val){
    //        console.log(val,'11111111')
    //    }
        // 'userRelationShip':{
        //     handler:function(value){
        //          console.log(value,'11111111')
        //          value.map(item=>{
        //              if(item.read){
        //                   console.log(value,'222222222')
        //                  item.read=true;
        //              }
        //          })
        //        value.map(item=>{
        //            if(item.read){
        //                 this.messhidden=true;
        //            }
                    
        //        })
                // for(let i=0;i<this.userRelationShip.length;i++){
                //     if(this.userRelationShip[i].userid==sessionStorage.getItem('fromid')){//发送者处理数据
                //         this.userRelationShip[i].badge++;
                //         this.messhidden=false;
                //         this.$emit('changebadge',this.userRelationShip)
                //         // sessionStorage.removeItem('fromid')
                //     }
                //     else{//接收者处理
                //     this.userRelationShip[i].badge++;
                //         this.messhidden=false;
                //         this.$emit('changebadge',this.userRelationShip)
                //     }
                // }

        //     },
        //     deep:true
        // }
    },
    mounted(){

    }

}
</script>

<style>
.user{
/* padding:0 5%;
width: 100%;
line-height: 1rem; */
/* height:8%; */
display: flex;
flex-direction: row;
background:rgb(255,255,255);
border-bottom: 1px solid #f2f2f2;
padding: 5px;
align-items: center;
}
.user:hover{
    cursor: default;
    background: rgb(220, 220, 220)
}

.useravaterOnline{
vertical-align: middle;
line-height: 1rem;
border-radius: 10px;
display:inline-block
}
.useravaterOnfline{
vertical-align: middle;
line-height: 1rem;
border-radius: 10px;
display:inline-block;
opacity: 0.3
}
.usermessage{
/* height:60%; */
margin-left: 5px;
display:flex;
flex-direction: column;
/* vertical-align: middle; */
/* line-height: 1rem; */
}
.usermessage .online{
    font-size: 0.5rem;
    color: #0de43c
}
.usermessage .offline{
    font-size: 0.5rem;
    color: #ff0202
}
.username{
    font-size: 0.8rem
}
</style>