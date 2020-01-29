<template>
  <div>
    <div v-for="(k,i) in this.RightDataMessageTop.messtop" :key="i">
      <div :class="RightDataMessageTop.userid!=k.fromId?'messtop_item_Mine':'messtop_item'">
        <img v-if="k.fromId==RightDataMessageTop.userid" class="messtop_item_img" :src="k.avater?k.avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" />
        <div class="messtop_item_topmess" v-if="k.toId==RightDataMessageTop.userid||k.fromId==RightDataMessageTop.userid">
          <div :style="RightDataMessageTop.userid!=k.fromId?'color:grey;font-size:10px;text-align:right;margin-right:10px':'color:grey;font-size:10px'">{{getName(k)}}</div>
          <div :class="RightDataMessageTop.userid!=k.fromId?'messtop_item_mess_mine':'messtop_item_mess'">{{k.data}}</div>
        </div>
        <img v-if="k.toId==RightDataMessageTop.userid" class="messtop_item_img_mine" :src="k.avater?k.avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainChat",
  data() {
    return {
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
    }
  },
  filters:{
   
  },
  mounted() {}
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
  width: 3rem;
  height: 3rem;
  display: inline-block;
  vertical-align: middle;
}
.messtop_item_topmess {
  font-size: 0.5rem;
  line-height: 1.6rem;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}
.messtop_item_img_mine{
    margin-right: 10px;
   width: 3rem;
  height: 3rem;
  display: inline-block;
  vertical-align: middle;
}
.messtop_item_mess {
  font-size: 0.8rem;
  display: inline-block;
  vertical-align: middle;
  max-width: 20rem;
  border-radius: 0.3rem;
  background: rgb(12, 141, 228);
  color: white;
  padding: 0.2rem 0.8rem;
}
.messtop_item_mess_mine {
    margin-right: 10px;
  font-size: 0.8rem;
  display: inline-block;
  vertical-align: middle;
  max-width: 20rem;
  border-radius: 0.3rem;
  background: rgb(255, 255, 255);
  color: black;
  padding: 0.2rem 0.8rem;
}
</style>