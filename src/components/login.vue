<template>
  <div class="rowlogin">
    <div class="login">
    <!-- <p>{{getStoreState}}</p> -->
    <el-input class="loginForm" v-model="loginname" placeholder="请输入手机号登录"></el-input>
    <el-input class="loginForm" v-model="passworld" placeholder="请输入登录密码"></el-input>
    <el-button class="loginForm" @click="submit" type="primary">提交</el-button>
  </div>
  </div>
</template>

<script>
import config from "../../Serverconfig";
// import {mapState} from 'vuex'
export default {
  name: "login",
  data() {
    return {
      loginname: "13106986209",
      passworld: "123456"
    };
  },
  computeds: {},
  methods:{
    getCount() {
      return this.$store.getters.getCount
    },


    submit() {
      this.axios({
        method: "get",
        url: `http://${config.serverName}/login?loginname=${this.loginname}&passworld=${this.passworld}`,
        responseType: "json"
      }).then(res => {
        console.log(res.data);
        if (res.status == 200) {
          // let userdetail=[res.data.Id,res.data.avater,res.data.badge,res.data.mobile,res.data.name,res.data.userid]
          this.$message(
            {
              message: "登录成功",
              type: "success"
            },
            2000
          );
          sessionStorage.setItem("userdetail", JSON.stringify(res.data));
          this.$router.push({
            name: "Communication"
          });
        } else {
          this.$message({
            showClose: true,
            message: "帐号错误，请重试",
            type: "error"
          });
        }
      });
    }
  },
  mounted() {
    console.log(this.getCount())
    this.$store.commit('addCount',{num:'ten'})
    console.log(this.getCount())
    this.$store.dispatch('addCount')
    console.log(this.getCount())
    // console.log(this.getStoreState())
    // console.log(this.$route.params.uid)
    if (
      this.$route.params.uid == "fromApp" &&
      this.$route.params.uid != undefined &&
      this.$route.params.uid != null
    ) {
      // this.$router.push('')
      // this.$router.push('')
      console.log(
        this.$route.params.uid,
        this.$route.query.username,
        this.$route.query.password
      );
      if (
        this.$route.query.username != undefined &&
        this.$route.query.username != null &&
        this.$route.query.username != "" &&
        this.$route.query.password != undefined &&
        this.$route.query.password != null &&
        this.$route.query.password != ""
      ) {
        this.loginname = this.$route.query.username;
        this.passworld = this.$route.query.password;
        console.log(
          this.$route.params.uid,
          this.$route.query.username,
          this.$route.query.password
        );
        this.submit();
      }
    }
  }
};
</script>

<style>
.rowlogin{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.login {
  /* align-content: center; */
  /* align-self: center; */
  display: flex;
  flex-direction: column;
  width: 50%
  /* width: 60%; */
  /* margin: auto; */
}
.loginForm {
  margin-top: 30px;
}
</style>