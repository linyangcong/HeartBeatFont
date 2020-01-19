<template>
  <div>
      <div class="messtop_item" v-for="(k,i) in this.message1.messtop" :key="i">
            <img class="messtop_item_img" :src="k.avater"/>
            <div class="messtop_item_topmess">
            <div style="color:grey" >{{k.name}}</div>
             <div class="messtop_item_mess">{{k.content}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"MessTop",
    data(){
        return{
            timestampflag:'',
            Mess:[
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从1',time:'2019-09-18 16：00',content:'你好'},
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从2',time:'2019-09-18 17：00',content:'你好'},
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从3',time:'2019-09-18 18：00',content:'你好'},
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从4',time:'2019-09-18 19：00',content:'你好'},
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从4',time:'2019-09-18 19：00',content:'你好'},
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从4',time:'2019-09-18 19：00',content:'你好'},
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从4',time:'2019-09-18 19：00',content:'你好'},
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从4',time:'2019-09-18 19：00',content:'你好'},
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从4',time:'2019-09-18 19：00',content:'你好'},
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从4',time:'2019-09-18 19：00',content:'你好'},
                {avater:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',name:'林养从4',time:'2019-09-18 19：00',content:'你好'},
            ]
        }
    },
    props:['message1'],
    beforeUpdate:function(){
        console.log('ddddddddddd')
    },
    mounted(){
    }



}
</script>

<style >
.messtop_item{
    line-height: 30px;
    margin-top: 1rem;
}
.messtop_item_img{
    width: 3rem;
    height: 3rem;
display: inline-block;
vertical-align: middle
}
.messtop_item_topmess{
font-size: 0.5rem;
line-height: 1.6rem;
display: inline-block;
vertical-align: middle;
}
.messtop_item_mess{
font-size: 1rem;
display: inline-block;
vertical-align: middle;
max-width: 30rem;
border-radius: 0.3rem;
background: rgb(12, 141, 228);
color:white;
padding: 0.05rem 0.4rem;
}
</style>