<template>
  <div style="height:100%;width:100%">
        <div class="LeftTool_img_top"  >
             <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @select="handleSelect">
      <el-menu-item index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
        </template>
      </el-menu-item>
      <el-menu-item index="2" disabled>
        <i class="el-icon-menu"></i>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
      </el-menu-item>
      <el-menu-item index="4" disabled>
        <i class="el-icon-setting"></i>
      </el-menu-item>
    </el-menu>
            <!-- <img v-show="k.imgact" v-for="(k,i) in this.tools" :key="i" :src="k.img" style="width:40%;height:20%;display:block;margin:auto;padding-top:5%"/> -->
        </div>
        <!-- <div class="LeftTool_img_bottom" >
            <img :src="toolssetting.img" style="width:40%;height:20%;display:block;margin:auto"/>
        </div> -->

  </div>
</template>

<script>
export default {
name:"LeftTool",
data(){
    return{
            }
},
props:['tools'],
methods:{
    handleSelect(e){
    this.axios({
  method: 'get',
  url: 'http://192.168.125.116:8888/getUserList?moduleid='+e,
  responseType: 'json',
})
  .then((res)=> {
    console.log(res.data)
    let data=[];
    res.data.map(item=>{
      //过滤自己的数据
      if(item.userid==sessionStorage.getItem('USERID')){
        return;
      }
      else{
        data.push(item)
      }
    })
    this.$emit('fromlefttool',data)
  }); 
    }
}

}
</script>

<style scoped>
.LeftTool_img_top{
    height: 70%;
    width: 100%;
    text-align: center;
    display: block;

}
.LeftTool_img_bottom{
    height: 50%;
    text-align: center;
    margin-top:50%;
}
.el-menu-vertical-demo{
    background: black
}
</style>