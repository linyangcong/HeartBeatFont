<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
 margin: 0px;
 padding: 0px;
 height: 100%;
 width: 100%;
 position: absolute;
  display: flex;
  align-items: center;
 /* align-self: center; */
 /* justify-content: center;
 flex-direction: column; */
}
</style>
