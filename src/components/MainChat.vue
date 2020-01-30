<template>
  <div>
    <div v-for="(k,i) in this.RightDataMessageTop.messtop" :key="i">
      <div :class="RightDataMessageTop.userid!=k.fromId?'messtop_item_Mine':'messtop_item'">
        <img v-if="k.fromId==RightDataMessageTop.userid" class="messtop_item_img" :src="RightDataMessageTop.avater?(config.staticServer+RightDataMessageTop.avater):'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" />
        <div class="messtop_item_topmess" v-if="k.toId==RightDataMessageTop.userid||k.fromId==RightDataMessageTop.userid">
          <div :style="RightDataMessageTop.userid!=k.fromId?'color:grey;font-size:10px;text-align:right;margin-right:10px':'color:grey;font-size:10px'">{{getName(k)}}</div>
          <!-- <span style="display:none">{{getIcon(k.data)}}</span> -->
          <div v-show="MessageOrIcon(k.data)" :class="RightDataMessageTop.userid!=k.fromId?'messtop_item_mess_mine':'messtop_item_mess'" id="mainData">
            {{k.data}}</div>
          <!-- <div v-show="!MessageOrIcon(k.data)" :class="RightDataMessageTop.userid!=k.fromId?'messtop_item_icon':''" > -->
            <img :src="emoji" v-show="!MessageOrIcon(k.data)" :class="RightDataMessageTop.userid!=k.fromId?'messtop_item_iconRight':'messtop_item_iconLeft'"/>
          <!-- </div> -->
        </div>
        <img v-if="k.toId==RightDataMessageTop.userid" class="messtop_item_img_mine" :src="MineAvater?MineAvater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" />
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../Serverconfig'
export default {
  name: "MainChat",
  data() {
    return {
      // showMessage:false,
      emoji:'',
      config:config,
      MineAvater:config.staticServer+JSON.parse(sessionStorage.getItem('userdetail')).avater
      // MineAvater:JSON.parse(sessionStorage.getItem(userdetail)).avater,
    };
  },
  props: ["RightDataMessageTop"],
  beforeUpdate: function() {
  },
  methods:{
     getName(item){
      if(item.toId==this.RightDataMessageTop.userid){
        return '我'
      }
       else{
        return this.RightDataMessageTop.name
      }
    },
       MessageOrIcon(data){
    if(/<([^<>]*)>/.test(data)){
      this.emoji=require('../../static/emoji/'+data.match(/<([^<>]*)>/)[1]+'.png')
      // this.showMessage=false
      return false
    }
    else{
      return true
      // this.showMessage=true;
      // return data
    }
   }
  },
  filters:{
  },
  mounted() {
    console.log(JSON.parse(sessionStorage.getItem('userdetail')).avater)
  }
};
</script>

<style >
.messtop_item {
  display: flex;
  flex-direction: row;
  line-height: 30px;
  margin-top: 1rem;
  white-space:normal; 
  word-break:break-all;
  overflow:hidden;
  /* display: inline-block; */
  /* max-width: 60%; */
  /* overflow: scroll */
}
.messtop_item_Mine {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  line-height: 30px;
  margin-top: 1rem;
  white-space:normal; 
  word-break:break-all;
  overflow:hidden;
  /* display: inline-block; */
  /* max-width: 60%; */
  /* overflow: scroll; */
}
.messtop_item_img {
  width: 2rem;
  height: 2rem;
  display: inline-block;
  vertical-align: middle;
}
.messtop_item_topmess {
  font-size: 0.5rem;
  line-height: 1rem;
  display: inline-block;
  vertical-align: middle;
  /* margin-left: 10px; */
}
.messtop_item_img_mine{
    /* margin-right: 5px; */
   width: 2rem;
  height: 2rem;
  display: inline-block;
  vertical-align: middle;
}
.messtop_item_mess {
  font-size: 0.6rem;
  display: inline-block;
  vertical-align: middle;
  max-width: 20rem;
  border-radius: 0.3rem;
  background: rgb(12, 141, 228);
  color: white;
  padding: 0.1rem 0.5rem;
}
.messtop_item_mess_mine {
    margin-right: 10px;
  font-size: 0.6rem;
  display: inline-block;
  vertical-align: middle;
  max-width: 20rem;
  border-radius: 0.3rem;
  background: rgb(255, 255, 255);
  color: black;
  padding: 0.1rem 0.5rem;
}
.messtop_item_iconRight{
    margin: 0.5rem;
    max-width: 2rem;
    max-height: 2rem;
}
.messtop_item_iconLeft{
  margin: 0.5rem;
    max-width: 2rem;
    max-height: 2rem;
}
</style>