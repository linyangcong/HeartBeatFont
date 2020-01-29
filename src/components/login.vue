<template>
  <div class="login">
    <el-input class="loginForm" v-model="loginname" placeholder='请输入手机号登录'></el-input>
    <el-input class="loginForm" v-model="passworld" placeholder='请输入登录密码'></el-input>
    <el-button class="loginForm" @click="submit" type='primary'>提交</el-button>
  </div>
</template>

<script>
import config from '../../Serverconfig'
export default {
name:"login",
data(){
    return{
        loginname:'13106986209',
        passworld:'123456'
    }
},
methods:{
    submit(){
      this.axios({
  method: 'get',
  url: `http://${config.serverName}/login?loginname=${this.loginname}&passworld=${this.passworld}`,
  responseType: 'json',
})
  .then((res)=> {
    console.log(res.data)
    if(res.status==200){
      // let userdetail=[res.data.Id,res.data.avater,res.data.badge,res.data.mobile,res.data.name,res.data.userid]
      this.$message({
        message:'登录成功',
        type: 'success'
       },2000)
    sessionStorage.setItem('userdetail',JSON.stringify(res.data))
    this.$router.push({
      name:'Communication',
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
.login{
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto
}
.loginForm{
  margin-top: 30px
}
</style>