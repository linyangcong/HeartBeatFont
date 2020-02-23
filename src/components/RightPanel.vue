<template>
  <div >
      <div class="message_chatuser">
          <div><i @click="goBack" class="el-icon-arrow-left" style="margin-right:0.5rem"></i><span>{{RightDataMessage.name}}</span></div>
        </div>

      <div id="message_showid" class="message_show" @click="showEmojiTools(0)">
          <main-chat :RightDataMessageTop='RightDataMessage' ></main-chat>
      </div>
    <div class="tooltip">
        <div v-show="showEmojiToolsFlag" class="showEmojiToolsFlag">
            <img :src="key.path" @click="selectEmoji(key)" class="showEmojiToolItem" v-for="(key,index) in this.EmojiTools" :key="index"/>
        </div>
        <span v-for="(k,i) in this.toolschat" :key="i" >
        <img :src="k.img" style="margin-left:1rem;height:1.5rem;" @click="showEmojiTools(k)" />
        </span>
    </div>
    <textarea class="message_input" v-model="message"  @keyup.enter="sendMessage" @click="showEmojiTools(0)"/>
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
            showEmojiToolsFlag:false,
            EmojiTools:[
                {name:'emoji_1',path:require('../../static/emoji/emoji_1.png')},
                {name:'emoji_2',path:require('../../static/emoji/emoji_2.png')},
                {name:'emoji_3',path:require('../../static/emoji/emoji_3.png')},
                {name:'emoji_4',path:require('../../static/emoji/emoji_4.png')},
                {name:'emoji_5',path:require('../../static/emoji/emoji_5.png')},
                {name:'emoji_6',path:require('../../static/emoji/emoji_6.png')},
                {name:'emoji_7',path:require('../../static/emoji/emoji_7.png')},
                {name:'emoji_8',path:require('../../static/emoji/emoji_8.png')},
                {name:'emoji_9',path:require('../../static/emoji/emoji_9.png')},
                {name:'emoji_10',path:require('../../static/emoji/emoji_10.png')},
                {name:'emoji_11',path:require('../../static/emoji/emoji_11.png')},
                {name:'emoji_12',path:require('../../static/emoji/emoji_12.png')},
                {name:'emoji_13',path:require('../../static/emoji/emoji_13.png')},
                {name:'emoji_14',path:require('../../static/emoji/emoji_14.png')},
                {name:'emoji_15',path:require('../../static/emoji/emoji_15.png')},
                {name:'emoji_16',path:require('../../static/emoji/emoji_16.png')},
                {name:'emoji_17',path:require('../../static/emoji/emoji_17.png')},
                {name:'emoji_18',path:require('../../static/emoji/emoji_18.png')},
                {name:'emoji_19',path:require('../../static/emoji/emoji_19.png')},
                {name:'emoji_20',path:require('../../static/emoji/emoji_20.png')},
                {name:'emoji_21',path:require('../../static/emoji/emoji_21.png')},
                {name:'emoji_22',path:require('../../static/emoji/emoji_22.png')},
                {name:'emoji_23',path:require('../../static/emoji/emoji_23.png')},
                {name:'emoji_24',path:require('../../static/emoji/emoji_24.png')},
                {name:'emoji_25',path:require('../../static/emoji/emoji_25.png')},
                {name:'emoji_26',path:require('../../static/emoji/emoji_26.png')},
                {name:'emoji_27',path:require('../../static/emoji/emoji_27.png')},
                {name:'emoji_28',path:require('../../static/emoji/emoji_28.png')},
                {name:'emoji_29',path:require('../../static/emoji/emoji_29.png')},
                {name:'emoji_30',path:require('../../static/emoji/emoji_30.png')},
                {name:'emoji_31',path:require('../../static/emoji/emoji_31.png')},
                {name:'emoji_32',path:require('../../static/emoji/emoji_32.png')},
                {name:'emoji_33',path:require('../../static/emoji/emoji_33.png')},
                {name:'emoji_34',path:require('../../static/emoji/emoji_34.png')},
                {name:'emoji_35',path:require('../../static/emoji/emoji_35.png')},
                {name:'emoji_36',path:require('../../static/emoji/emoji_36.png')},
                {name:'emoji_37',path:require('../../static/emoji/emoji_37.png')},
                {name:'emoji_38',path:require('../../static/emoji/emoji_38.png')},
                {name:'emoji_39',path:require('../../static/emoji/emoji_39.png')},
                {name:'emoji_40',path:require('../../static/emoji/emoji_40.png')},
                {name:'emoji_41',path:require('../../static/emoji/emoji_41.png')},
                {name:'emoji_42',path:require('../../static/emoji/emoji_42.png')},
                {name:'emoji_43',path:require('../../static/emoji/emoji_43.png')},
                {name:'emoji_44',path:require('../../static/emoji/emoji_44.png')},
                {name:'emoji_45',path:require('../../static/emoji/emoji_45.png')},
                {name:'emoji_46',path:require('../../static/emoji/emoji_46.png')},
                {name:'emoji_47',path:require('../../static/emoji/emoji_47.png')},
                {name:'emoji_48',path:require('../../static/emoji/emoji_48.png')},
                {name:'emoji_49',path:require('../../static/emoji/emoji_49.png')},
                {name:'emoji_50',path:require('../../static/emoji/emoji_50.png')},
                {name:'emoji_51',path:require('../../static/emoji/emoji_51.png')},
                {name:'emoji_52',path:require('../../static/emoji/emoji_52.png')},
                {name:'emoji_53',path:require('../../static/emoji/emoji_53.png')},
                {name:'emoji_54',path:require('../../static/emoji/emoji_54.png')},
                {name:'emoji_55',path:require('../../static/emoji/emoji_55.png')},
                {name:'emoji_56',path:require('../../static/emoji/emoji_56.png')},
                {name:'emoji_57',path:require('../../static/emoji/emoji_57.png')},
                {name:'emoji_58',path:require('../../static/emoji/emoji_58.png')},
                {name:'emoji_59',path:require('../../static/emoji/emoji_59.png')},
                {name:'emoji_60',path:require('../../static/emoji/emoji_60.png')},
                {name:'emoji_61',path:require('../../static/emoji/emoji_61.png')},
                {name:'emoji_62',path:require('../../static/emoji/emoji_62.png')},
                {name:'emoji_63',path:require('../../static/emoji/emoji_63.png')},
                {name:'emoji_64',path:require('../../static/emoji/emoji_64.png')},
                {name:'emoji_65',path:require('../../static/emoji/emoji_65.png')},
                {name:'emoji_66',path:require('../../static/emoji/emoji_66.png')},
                {name:'emoji_67',path:require('../../static/emoji/emoji_67.png')},
                {name:'emoji_68',path:require('../../static/emoji/emoji_68.png')},
                {name:'emoji_69',path:require('../../static/emoji/emoji_69.png')},
                {name:'emoji_70',path:require('../../static/emoji/emoji_70.png')},
                {name:'emoji_71',path:require('../../static/emoji/emoji_71.png')},
                {name:'emoji_72',path:require('../../static/emoji/emoji_72.png')},
                {name:'emoji_73',path:require('../../static/emoji/emoji_73.png')},
                {name:'emoji_74',path:require('../../static/emoji/emoji_74.png')},
                {name:'emoji_75',path:require('../../static/emoji/emoji_75.png')},
                {name:'emoji_76',path:require('../../static/emoji/emoji_76.png')},
                {name:'emoji_77',path:require('../../static/emoji/emoji_77.png')},
                {name:'emoji_78',path:require('../../static/emoji/emoji_78.png')},
                {name:'emoji_79',path:require('../../static/emoji/emoji_79.png')},
                {name:'emoji_80',path:require('../../static/emoji/emoji_80.png')},
                {name:'emoji_81',path:require('../../static/emoji/emoji_81.png')},
                {name:'emoji_82',path:require('../../static/emoji/emoji_82.png')},
                {name:'emoji_83',path:require('../../static/emoji/emoji_83.png')},
                {name:'emoji_84',path:require('../../static/emoji/emoji_84.png')},
                {name:'emoji_85',path:require('../../static/emoji/emoji_85.png')},
                {name:'emoji_86',path:require('../../static/emoji/emoji_86.png')},
                {name:'emoji_87',path:require('../../static/emoji/emoji_87.png')},
                {name:'emoji_88',path:require('../../static/emoji/emoji_88.png')},
            ]
        }
    },
    props:['RightDataMessage','toolschat'],
    components:{
        MainChat
    },
    methods:{
        goBack(){
            // this.$router.go(-1)
            this.$emit('hiddenShowUserList')
        },
        selectEmoji(key){
                this.message=`<${key.name}>`
                this.sendMessage() 

        },
        showEmojiTools(key){
            if(key.name=='IconTools'){
                this.showEmojiToolsFlag=!this.showEmojiToolsFlag
            }
            if(key==0){
                this.showEmojiToolsFlag=false
            }
            
        },
        sendMessage(){
            if(this.message.trim()==''||this.message==null){
                this.$message('内容不能为空',1500)
                return;
            }
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
            if(val.trim()==''){
                this.sendmess=true
                
            }
            else
            this.sendmess=false
        // console.log(val.split('<i>')[1].split('</i>')[0])
        }
    },
    filters:{
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* top: 0px; */
    font-size: 1rem;
    color: black;
    padding: 0.5rem;
    margin: 0.6rem 1rem;
    /* width: 100% */
}
.message_chatuser i:hover{
cursor: pointer;
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
    width: 96%;
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
.showEmojiToolsFlag{
    width: 20rem;
    height: 15rem;
    overflow-y: scroll;
    position:absolute;
    z-index: 888;
    bottom: 12rem;
    background: #fff;
    padding:1rem;
    border: 1px solid #f6f6f6
}
.showEmojiToolItem{
margin-left:1rem;
height:1.5rem;
padding: 2px;
}
.showEmojiToolItem:hover{
    background: #ddd
}
</style>