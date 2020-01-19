<template>
  <div>
    <el-input v-model="loginname"></el-input>
  <el-button @click="submit">提交</el-button>
  </div>
</template>

<script>
import config from '../../Serverconfig'
export default {
name:"login",
data(){
    return{
        loginname:''
    }
},
methods:{
    submit(){
      this.axios({
  method: 'get',
  url: `http://${config.serverName}/login?loginname=`+this.loginname,
  responseType: 'json',
})
  .then((res)=> {
    console.log(res.data)
    if(res.data[0]==200){
      this.$message({
        message:'登录成功',
        type: 'success'
       },2000)
    sessionStorage.setItem('USERID',res.data[1])
    this.$router.push({
      name:'Communication',
      params:{
        userlist:res.data[2]
      }
    })
    }
    else{
      this.$message({
          showClose: true,
          message: '帐号错误，请重试',
          type: 'error'
        });
    }
    
  }); 
        
        
    }
}
}
</script>

<style>

</style>