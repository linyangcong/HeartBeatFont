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
 
<div class="user" @click="selectuser($event,k)"  v-for="(k,i) in this.MessSend" :key="i">
   
    <img class="useravater" :src="k.avater" width="20%" height="80%" style="display:inline-block"/>
    
    <div class="usermessage"   style="height:60%;display:inline-block">
         <el-badge :hidden="messhidden" :value="k.badge" :max="10" :is-dot="false" class="item">
        <div style="font-size:1rem;min-width:4rem">{{k.name}}</div>
        </el-badge>
        <!-- <div style="font-size:0.6rem;color:grey">{{k.messtop[k.total-1].name}}：{{k.messtop[k.total-1].content}}</div> -->
    </div>
    
</div>
</div>
  
</template>

<script>
export default {
    name:"UserList",
    data(){
        return{
            messhidden:true,
            messbadge:0,
            elementObj:null,
            findname:'',
        }
    },
    props:['MessSend'],
    methods:{
        changename1(){
            this.$emit('changename',this.findname)
        },
        selectuser(event,item){
            console.log(item)
            this.messbadge=0;
            this.messhidden=true;
            this.$emit('TopParentPanel',item)
            if(this.elementObj!=null){
                this.elementObj.style='background:rgb(235, 235, 235)'
            }
            this.elementObj=event.currentTarget
            event.currentTarget.style='cursor: default;background: rgb(220, 220, 220)'
        }
        
    },
    watch:{
        'MessSend':{
            handler:function(value,oldvalue){
               
                // console.log('执行了监听userlist的messsend')
                // for(let i=0;i<this.MessSend.length;i++){
                //     if(this.MessSend[i].userid==sessionStorage.getItem('fromid')){//发送者处理数据
                //         console.log('进行了messsend处理')
                //         this.MessSend[i].badge++;
                //         this.messhidden=false;
                //         this.$emit('changebadge',this.MessSend)
                //         // sessionStorage.removeItem('fromid')
                //     }
                //     else{//接收者处理
                //     this.MessSend[i].badge++;
                //         this.messhidden=false;
                //         this.$emit('changebadge',this.MessSend)
                //     }
                // }
            },
            deep:true
        }
    },
    mounted(){
 console.log(this.MessSend)
   
    }

}
</script>

<style>
.user{
padding:0 5%;
width: 100%;
line-height: 1.8rem;
height:8%;
}
.user:hover{
    cursor: default;
    background: rgb(255, 255, 255)
}
.useravater{
vertical-align: middle;
line-height: 1rem;
}
.usermessage{
vertical-align: middle;
line-height: 1rem;
}
</style>